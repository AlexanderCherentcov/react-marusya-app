import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMoviesFiltered } from '@/hooks/useMovies';
import AsyncState from '@/ui/AsyncState';
import MoviePosterCard from '@/ui/MoviePosterCard';
import Button from '@/ui/Button';
import Link from '@/ui/Link';
import ArrowIcon from './arrow.svg';

// Стили
import './GenreMoviesPage.scss';

const GenreMoviesPage: React.FC = () => {
  const { genre } = useParams<{ genre: string }>();
  const [visibleCount, setVisibleCount] = useState(8);

  const { movies, loading, error } = useMoviesFiltered(undefined, genre, 1, 50);

  const visibleMovies = movies.slice(0, visibleCount);

  const handleShowMore = () => {
    setVisibleCount(prev => prev + 8);
  };

  const hasMovie = !loading && !error && movies.length > 0;

  return (
    <section className="genre-movies">
      <div className="container">
        <Link to="/genres" variant="default" className="genre-movies__link">
          <ArrowIcon />
          <h1 className="genre-movies__title">{genre}</h1>
        </Link>

        <div className="genre-movies__wrapper">
          <AsyncState loading={loading} error={error} spinnerSize="lg" />

          {!loading && !error && !hasMovie && (
            <p className="genre-movies__empty">
              Для этого жанра фильмы не найдены
            </p>
          )}

          {hasMovie && (
            <>
              <ul className="genre-movies__list">
                {visibleMovies.map(movie => (
                  <li className="genre-movies__item" key={movie.id}>
                    <MoviePosterCard movie={movie} variant="genre" />
                  </li>
                ))}
              </ul>

              <Button
                variant="primary"
                disabled={visibleMovies.length >= movies.length}
                onClick={handleShowMore}
              >
                Показать ещё
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default GenreMoviesPage;
