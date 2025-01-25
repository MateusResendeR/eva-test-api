import { prisma } from "../../lib/prisma";
import { usersRepository } from "../users-repository";

export class PrismaUsersAdmRepository implements usersRepository {

    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email,
            }
        });

        return user;
    }
}