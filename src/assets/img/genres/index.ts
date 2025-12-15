import history from './genre-history.webp';
import horror from './genre-horror.webp';
import scifi from './genre-scifi.webp';
import standup from './genre-stand-up.webp';
import fantasy from './genre-fantasy.webp';
import drama from './genre-drama.webp';
import mystery from './genre-mystery.webp';
import family from './genre-family.webp';
import comedy from './genre-comedy.webp';
import romance from './genre-romance.webp';
import music from './genre-music.webp';
import crime from './genre-crime.webp';
import tvmovie from './genre-tv-movie.webp';
import documentary from './genre-documentary.webp';
import action from './genre-action.webp';
import thriller from './genre-thriller.webp';
import western from './genre-western.webp';
import animation from './genre-animation.webp';
import war from './genre-war.webp';
import adventure from './genre-adventure.webp';

const GENRE_IMAGES: Record<string, string> = {
  history,
  horror,
  scifi,
  'stand-up': standup,
  fantasy,
  drama,
  mystery,
  family,
  comedy,
  romance,
  music,
  crime,
  'tv-movie': tvmovie,
  documentary,
  action,
  thriller,
  western,
  animation,
  war,
  adventure,
};

export function getGenreImage(genre: string): string {
  return GENRE_IMAGES[genre.toLowerCase()];
}
