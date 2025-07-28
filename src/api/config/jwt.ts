import { User } from "../model/User";
import jwt from "jsonwebtoken";

export function generateToken(user: User): String{
    return jwt.sign({id: user.id}, process.env.JWT_SECRET!, {expiresIn: "1h"})
}