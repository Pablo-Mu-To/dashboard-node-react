import { IDataRepository } from '../domain/repositories/IDataRepository.js';

export interface Metrics {
  voluntariosActivos: number;
  horasTotales: number;
  turnosUltimoMes: number;
  donacionesTotales: number;
  actividadesRealizadas: number;
  horasPorEntidad: { entidad: string; horas: number }[];
  horasPorActividad: { actividad: string; horas: number }[];
}

export class GetMetrics {
  constructor(private repository: IDataRepository) {}

  async execute(): Promise<Metrics> {
    const [voluntarios, turnos, donaciones, actividades] = await Promise.all([
      this.repository.getVoluntarios(),
      this.repository.getTurnos(),
      this.repository.getDonaciones(),
      this.repository.getActividades(),
    ]);

    // Voluntarios activos
    const voluntariosActivos = voluntarios.filter((v) => v.activo).length;

    // Horas totales (suma de todos los turnos)
    const horasTotales = turnos.reduce((sum, t) => sum + t.horas, 0);

    // Turnos del último mes (asumo septiembre de 2025)
    const unMesAtras  = new Date('2025-08-01');
    const turnosUltimoMes = turnos.filter((t) => t.fecha >= unMesAtras).length;

    // Donaciones totales (suma de importes)
    const donacionesTotales = donaciones.reduce((sum, d) => sum + d.importe, 0);

    // Actividades realizadas (con al menos 1 participante)
    const actividadesRealizadas = actividades.filter((a) => a.participantes > 0).length;

    // Horas por entidad
    const horasPorEntidadMap = new Map<string, number>();
    turnos.forEach((t) => {
      const current = horasPorEntidadMap.get(t.entidad) || 0;
      horasPorEntidadMap.set(t.entidad, current + t.horas);
    });

    const horasPorEntidad = Array.from(horasPorEntidadMap.entries()).map(
      ([entidad, horas]) => ({ entidad, horas })
    );

    // Horas por actividad
    const horasPorActividadMap = new Map<string, number>();
    turnos.forEach((t) => {
      const current = horasPorActividadMap.get(t.actividad) || 0;
      horasPorActividadMap.set(t.actividad, current + t.horas);
    });

    const horasPorActividad = Array.from(horasPorActividadMap.entries())
      .map(([actividad, horas]) => ({ actividad, horas }))
      .sort((a, b) => b.horas - a.horas); // Ordenar de mayor a menor

    return {
      voluntariosActivos,
      horasTotales,
      turnosUltimoMes,
      donacionesTotales,
      actividadesRealizadas,
      horasPorEntidad,
      horasPorActividad,
    };
  }
}