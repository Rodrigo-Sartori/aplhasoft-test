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
    const user = await this.userRepo.findOneBy({ email: userdto.email });
    if (!user || !(await bcrypt.compare(userdto.password, user.password))) {
      throw new Error("User or password invalids");
    }

    return generateToken(user);
  }
}