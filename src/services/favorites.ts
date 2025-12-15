import { apiClient } from '@/services/api';
import { Movie } from '@/api/Api';

/** Получить все избранные фильмы */
export async function getFavorites(): Promise<Movie[]> {
  const response = await apiClient.favorites.favoritesGet();
  return response.data;
}

/** Добавить фильм в избранное */
export async function addFavorite(movieId: number): Promise<void> {
  await apiClient.favorites.favoritesPost({
    id: String(movieId),
  });
}

/** Удалить фильм из избранного */
export async function removeFavorite(movieId: number): Promise<void> {
  await apiClient.favorites.favoritesMovieIdDelete(movieId);
}
