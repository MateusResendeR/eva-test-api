import { ActionInterface, actionsRepository } from '@/repositories/actions-repository';


export class ActionUseCase {
  constructor(private actionsRepository: actionsRepository) {}

  async list() : Promise<ActionInterface[]> {
    return await this.actionsRepository.list();
  }
}
