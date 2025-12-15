import React from 'react';
import { useGenresMovies } from '@/hooks/useGenresMovies';
import GenreCard from '@/ui/GenreCard';

//Стили
import './GenresPage.scss';
import AsyncState from '@/ui/AsyncState';

const GenresPage: React.FC = () => {
  const { genres, loading, error } = useGenresMovies();

  const hasGenres = !loading && !error && genres.length > 0;

  return (
    <section className="genres">
      <div className="container">
        <h1 className="genres__title">Жанры фильмов</h1>

        <AsyncState loading={loading} error={error} spinnerSize="lg" />

        {!loading && !error && !hasGenres && (
          <p className="genres__empty">Жанры не найдены</p>
        )}

        {hasGenres && (
          <ul className="genres__list">
            {genres.map(genre => (
              <li className="genres__item" key={genre}>
                <GenreCard genre={genre} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default GenresPage;
