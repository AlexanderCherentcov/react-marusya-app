import { useEffect, useState } from 'react';
import { apiClient } from '@/services/api';
import type { Movie } from '@/api/Api';

export function useMoviesByIds(ids: (string | number)[]) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Ключ по содержимому массива, а не по ссылке
  const idsKey = (ids ?? [])
    .filter(id => id !== null && id !== undefined)
    .map(id => String(id))
    .join(',');

  useEffect(() => {
    // если нет избранных — просто очищаем и выходим
    if (!idsKey) {
      setMovies([]);
      setLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const idArray = idsKey.split(',').map(Number);

        const results = await Promise.all(
          idArray.map(id =>
            apiClient.movie.movieIdGet(id).then(res => res.data),
          ),
        );

        if (!cancelled) {
          setMovies(results);
        }
      } catch (e) {
        if (!cancelled) {
          setError('Ошибка загрузки избранных фильмов');
          setMovies([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchMovies();

    return () => {
      cancelled = true;
    };
    // важно: зависим от idsKey, а не от самого массива ids
  }, [idsKey]);

  return { movies, loading, error };
}
