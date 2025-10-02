import { Metrics, Voluntario, Turno } from '../../domain/types';

const API_BASE_URL = '/api';

export const luntiaApi = {
  async getMetrics(): Promise<Metrics> {
    const response = await fetch(`${API_BASE_URL}/metrics`);
    if (!response.ok) throw new Error('Error al cargar métricas');
    return response.json();
  },

  async getVoluntarios(): Promise<Voluntario[]> {
    const response = await fetch(`${API_BASE_URL}/voluntarios`);
    if (!response.ok) throw new Error('Error al cargar voluntarios');
    return response.json();
  },

  async getTurnos(): Promise<Turno[]> {
    const response = await fetch(`${API_BASE_URL}/turnos`);
    if (!response.ok) throw new Error('Error al cargar turnos');
    return response.json();
  },
};