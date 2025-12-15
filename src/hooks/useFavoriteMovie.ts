import { useCallback, useEffect, useMemo, useState } from 'react';
import { apiClient } from '@/services/api';
import { useAuth } from '@/hooks/useAuth';

interface UseFavoriteMovieResult {
  isFavorite: boolean;
  isAuth: boolean;
  loading: boolean;
  toggleFavorite: () => Promise<void>;
}

export function useFavoriteMovie(movieId?: number): UseFavoriteMovieResult & {
  removeFavorite: () => Promise<void>;
} {
  const { user, isAuth, reloadProfile } = useAuth();
  const [pending, setPending] = useState(false);

  const initialIsFavorite = useMemo(() => {
    if (!user || !user.favorites || !movieId) return false;
    return user.favorites.includes(String(movieId));
  }, [user, movieId]);

  const [localIsFavorite, setLocalIsFavorite] = useState(initialIsFavorite);

  useEffect(() => {
    setLocalIsFavorite(initialIsFavorite);
  }, [initialIsFavorite]);

  const toggleFavorite = useCallback(async () => {
    if (!isAuth || !movieId) return;

    try {
      setPending(true);

      if (localIsFavorite) {
        await apiClient.favorites.favoritesMovieIdDelete(movieId);
        setLocalIsFavorite(false);
      } else {
        await apiClient.favorites.favoritesPost({ id: String(movieId) });
        setLocalIsFavorite(true);
      }

      await reloadProfile();
    } finally {
      setPending(false);
    }
  }, [isAuth, localIsFavorite, movieId, reloadProfile]);

  const removeFavorite = useCallback(async () => {
    if (!isAuth || !movieId) return;

    try {
      setPending(true);

      await apiClient.favorites.favoritesMovieIdDelete(movieId);
      setLocalIsFavorite(false);

      await reloadProfile();
    } finally {
      setPending(false);
    }
  }, [isAuth, movieId, reloadProfile]);

  return {
    isFavorite: localIsFavorite,
    isAuth,
    loading: pending,
    toggleFavorite,
    removeFavorite,
  };
}
