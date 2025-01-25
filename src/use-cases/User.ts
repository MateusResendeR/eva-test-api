import { User } from "@prisma/client";
import { compare } from "bcryptjs";
import { generateToken } from "@/jwt/jwt";
import { LoginError } from "./errors/login-error";
import { usersRepository } from "@/repositories/users-repository";


interface LoginInterface {
    email: string;
    password: string;
}

const validateUserAndPassword = async (user: User | null, password: string) => {
    return await compare(password, user?.password ?? '');
}

export class LoginUseCase {
    constructor(private usersAdmRepository: usersRepository) {}
    async handle({ email, password }:LoginInterface) : Promise<{accessToken: string}> {

        const userWithEmail = await this.usersAdmRepository.findByEmail(email);

        const validUser = await validateUserAndPassword(userWithEmail, password);
        if (!userWithEmail || !validUser) {
            throw new LoginError();
        }

        const accessToken = await generateToken(userWithEmail);
    
        return {accessToken};
    }
}