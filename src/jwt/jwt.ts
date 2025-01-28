import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { env } from 'process';

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token.split(' ')[1], env.JWT_SECRET ?? 'secret');
    return { decoded };
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      return { error: 'Token expirado' };
    } else {
      return { error: 'Token inválido' };
    }
  }
};

export async function generateToken(userAdm: User) {
    return await jwt.sign({ id: userAdm.id, name: userAdm.name, email: userAdm.email  }, env.JWT_SECRET ?? 'secret', { expiresIn: '1d' });
}

