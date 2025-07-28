import { Request, Response } from "express";
import { AuthService } from "../service/auth.service";

export class AuthController {
  private authService = new AuthService();

  async login(req: Request, res: Response) {
    console.log("chegou aqui")
    try {
      const token = await this.authService.login(req.body);
      res.json({ token });
    } catch (error) {
      res.status(401).json({ message: error });
    }
  }

  async register(req: Request, res: Response) {
    try {
      const user = await this.authService.register(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }
}
