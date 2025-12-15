import { Movie } from '@/api/Api';

export type MoviePosterCardVariant = 'top' | 'genre' | 'favorite';

export interface MoviePosterCardProps {
  movie: Movie;
  index?: number;
  variant: MoviePosterCardVariant;
  onRemoveStart?: () => void;
}
