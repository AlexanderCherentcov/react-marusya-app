import React from 'react';
import Image from '@/ui/Image';
import Link from '@/ui/Link';
import { GenreCardProps } from '@/ui/GenreCard/GenreCard.types';
import { getGenreImage } from '@/assets/img/genres';

//Стили
import './GenreCard.scss';

const GenreCard: React.FC<GenreCardProps> = ({ genre }) => {
  const img = getGenreImage(genre);

  return (
    <article className="genre-card">
      <div className="genre-card__top">
        <Image
          src={img}
          alt={`Жанр: ${genre}`}
          className="genre-card__img"
          width={290}
          height={220}
          loading="lazy"
        />
      </div>

      <Link
        to={`/genre/${genre}`}
        variant="button"
        className="genre-card__link"
      >
        {genre}
      </Link>
    </article>
  );
};

export default GenreCard;
