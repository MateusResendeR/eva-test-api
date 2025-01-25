import { User } from "@prisma/client";
export interface UserInterface {
    id: string,
    name: string,
    email: string,
    created_at: Date,
}

export interface usersRepository {
    findByEmail: (name: string) => Promise<User | null>;
}