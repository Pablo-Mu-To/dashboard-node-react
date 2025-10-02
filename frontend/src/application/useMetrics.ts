import { useState, useEffect } from 'react';
import { Metrics } from '../domain/types';
import { luntiaApi } from '../infrastructure/api/luntiaApi';

interface UseMetricsResult {
  metrics: Metrics | null;
  loading: boolean;
  error: string | null;
}

export function useMetrics(): UseMetricsResult {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMetrics() {
      try {
        setLoading(true);
        setError(null);
        const data = await luntiaApi.getMetrics();
        setMetrics(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    }

    fetchMetrics();
  }, []);

  return { metrics, loading, error };
}