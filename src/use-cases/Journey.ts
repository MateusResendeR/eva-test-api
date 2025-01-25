import { JourneyInterface, journeysRepository } from "@/repositories/journeys-repository";
import  Bull from 'bull';


export class JourneyUseCase {

    private queue = new Bull('my-queue');

    constructor(private journeysRepository: journeysRepository) {}

    private mockCallAPIS = () => {
        console.log('mockWhatsapp');
        console.log('mockEmail');
    }

    private convertDateTimeToCron = (dateTime: Date) =>{
      const date = new Date(dateTime.toISOString());
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
      const dayOfMonth = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const dayOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][date.getDay()];
    
      const cronExpression = `${seconds} ${minutes} ${hours} ${dayOfMonth} ${month} ${dayOfWeek}`;
    
      return cronExpression;
    }

    async create({ name, actions, collaborators, start_date }:JourneyInterface) : Promise<boolean> {

        await this.journeysRepository.create({name, actions, collaborators, start_date});

        console.log(start_date.toISOString());

        const date = new Date(start_date.toISOString());
        
        this.queue.add('my-job', {
          start_date: start_date,
        }, {
          repeat: {
            cron: this.convertDateTimeToCron(date),
            tz: 'America/Sao_Paulo',
          },
        });

        this.queue.process('my-job', async ()  => {
          this.mockCallAPIS();
        });
    
        return true;
    }

  async list() : Promise<JourneyInterface[]> {
    return await this.journeysRepository.list();
  }
}
