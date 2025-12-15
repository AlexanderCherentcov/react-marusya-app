import React from 'react';
import { useParams } from 'react-router-dom';
import { useMovieById } from '@/hooks/useMovies';
import AsyncState from '@/ui/AsyncState';
import MovieCard from '@/ui/MovieCard';
import MovieDetails from '@/ui/MovieDetails';
import { useModal } from '@/hooks/useModal';
import ModalTrailer from '@/ui/ModalTrailer';

//Стили
import './MoviePage.scss';

const MoviePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { movie, loading, error } = useMovieById(Number(id));
  const { isOpen, open, close } = useModal('trailer');

  const hasMovie = !loading && !error && movie;

  return (
    <section className="movie">
      <div className="container">
        <AsyncState loading={loading} error={error} spinnerSize="lg" />

        {hasMovie && (
          <div className="movie__content">
            <MovieCard
              movie={movie}
              showAboutLink={false}
              onTrailerClick={open}
            />

            <h2 className="movie__captain">О фильме</h2>
            <MovieDetails movie={movie} />
          </div>
        )}
        {hasMovie && (
          <ModalTrailer movie={movie} isOpen={isOpen} onClose={close} />
        )}
      </div>
    </section>
  );
};

export default MoviePage;
