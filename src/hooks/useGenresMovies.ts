import { useState, useCallback, useEffect } from 'react';
import { apiClient } from '@/services/api';

interface UseGenresMovieResult {
  genres: string[];
  loading: boolean;
  error: string | null;
}

export function useGenresMovies(): UseGenresMovieResult {
  const [genres, setGenres] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadGenresMovies = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiClient.movie.movieGenresGet();
      setGenres(response.data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadGenresMovies();
  }, [loadGenresMovies]);

  return {
    genres,
    loading,
    error,
  };
}
