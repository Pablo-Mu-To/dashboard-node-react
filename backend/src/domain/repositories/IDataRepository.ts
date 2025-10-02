import { Voluntario, Turno, Socio, Donacion, Actividad } from '../entities/index.js';

export interface IDataRepository {
  getVoluntarios(): Promise<Voluntario[]>;
  getTurnos(): Promise<Turno[]>;
  getSocios(): Promise<Socio[]>;
  getDonaciones(): Promise<Donacion[]>;
  getActividades(): Promise<Actividad[]>;
}