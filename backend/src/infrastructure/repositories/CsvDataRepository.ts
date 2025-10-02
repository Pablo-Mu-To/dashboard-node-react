import { IDataRepository } from '../../domain/repositories/IDataRepository.js';
import { Voluntario, Turno, Socio, Donacion, Actividad } from '../../domain/entities/index.js';
import { CsvParser } from '../parsers/CsvParser.js';

export class CsvDataRepository implements IDataRepository {
  private parser: CsvParser;

  constructor() {
    this.parser = new CsvParser();
  }

  async getVoluntarios(): Promise<Voluntario[]> {
    const rawData = this.parser.readCsv('voluntarios.csv');

    return rawData.map((row: any) => ({
      id: this.parser.parseString(row.id),
      entidad: this.parser.parseString(row.entidad),
      nombre: this.parser.parseString(row.nombre),
      alta: this.parser.parseDate(row.alta) || new Date(),
      activo: this.parser.parseBoolean(row.activo),
      rol: this.parser.parseString(row.rol, 'Voluntario'),
    }));
  }

  async getTurnos(): Promise<Turno[]> {
    const rawData = this.parser.readCsv('turnos.csv');
    const voluntarios = await this.getVoluntarios();
    const voluntariosIds = new Set(voluntarios.map(v => v.id));

    return rawData
      .map((row: any) => ({
        id: this.parser.parseString(row.id),
        voluntarioId: this.parser.parseString(row.voluntario_id),
        entidad: this.parser.parseString(row.entidad),
        fecha: this.parser.parseDate(row.fecha) || new Date(),
        actividad: this.parser.parseString(row.actividad),
        horas: this.parser.parseNumber(row.horas, false), // No permitir horas negativas
      }))
      .filter((turno: Turno) => {
        // Filtrar turnos con voluntario_id que no existe (ej: v99)
        return voluntariosIds.has(turno.voluntarioId);
      });
  }

  async getSocios(): Promise<Socio[]> {
    const rawData = this.parser.readCsv('socios.csv');

    // Detectar duplicados (mismo nombre y fecha de alta)
    const seen = new Map<string, Socio>();

    return rawData
      .map((row: any) => ({
        id: this.parser.parseString(row.id),
        entidad: this.parser.parseString(row.entidad),
        nombre: this.parser.parseString(row.nombre),
        alta: this.parser.parseDate(row.alta) || new Date(),
        aportacionMensual: this.parser.parseNumber(row.aportacion_mensual, false),
      }))
      .filter((socio: Socio) => {
        const key = `${socio.nombre}-${socio.alta.toISOString()}`;

        // Si ya existe, es duplicado, lo omitimos
        if (seen.has(key)) {
          return false;
        }

        seen.set(key, socio);
        return true;
      });
  }

  async getDonaciones(): Promise<Donacion[]> {
    const rawData = this.parser.readCsv('donaciones.csv');

    return rawData.map((row: any) => ({
      id: this.parser.parseString(row.id),
      entidad: this.parser.parseString(row.entidad),
      fecha: this.parser.parseDate(row.fecha) || new Date(),
      donante: this.parser.parseString(row.donante, 'Anónimo'),
      importe: this.parser.parseNumber(row.importe, false),
    }));
  }

  async getActividades(): Promise<Actividad[]> {
    const rawData = this.parser.readCsv('actividades.csv');

    return rawData.map((row: any) => ({
      id: this.parser.parseString(row.id),
      entidad: this.parser.parseString(row.entidad),
      nombre: this.parser.parseString(row.nombre),
      fecha: this.parser.parseDate(row.fecha) || new Date(),
      participantes: this.parser.parseNumber(row.participantes, false),
    }));
  }
}