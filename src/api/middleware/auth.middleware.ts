import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "missing Token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number, email: string };
    (req as Request).user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ message: "invalid Token" });
  }
}
