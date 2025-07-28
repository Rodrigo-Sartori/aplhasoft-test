import { IsEmail, IsNotEmpty, IsOptional, Length, MinLength } from "class-validator";

export class UpdateContactDto {

  @IsOptional()
  @MinLength(5,{message: "name must have more than 5 characters"})
  name?: string;
  
  @IsEmail({}, {message:"invalid email format"})
  @IsOptional()
  email: string;
  
  @IsOptional()
  @Length(9,9,{message: "contact must have exact 9 characters"})
  contact: string;
  
  @IsNotEmpty({message: "userId is not optional"})
  userId: number;
  //picture
}
