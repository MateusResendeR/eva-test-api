import { prisma } from "../../lib/prisma";
import { actionsRepository } from "../actions-repository";

export class PrismaActionsRepository implements actionsRepository {
    async list() {
        const journeys = await prisma.action.findMany();
        return journeys;
    }
}