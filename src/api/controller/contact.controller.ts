import { Request, Response } from "express";
import { ContactService } from "../service/contact.service";
import { validate } from "class-validator";
import { CreateContactDto } from "./dto/create.contact.dto";
import { plainToInstance } from "class-transformer";

export class ContactController{
  private service = new ContactService()

  async createContact(req: Request, res: Response) {
    try {
      const picture = req.file
      const user = req.user
      if (!picture) {
        return res.status(400).json({ message: 'does not contain a picture' });
      }
      const userDto = plainToInstance(CreateContactDto, req.body);
      userDto.userId = user ? user.id : 0
      const errors = await validate(userDto);
      if (errors.length > 0) {
        const formattedErrors = errors.map(err => ({
            property: err.property,
            constraints: err.constraints
        }));
        return res.status(400).json({ errors: formattedErrors });
    }
  const contact = await this.service.create(userDto, picture);
  return res.status(201).json(contact);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao criar contato" });
    }
  }

  async getAll(req: Request, res: Response){
    const contacts = await this.service.getAll();
    return res.status(200).json(contacts);
  }

  async getDetailed(req: Request, res: Response){
    const {id} = req.params
    const contact = await this.service.getDetailed(parseInt(id));
    return res.status(200).json(contact);
  }

  async editContact(req: Request, res: Response){
    const contactDto = req.body
    const errors = await validate(contactDto);
    if (errors.length > 0) {
        return res.status(400).json(errors);
    }
    const savedContact = await this.service.editContact(contactDto);
    return res.status(200).json(savedContact);
  }
  
  async deleteContact(req: Request, res: Response){
    const {id} = req.params
    if(! this.service.deleteContact(parseInt(id))){
      res.status(404).json({ message: 'Contact not found' });
    }
    return res.status(200).send();
  }
}

