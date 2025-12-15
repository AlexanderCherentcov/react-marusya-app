import { useState, useCallback, useEffect } from 'react';
import { apiClient } from '@/services/api';
import { Movie } from '@/api/Api';

interface UseTopMovieResult {
  movies: Movie[];
  loading: boolean;
  error: string | null;
}

export function useTopMovie(): UseTopMovieResult {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTopMovies = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiClient.movie.movieTop10Get();
      setMovies(response.data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadTopMovies();
  }, [loadTopMovies]);

  return {
    movies,
    loading,
    error,
  };
}
