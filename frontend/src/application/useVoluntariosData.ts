import { useState, useEffect } from 'react';
import { Voluntario } from '../domain/types';
import { luntiaApi } from '../infrastructure/api/luntiaApi';

export function useVoluntariosData() {
  const [voluntarios, setVoluntarios] = useState<Voluntario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    luntiaApi
      .getVoluntarios()
      .then(setVoluntarios)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { voluntarios, loading, error };
}
