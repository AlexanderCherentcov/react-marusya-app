import { Movie } from '@/api/Api';

export interface MovieCardProps {
  movie: Movie;
  showAboutLink?: boolean;
  onTrailerClick?: () => void;
  onRefreshClick?: () => void;
  onAuthRequired?: () => void;
}
