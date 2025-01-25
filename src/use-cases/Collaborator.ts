import { collaboratorInterface, collaboratorsRepository } from '@/repositories/collaboratos-repository';


export class CollaboratorUseCase {
  constructor(private collaboratorsRepository: collaboratorsRepository) {}

  async list() : Promise<collaboratorInterface[]> {
    return await this.collaboratorsRepository.list();
  }
}
