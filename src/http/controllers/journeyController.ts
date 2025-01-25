import { Request, Response } from 'express';
import Joi from 'joi';
import { PrismaJourneysRepository } from '@/repositories/prisma/prisma-journeys-repository';
import { JourneyUseCase } from '@/use-cases/Journey';

const journeySchema = Joi.object().keys({
    name: Joi.string().required(),
    actions: Joi.array().required(),
    collaborators: Joi.array().required(),
    start_date: Joi.date().required(),
  });

export async function createJourney(request: Request, resp: Response) {

    const { error, value } = journeySchema.validate(request.body);
    if (error) {
        return resp.status(400).send({ message: error.details[0].message });
    }

    const { name, actions, collaborators, start_date } = value;
    
    try {
        const journeysRepository = new PrismaJourneysRepository();
        const journeyUseCase = new JourneyUseCase(journeysRepository);
        await journeyUseCase.create({name, actions, collaborators, start_date});
    } catch(error) {
        console.error(error);
        throw error; 
    }

    return resp.status(201).send();
};

export async function listJourneys(request: Request, resp: Response) {
    try {
        const journeysRepository = new PrismaJourneysRepository();
        const journeyUseCase = new JourneyUseCase(journeysRepository);
        const journeys = await journeyUseCase.list();
        return resp.status(200).send({ journeys });
    } catch(error) {
        console.error(error);
        throw error; 
    }
};
