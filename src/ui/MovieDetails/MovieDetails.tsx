import React from 'react';
import { MovieDetailsProps } from '@/ui/MovieDetails/MovieDetails.types';

// Стили
import './MovieDetails.scss';

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie }) => {
  const formatCurrency = (num?: number | string) => {
    if (num === undefined || num === null) return null;

    const value = Number(num);
    if (isNaN(value) || value <= 0) return null;

    return new Intl.NumberFormat('ru-RU').format(value) + ' ₽';
  };
  const details = [
    { label: 'Язык оригинала', value: movie.language },
    { label: 'Бюджет', value: formatCurrency(movie.budget) },
    { label: 'Выручка', value: formatCurrency(movie.revenue) },
    { label: 'Режиссёр', value: movie.director },
    { label: 'Продакшен', value: movie.production },
    { label: 'Награды', value: movie.awardsSummary },
  ];

  return (
    <div className="movie-details">
      {details.map(
        ({ label, value }) =>
          value && (
            <div className="movie-details__row" key={label}>
              <span className="movie-details__label">{label}</span>
              <span className="movie-details__dots" />
              <span className="movie-details__value">{value}</span>
            </div>
          ),
      )}
    </div>
  );
};

export default MovieDetails;
