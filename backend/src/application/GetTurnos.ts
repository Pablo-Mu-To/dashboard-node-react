import { IDataRepository } from '../domain/repositories/IDataRepository.js';
import { Turno } from '../domain/entities/index.js';

export class GetTurnos {
  constructor(private repository: IDataRepository) {}

  async execute(): Promise<Turno[]> {
    return this.repository.getTurnos();
  }
}