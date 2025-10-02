import { Router } from 'express';
import { GetMetrics } from '../../../application/GetMetrics.js';
import { IDataRepository } from '../../../domain/repositories/IDataRepository.js';

export function createMetricsRoutes(repository: IDataRepository): Router {
  const router = Router();
  const getMetrics = new GetMetrics(repository);

  router.get('/metrics', async (req, res) => {
    try {
      const metrics = await getMetrics.execute();
      res.json(metrics);
    } catch (error) {
      console.error('Error getting metrics:', error);
      res.status(500).json({ error: 'Error al obtener métricas' });
    }
  });

  return router;
}