import { Request, Response } from 'express';
import { listActions } from '@/http/controllers/actionController';

jest.mock('@/use-cases/Journey');

jest.mock('@/repositories/prisma/prisma-actions-repository', () => ({
    PrismaActionsRepository: jest.fn().mockImplementation(() => ({
      list: jest.fn().mockResolvedValueOnce({ actions: [] }),
    })),
  }));


describe('listAction', () => {
    it('must list actions', async () => {
        const req = {
            body: {
            },
        } as Request;
        
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        } as unknown as Response;

        await listActions(req, res);

        expect(res.status).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
    });
});