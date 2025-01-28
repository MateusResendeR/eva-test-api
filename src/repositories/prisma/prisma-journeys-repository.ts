import { prisma } from "../../lib/prisma";
import { JourneyInterface, journeysRepository } from "../journeys-repository";

export class PrismaJourneysRepository implements journeysRepository {

    async create(data: JourneyInterface): Promise<string> {
        const journey = await prisma.journey.create({
            data: {
                name: data.name,
                actions: data.actions,
                collaborators: data.collaborators,
                start_date: data.start_date
            }
        });
        await prisma.action.updateMany({
            where: {
                id: {
                    in: data.actions
                }
            },
            data: {
                journeys: {
                    push: journey.id
                }
            }
        });


        await prisma.collaborator.updateMany({
            where: {
                id: {
                    in: data.collaborators
                }
            },
            data: {
                journeys: {
                    push: journey.id
                }
            }
        });

        return journey.id;
    }

    async list() {
        const journeys = await prisma.journey.findMany();
        return journeys;
    }
}