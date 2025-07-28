import { IsEmail, IsNotEmpty, Length, MinLength } from "class-validator";

export class CreateContactDto {

  @IsNotEmpty({message: "name is not optional"})
  @MinLength(5,{message: "name must have more than 5 characters"})
  name: string;
  @IsEmail({}, {message:"invalid email format"})
  @IsNotEmpty({message: "email is not optional"})
  email: string;
  @IsNotEmpty({message: "contact is not optional"})
  @Length(9,9,{message: "contact must have exact 9 characters"})
  contact: string;
  @IsNotEmpty({message: "userId is not optional"})
  userId: number;
}
