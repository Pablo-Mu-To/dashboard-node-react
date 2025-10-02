import { useState, useEffect } from 'react';
import { Turno } from '../domain/types';
import { luntiaApi } from '../infrastructure/api/luntiaApi';

export function useTurnos() {
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    luntiaApi
      .getTurnos()
      .then(setTurnos)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { turnos, loading, error };
}
