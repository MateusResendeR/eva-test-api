import { prisma } from "../../lib/prisma";
import { collaboratorsRepository } from "../collaboratos-repository";

export class PrismaCollaboratorsRepository implements collaboratorsRepository {
    async list() {
        const collaborators = await prisma.collaborator.findMany();
        return collaborators;
    }
}