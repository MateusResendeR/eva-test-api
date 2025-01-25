import { Request, Response } from 'express';
import { PrismaUsersAdmRepository } from '../../repositories/prisma/prisma-users-repository';
import { LoginError } from '@/use-cases/errors/login-error';
import { LoginUseCase } from '@/use-cases/User';
import Joi from 'joi';

const loginSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
  });

export async function login(request: Request, response: Response) {

    const { error, value } = loginSchema.validate(request.body);
    if (error) {
        return response.status(400).send({ message: error.details[0].message });
    }

    const { password, email } = value;

    let accessToken = { accessToken: '' };

    try {
        const usersRepository = new PrismaUsersAdmRepository();
        const loginUserUseCase = new LoginUseCase(usersRepository);
        accessToken = await loginUserUseCase.handle({ email, password });
    } catch (error) {
        if (error instanceof LoginError) {
        return response.status(401).send({ message: error.message });
        }

        throw error;
    }

    return response.status(200).send(accessToken);
}
