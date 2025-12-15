import { Movie } from '@/api/Api';

export interface MovieSearchCardProps {
  movie: Movie;
  onLinkClick: () => void;
}
