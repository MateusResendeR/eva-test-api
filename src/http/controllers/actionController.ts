import { Request, Response } from 'express';
import { PrismaActionsRepository } from '@/repositories/prisma/prisma-actions-repository';
import { ActionUseCase } from '@/use-cases/Action';


export async function listActions(request: Request, resp: Response) {
    try {
        const actionsRepository = new PrismaActionsRepository();
        const actionUseCase = new ActionUseCase(actionsRepository);
        const actions = await actionUseCase.list();
        return resp.status(200).send({ actions });
    } catch(error) {
        console.error(error);
        throw error; 
    }
};
