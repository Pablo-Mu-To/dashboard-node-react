import { useState, useEffect } from 'react';
import { Voluntario } from '../domain/types';
import { luntiaApi } from '../infrastructure/api/luntiaApi';

interface UseVoluntariosResult {
  voluntarios: Voluntario[];
  loading: boolean;
  error: string | null;
}

export function useVoluntarios(): UseVoluntariosResult {
  const [voluntarios, setVoluntarios] = useState<Voluntario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVoluntarios() {
      try {
        setLoading(true);
        setError(null);
        const data = await luntiaApi.getVoluntarios();
        setVoluntarios(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    }

    fetchVoluntarios();
  }, []);

  return { voluntarios, loading, error };
}