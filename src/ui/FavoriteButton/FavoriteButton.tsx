import React from 'react';
import { useFavoriteMovie } from '@/hooks/useFavoriteMovie';
import HeartIcon from './heart.svg';
import { FavoriteButtonProps } from '@/ui/FavoriteButton/FavoriteButton.types';
import Button from '@/ui/Button';

//Стили
import './FavoriteButton.scss';

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  movieId,
  className,
  variant,
  onAuthRequired,
  onRemoveStart,
}) => {
  const { isFavorite, isAuth, loading, toggleFavorite, removeFavorite } =
    useFavoriteMovie(movieId);

  const disabled = loading || !movieId;

  const handleClick = async () => {
    if (!isAuth) {
      onAuthRequired?.();
      return;
    }

    if (variant === 'remove') {
      onRemoveStart?.();
      await removeFavorite();
    } else {
      await toggleFavorite();
    }
  };

  return (
    <Button
      variant="icon"
      type="button"
      className={`favorite-btn ${isFavorite ? 'favorite-btn--active' : ''} ${className || ''}`}
      onClick={handleClick}
      aria-pressed={isFavorite}
      disabled={disabled}
    >
      {variant === 'remove' ? (
        'X'
      ) : (
        <HeartIcon className="favorite-btn__icon" />
      )}

      {loading && <span className="favorite-btn__spinner" />}
    </Button>
  );
};

export default FavoriteButton;
