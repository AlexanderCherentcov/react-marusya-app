import { useEffect, useState, useCallback } from 'react';
import { apiClient } from '@/services/api';
import { Movie } from '@/api/Api';

interface UseRandomMovieResult {
  movie: Movie | null;
  loading: boolean;
  error: string | null;
  reset: () => void;
}

export function useRandomMovie(): UseRandomMovieResult {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRandom = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiClient.movie.movieRandomGet();
      setMovie(response.data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRandom();
  }, [fetchRandom]);

  return {
    movie,
    loading,
    error,
    reset: fetchRandom,
  };
}
