import React, { useEffect, useState } from 'react';
import { useMoviesByIds } from '@/hooks/useMoviesByIds';
import AsyncState from '@/ui/AsyncState';
import MoviePosterCard from '@/ui/MoviePosterCard';

interface AccountFavoritesProps {
  favoritesIds: (string | number)[];
}

const AccountFavorites: React.FC<AccountFavoritesProps> = ({
  favoritesIds,
}) => {
  const {
    movies: favoriteMovies,
    loading: favoritesLoading,
    error: favoritesError,
  } = useMoviesByIds(favoritesIds);

  const [removingId, setRemovingId] = useState<number | null>(null);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  const hasFavoritesIds = favoritesIds.length > 0;
  const hasFavoritesMovies = favoriteMovies.length > 0;

  useEffect(() => {
    if (!favoritesLoading && !favoritesError) {
      setHasLoadedOnce(true);
    }
  }, [favoritesLoading, favoritesError]);

  useEffect(() => {
    if (removingId === null) return;

    const stillExists = favoriteMovies.some(movie => movie.id === removingId);

    if (!stillExists) {
      setRemovingId(null);
    }
  }, [favoriteMovies, removingId]);

  const showSpinner = !hasLoadedOnce && favoritesLoading;

  const showEmptyState =
    !favoritesLoading && !favoritesError && !hasFavoritesIds;

  return (
    <div className="account-favorites">
      <AsyncState
        loading={showSpinner}
        error={favoritesError}
        spinnerSize="lg"
      />

      {showEmptyState && (
        <ul className="account__list">
          <li className="account__item account__item--empty">
            У вас пока нет избранных фильмов
          </li>
        </ul>
      )}

      {hasFavoritesIds && (
        <ul className="account__list account__list--animated">
          {hasFavoritesMovies &&
            favoriteMovies.map(movie => (
              <li
                key={movie.id}
                className={`account__item ${
                  removingId === movie.id ? 'account__item--removing' : ''
                }`}
              >
                <MoviePosterCard
                  movie={movie}
                  variant="favorite"
                  onRemoveStart={() => setRemovingId(movie.id)}
                />
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default AccountFavorites;
