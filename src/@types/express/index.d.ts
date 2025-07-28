import { User } from '../../model/User'; // ajuste o caminho conforme seu projeto

declare global {
  namespace Express {
    interface Request {
      user?: {
            id: number;
            email: string;
        }; // Ou algo como { id: number; email: string; }
    }
  }
}