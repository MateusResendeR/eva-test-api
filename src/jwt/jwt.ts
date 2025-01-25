import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { env } from 'process';
export async function verifyToken(token: string) {
    try {
        return await jwt.verify(token, env.JWT_SECRET ?? 'secret');
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function generateToken(userAdm: User) {
    return await jwt.sign({ id: userAdm.id, name: userAdm.name, email: userAdm.email  }, env.JWT_SECRET ?? 'secret', { expiresIn: '1d' });
}

