import { useEffect, useState, useCallback } from 'react';
import { Movie } from '@/api/Api';
import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from '@/services/favorites';

export interface UseFavoritesResult {
  favorites: Movie[];
  loading: boolean;
  error: string | null;
  isFavorite: (movieId: number) => boolean;
  addToFavorites: (movieId: number) => Promise<void>;
  removeFromFavorites: (movieId: number) => Promise<void>;
  refetch: () => Promise<void>;
}

export function useFavorites(): UseFavoritesResult {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadFavorites = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getFavorites();
      setFavorites(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Ошибка загрузки избранного',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadFavorites();
  }, [loadFavorites]);

  const isFavorite = useCallback(
    (movieId: number) => favorites.some(movie => movie.id === movieId),
    [favorites],
  );

  const addToFavorites = useCallback(
    async (movieId: number) => {
      try {
        await addFavorite(movieId);
        await loadFavorites(); // перезагружаем список после изменения
      } catch (err) {
        console.error(err);
      }
    },
    [loadFavorites],
  );

  const removeFromFavorites = useCallback(
    async (movieId: number) => {
      try {
        await removeFavorite(movieId);
        await loadFavorites();
      } catch (err) {
        console.error(err);
      }
    },
    [loadFavorites],
  );

  return {
    favorites,
    loading,
    error,
    isFavorite,
    addToFavorites,
    removeFromFavorites,
    refetch: loadFavorites,
  };
}
