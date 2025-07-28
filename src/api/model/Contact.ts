import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Contact{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: String;

    @Column()
    contact: String;
    
    @Column()
    email: String;

    @Column({type: "mediumblob"})
    picture: Buffer;

    @ManyToOne(()=> User, user=> user.contacts)
    user:User;
}