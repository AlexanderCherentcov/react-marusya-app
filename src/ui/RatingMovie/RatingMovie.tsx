import React from 'react';
import { RatingMovieTypes } from '@/ui/RatingMovie/RatingMovie.types';
import cn from 'classnames';
import StarIcon from './star.svg';

// Стили
import './RatingMovie.scss';

const RatingMovie: React.FC<RatingMovieTypes> = ({
  value,
  className,
  size,
}) => {
  if (value == null) {
    return <span className="rating-movie rating-movie--empty">—</span>;
  }

  let ratingClass = '';

  if (value >= 8) {
    ratingClass = 'rating-movie--excellent';
  } else if (value >= 7) {
    ratingClass = 'rating-movie--good';
  } else if (value >= 6) {
    ratingClass = 'rating-movie--average';
  } else {
    ratingClass = 'rating-movie--bullshit';
  }

  return (
    <span
      className={cn(
        'rating-movie',
        ratingClass,
        `rating-movie--${size}`,
        className,
      )}
    >
      <StarIcon
        className="rating-movie__icon"
        width={20}
        height={20}
        aria-hidden="true"
      />
      <span className="rating-movie__info">{Math.round(value * 10) / 10}</span>
    </span>
  );
};

export default RatingMovie;
