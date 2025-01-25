import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../jwt/jwt';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const tokenFull = req.headers['authorization'];
  const token = tokenFull?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
  }
  const payload = verifyToken(token ?? '');
  if (!payload) {
      res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};

export default authMiddleware;