import { Request, Response } from 'express';
import { listCollaborators } from '@/http/controllers/collaboratorController';

jest.mock('@/use-cases/Journey');

jest.mock('@/repositories/prisma/prisma-collaborators-repository', () => ({
    PrismaCollaboratorsRepository: jest.fn().mockImplementation(() => ({
      list: jest.fn().mockResolvedValueOnce({ actions: [] }),
    })),
  }));


describe('listCollaborator', () => {
    it('must list actions', async () => {
        const req = {
            body: {
            },
        } as Request;
        
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        } as unknown as Response;

        await listCollaborators(req, res);

        expect(res.status).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
    });
});