import { Request, Response } from 'express';
import { createJourney, listJourneys } from '@/http/controllers/journeyController';

jest.mock('@/use-cases/Journey');

jest.mock('@/repositories/prisma/prisma-journeys-repository', () => ({
    PrismaJourneysRepository: jest.fn().mockImplementation(() => ({
      create: jest.fn().mockResolvedValueOnce({ id: 'mock-id' }),
      list: jest.fn().mockResolvedValueOnce({ journeys: [
        { id: 'mock-id', name: 'Jornada Teste', actions: [], collaborators: [], start_date: new Date() }
      ] }),
    })),
  }));


describe('createJourney', () => {
    it('must create a successful journey', async () => {
        const req = {
            body: {
            name: 'Jornada Teste',
            actions: [],
            collaborators: [],
            start_date: new Date(),
            },
        } as Request;
        
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        } as unknown as Response;

        await createJourney(req, res);

        expect(res.status).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledTimes(1);
    });
});

describe('listJourney', () => {
    it('must list journeys', async () => {
        const req = {
            body: {
            },
        } as Request;
        
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        } as unknown as Response;

        await listJourneys(req, res);

        expect(res.status).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
    });
});