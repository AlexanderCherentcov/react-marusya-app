import React from 'react';
import { MovieSearchCardProps } from '@/ui/MovieSearchCard/MovieSearchCard.types';
import Link from '@/ui/Link';
import RatingMovie from '@/ui/RatingMovie';

// Стили
import './MovieSearchCard.scss';

const MovieSearchCard: React.FC<MovieSearchCardProps> = ({
  movie,
  onLinkClick,
}) => {
  return (
    <div className="movie-search-card">
      <img
        className="movie-search-card__img"
        src={movie.posterUrl}
        width={40}
        height={52}
        alt={`Постер фильма ${movie.title}`}
      ></img>
      <div className="movie-search-card__content">
        <div className="movie-search-card__info">
          <RatingMovie value={movie.tmdbRating} size="sm" />
          <span className="movie-search-card__text">
            {movie.releaseYear ?? '—'}
          </span>
          <span className="movie-search-card__text">
            {movie.genres?.join(', ') || 'Жанр не указан'}
          </span>
          <span className="movie-search-card__text">
            {movie.runtime ? `${movie.runtime} мин.` : '—'}
          </span>
        </div>
        <Link
          to={`/movie/${movie.id}`}
          className="movie-search-card__link"
          onClick={onLinkClick}
        >
          <h3 className="movie-search-card__title">
            {movie.title || 'Без названия'}
          </h3>
        </Link>
      </div>
    </div>
  );
};

export default MovieSearchCard;
