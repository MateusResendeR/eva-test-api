import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../jwt/jwt';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ message: 'Token não fornecido' });
    return;
  }

  const result = verifyToken(token as string);

  if (result.error) {
    res.status(401).json({ message: result.error });
    return;
  }

  next();
};

export default authMiddleware;