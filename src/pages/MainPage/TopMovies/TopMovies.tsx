import React from 'react';
import { useTopMovie } from '@/hooks/useTopMovie';
import MoviePosterCard from '@/ui/MoviePosterCard';
import AsyncState from '@/ui/AsyncState';

//Стили
import './TopMovies.scss';

const TopMovies: React.FC = () => {
  const { movies, loading, error } = useTopMovie();

  const hasMovie = !loading && !error && movies;

  return (
    <section className="top-movies">
      <div className="container">
        <AsyncState loading={loading} error={error} spinnerSize="lg" />

        {hasMovie && (
          <ul className="top-movies__list">
            {movies.map((movie, index) => (
              <li key={movie.id} className="top-movies__item">
                <MoviePosterCard
                  movie={movie}
                  index={index + 1}
                  variant="top"
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default TopMovies;
