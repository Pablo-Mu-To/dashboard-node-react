import express from 'express';
import cors from 'cors';
import { CsvDataRepository } from '../repositories/CsvDataRepository.js';
import { createMetricsRoutes } from './routes/metricsRoutes.js';
import { createDataRoutes } from './routes/dataRoutes.js';

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Repository
const repository = new CsvDataRepository();

// Routes
app.use('/api', createMetricsRoutes(repository));
app.use('/api', createDataRoutes(repository));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Luntia API running' });
});

export function startServer() {
  app.listen(PORT, () => {
    console.log(`🚀 Backend running on http://localhost:${PORT}`);
    console.log(`📊 API endpoints:`);
    console.log(`   - GET /api/metrics`);
    console.log(`   - GET /api/voluntarios`);
    console.log(`   - GET /api/turnos`);
  });
}