import { IsNull } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { CreateContactDto } from "../controller/dto/create.contact.dto";
import { Contact } from "../model/Contact";
import { UpdateContactDto } from "../controller/dto/update.contact.dto";
import { plainToInstance } from "class-transformer";
import { User } from "../model/User";


export class ContactService {
  private contactRepo = AppDataSource.getRepository(Contact);
  private userRepo = AppDataSource.getRepository(User)

  async create(contactDto: CreateContactDto, picture: Express.Multer.File): Promise<Contact> {
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
      pictureString: contact.picture?.toString('base64')
    }));
  }

  async getDetailed(id: number): Promise<Contact> { 
    const contact = await this.contactRepo.findOneBy({id})
    if(contact == null){
        throw new Error("Contact not found")
    } 
    contact.pictureString = `data:image/jpeg;base64,${Buffer.from(contact.picture).toString('base64')}`
    return contact;
  }

  async editContact(dto: UpdateContactDto): Promise<Contact> { 
    const contact = await this.getDetailed(dto.userId);
    Object.assign(contact, dto);
    const updated = await this.contactRepo.save(contact);
    return updated;
  }

  async deleteContact(id: number) {
    const contact = await this.contactRepo.findOneBy({id});
    if (!contact) {
    return false
  }
  await this.contactRepo.remove(contact)
  }
}