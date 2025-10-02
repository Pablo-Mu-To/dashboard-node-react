import { IDataRepository } from '../domain/repositories/IDataRepository.js';
import { Voluntario } from '../domain/entities/index.js';

export class GetVoluntarios {
  constructor(private repository: IDataRepository) {}

  async execute(): Promise<Voluntario[]> {
    return this.repository.getVoluntarios();
  }
}