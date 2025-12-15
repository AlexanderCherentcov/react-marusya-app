import React from 'react';
import RatingMovie from '@/ui/RatingMovie';
import RefreshIcon from './refresh-icon.svg';
import { MovieCardProps } from '@/ui/MovieCard/MovieCard.type';
import Link from '@/ui/Link';
import Button from '@/ui/Button';
import FavoriteButton from '@/ui/FavoriteButton';

// Стили
import './MovieCard.scss';

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  showAboutLink = true,
  onTrailerClick,
  onRefreshClick,
  onAuthRequired,
}) => {
  const TitleTag = showAboutLink ? 'h2' : 'h1';
  return (
    <article className="movie-card">
      <div className="movie-card__content">
        <div className="movie-card__info-wrapper">
          <div className="movie-card__info">
            <RatingMovie value={movie.tmdbRating} />
            <span className="movie-card__text">{movie.releaseYear ?? '—'}</span>
            <span className="movie-card__text">
              {movie.genres?.join(', ') || 'Жанр не указан'}
            </span>
            <span className="movie-card__text">
              {movie.runtime ? `${movie.runtime} мин.` : '—'}
            </span>
          </div>
          <TitleTag className="movie-card__title">
            {movie.title || 'Без названия'}
          </TitleTag>
          <p className="movie-card__descr">
            {movie.plot || 'Описание фильма будет добавлено позже.'}
          </p>
        </div>
        <div className="movie-card__actions-wrapper">
          <Button
            variant="primary"
            onClick={onTrailerClick}
            className="movie-card__btn-trailer"
          >
            Трейлер
          </Button>
          {showAboutLink ? (
            <Link
              to={`/movie/${movie.id}`}
              label={'О фильме'}
              variant="button"
            />
          ) : null}
          <FavoriteButton movieId={movie.id} onAuthRequired={onAuthRequired} />
          {showAboutLink ? (
            <Button variant="icon" onClick={onRefreshClick}>
              <RefreshIcon />
            </Button>
          ) : null}
        </div>
      </div>
      <img
        className="movie-card__img"
        src={movie.backdropUrl ?? movie.posterUrl}
        width={680}
        height={552}
        alt={`Постер фильма ${movie.title}`}
      ></img>
    </article>
  );
};

export default MovieCard;
