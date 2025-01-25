import { Request, Response } from 'express';
import { PrismaCollaboratorsRepository } from '@/repositories/prisma/prisma-collaborators-repository';
import { CollaboratorUseCase } from '@/use-cases/Collaborator';


export async function listCollaborators(request: Request, resp: Response) {
    try {
        const collaboratorsRepository = new PrismaCollaboratorsRepository();
        const collaboratorUseCase = new CollaboratorUseCase(collaboratorsRepository);
        const collaborators = await collaboratorUseCase.list();
        return resp.status(200).send({ collaborators });
    } catch(error) {
        console.error(error);
        throw error; 
    }
};
