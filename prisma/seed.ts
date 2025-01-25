import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import dotenv from 'dotenv';

dotenv.config();
async function seed() {
    const password = await hash(process.env.USER_ADM_PASSWORD ?? 'admin', 6)
    await prisma.user.create({
        data: {
            email: process.env.USER_ADM_EMAIL ?? 'admin@admin.com',
            password:  password,
        }
    })
}

seed().then(() => {
    console.log('Seed executed');
    prisma.$disconnect();
});