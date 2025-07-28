import { IsNull } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { CreateContactDto } from "../controller/dto/create.contact.dto";
import { Contact } from "../model/Contact";
import { User } from "../model/User";
import { UpdateContactDto } from "../controller/dto/update.contact.dto";
import { plainToInstance } from "class-transformer";


export class ContactService {
  private contactRepo = AppDataSource.getRepository(Contact);
  private userRepo = AppDataSource.getRepository(User)

  async create(contactDto: CreateContactDto, picture: Express.Multer.File): Promise<Contact> {
    console.log(contactDto)
    if(!contactDto.userId){
      throw new Error("Contact without a user associated")
    }
    const user = await this.userRepo.findOneBy({id: contactDto.userId}) as User
    const newContact = this.contactRepo.create({
      email: contactDto.email,
      contact: contactDto.contact,
      name: contactDto.name,
      user: user,
      picture: picture.buffer
    });
    return await this.contactRepo.save(newContact);
  }

  async getAll(): Promise<Contact[]> { 
    const contactList =  await this.contactRepo.find()
    return contactList.map(contact =>({
      ...contact,
      picture: contact.picture?.toString('base64')
    }));
  }

  async getDetailed(id: number): Promise<Contact> { 
    const contact = await this.contactRepo.findOneBy({id})
    if(contact == null){
        throw new Error("Contact not found")
    }
    return contact;
  }

  async editContact(dto: UpdateContactDto): Promise<Contact> { 
    const contact = await this.getDetailed(dto.userId);
    Object.assign(contact, dto);
    const updated = await this.contactRepo.save(contact);
    return updated;
  }

  async deleteContact(id: number) {
    await this.contactRepo.delete(id)
  }
}