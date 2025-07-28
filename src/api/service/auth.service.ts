import { AppDataSource } from "../config/data-source";
import { generateToken } from "../config/jwt";
import { UserDto } from "../controller/dto/auth.dto";
import { User } from "../model/User";
import bcrypt from "bcrypt";

export class AuthService{

    private userRepo = AppDataSource.getRepository(User)

    async register(userdto: UserDto){
        const hashedPassword = await bcrypt.hash(userdto.password, 10)
        const createdUser = this.userRepo.create({email: userdto.email, password: hashedPassword})
        return this.userRepo.save(createdUser)
    }
    async login(userdto: UserDto) {
    console.log(JSON.stringify(userdto))
    const user = await this.userRepo.findOneBy({ email: userdto.email });
    console.log(JSON.stringify(user))
    if (!user || !(await bcrypt.compare(userdto.password, user.password))) {
      throw new Error("Usuário ou senha inválidos");
    }

    return generateToken(user);
  }
}