import { useEffect, useState } from 'react';
import { apiClient } from '@/services/api';
import { Movie } from '@/api/Api';

export interface UseMoviesResult {
  movies: Movie[];
  loading: boolean;
  error: string | null;
}

export function useAllMovies(): UseMoviesResult {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await apiClient.movie.movieGet();
        setMovies(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка загрузки');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return { movies, loading, error };
}

// Для загрузки с фильтрами
export function useMoviesFiltered(
  title?: string,
  genre?: string,
  page?: number,
  count?: number,
) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!title && !genre) {
      setMovies([]);
      setLoading(false);
      return;
    }

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiClient.movie.movieGet({
          title,
          genre,
          page,
          count: count ?? 50,
        });
        setMovies(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка загрузки');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [title, genre, page, count]);

  return { movies, loading, error };
}

export interface UseMovieByIdResult {
  movie: Movie | null;
  loading: boolean;
  error: string | null;
}

// Получаем фильм по id
export function useMovieById(movieId?: number): UseMovieByIdResult {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // если id нет – ничего не делаем
    if (!movieId) {
      setMovie(null);
      return;
    }

    const fetchMovie = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiClient.movie.movieIdGet(movieId);
        setMovie(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка загрузки фильма');
        setMovie(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  return { movie, loading, error };
}
