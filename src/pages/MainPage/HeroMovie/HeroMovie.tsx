import React from 'react';
import { useRandomMovie } from '@/hooks/useRandomMovie';
import MovieCard from '@/ui/MovieCard';
import AsyncState from '@/ui/AsyncState';

// Стили
import './HeroMovie.scss';
import ModalTrailer from '@/ui/ModalTrailer';
import { useModal } from '@/hooks/useModal';

interface HeroMovieProps {
  onAuthRequired?: () => void;
}

const HeroMovie: React.FC<HeroMovieProps> = ({ onAuthRequired }) => {
  const { movie, loading, error, reset } = useRandomMovie();
  const { isOpen, open, close } = useModal('trailer');

  const hasMovie = !loading && !error && movie;

  return (
    <section className="hero">
      <div className="container">
        <AsyncState
          loading={loading}
          error={error}
          spinnerSize="lg"
          spinnerWrapperClassName="hero__spiner"
        />

        {hasMovie && (
          <MovieCard
            movie={movie}
            onTrailerClick={open}
            onRefreshClick={reset}
            onAuthRequired={onAuthRequired}
          />
        )}
        {hasMovie && (
          <ModalTrailer movie={movie} isOpen={isOpen} onClose={close} />
        )}
      </div>
    </section>
  );
};

export default HeroMovie;
