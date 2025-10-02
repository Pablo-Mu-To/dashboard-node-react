export interface Voluntario {
  id: string;
  entidad: string;
  nombre: string;
  alta: string;
  activo: boolean;
  rol: string;
}

export interface Turno {
  id: string;
  voluntarioId: string;
  entidad: string;
  fecha: string;
  actividad: string;
  horas: number;
}

export interface Metrics {
  voluntariosActivos: number;
  horasTotales: number;
  turnosUltimoMes: number;
  donacionesTotales: number;
  actividadesRealizadas: number;
  horasPorEntidad: { entidad: string; horas: number }[];
  horasPorActividad: { actividad: string; horas: number }[];
}