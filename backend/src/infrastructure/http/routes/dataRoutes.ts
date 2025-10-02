import { Router } from 'express';
import { GetVoluntarios } from '../../../application/GetVoluntarios.js';
import { GetTurnos } from '../../../application/GetTurnos.js';
import { IDataRepository } from '../../../domain/repositories/IDataRepository.js';

export function createDataRoutes(repository: IDataRepository): Router {
  const router = Router();
  const getVoluntarios = new GetVoluntarios(repository);
  const getTurnos = new GetTurnos(repository);

  router.get('/voluntarios', async (req, res) => {
    try {
      const voluntarios = await getVoluntarios.execute();
      res.json(voluntarios);
    } catch (error) {
      console.error('Error getting voluntarios:', error);
      res.status(500).json({ error: 'Error al obtener voluntarios' });
    }
  });

  router.get('/turnos', async (req, res) => {
    try {
      const turnos = await getTurnos.execute();
      res.json(turnos);
    } catch (error) {
      console.error('Error getting turnos:', error);
      res.status(500).json({ error: 'Error al obtener turnos' });
    }
  });

  return router;
}