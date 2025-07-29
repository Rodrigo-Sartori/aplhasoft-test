import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Contact{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: String;

    @Column({unique: true})
    contact: String;
    
    @Column({unique: true})
    email: String;

    @Column({type: "mediumblob"})
    picture: Buffer;

    pictureString: String;

    @ManyToOne(()=> User, user=> user.contacts)
    user:User;
}