import React from 'react';
import Link from '@/ui/Link';
import Image from '@/ui/Image';
import { MoviePosterCardProps } from '@/ui/MoviePosterCard/MoviePosterCard.type';
import FavoriteButton from '@/ui/FavoriteButton';

// Стили
import './MoviePosterCard.scss';
import cn from 'classnames';

const MoviePosterCard: React.FC<MoviePosterCardProps> = ({
  movie,
  index,
  variant,
  onRemoveStart,
}) => {
  return (
    <article
      className={cn('top-movie-card', {
        'top-movie-card--favorite': variant === 'favorite',
      })}
    >
      {variant === 'top' ? (
        <div className="top-movie-card__number">{index}</div>
      ) : null}

      {variant === 'favorite' ? (
        <FavoriteButton
          movieId={movie.id}
          variant="remove"
          onRemoveStart={onRemoveStart}
          className="top-movie-card__remove"
          aria-label="Удалить из избраного"
        />
      ) : null}

      <Link
        to={`/movie/${movie.id}`}
        variant="img"
        className="top-movie-card__link"
      >
        <Image
          src={movie.posterUrl}
          alt={`Постер фильма ${movie.title}`}
          className="top-movie-card__img"
        />
      </Link>
    </article>
  );
};

export default MoviePosterCard;
