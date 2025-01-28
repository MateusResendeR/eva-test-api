import { prisma } from "@/lib/prisma";
import { JourneyInterface, journeysRepository } from "@/repositories/journeys-repository";
import  Bull from 'bull';
import { DateTime } from 'luxon';


export class JourneyUseCase {

    private queue = new Bull('my-queue');

    constructor(private journeysRepository: journeysRepository) {}
    
    private convertDateTimeToCron = (dateTime: Date, timezone: string) => {
      const dt = DateTime.fromJSDate(dateTime, { zone: timezone });
      const hours = dt.hour.toString().padStart(2, '0');
      const minutes = dt.minute.toString().padStart(2, '0');
      const seconds = dt.second.toString().padStart(2, '0');
      const dayOfMonth = dt.day.toString().padStart(2, '0');
      const month = dt.month.toString().padStart(2, '0');
      const dayOfWeek = dt.weekday.toString().padStart(2, '0');
    
      const cronExpression = `${seconds} ${minutes} ${hours} ${dayOfMonth} ${month} ${dayOfWeek}`;
    
      return cronExpression;
    }
    
    private mockCallAPIS = async (id: string, start_date: Date) => {
        console.log('Cahamando JOB maracdado para: '+ start_date);
        try {
          await prisma.journey.update({
            where: {
              id: id
            },
            data: {
              "status": "Exacutado",
            }
          });
        } catch (error) {
          console.log("error mateus", error);
        }
    }
    async create({ name, actions, collaborators, start_date }:JourneyInterface) : Promise<boolean> {
      
      const id =await this.journeysRepository.create({name, actions, collaborators, start_date});

        const date = DateTime.fromJSDate(start_date).toUTC();
        const jsDate = date.toJSDate();
        
        this.queue.add('my-job', {
          start_date: start_date,
        }, {
          repeat: {
            cron: this.convertDateTimeToCron(jsDate, 'America/Sao_Paulo'),
          },
        });

        this.queue.process('my-job', async ()  => {
          await this.mockCallAPIS(id, start_date);
        });
    
        return true;
    }

  async list() : Promise<JourneyInterface[]> {
    return await this.journeysRepository.list();
  }
}
