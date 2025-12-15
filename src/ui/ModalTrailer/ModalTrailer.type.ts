import { Movie } from '@/api/Api';

export interface ModalTrailerProps {
  movie: Movie;
  isOpen: boolean;
  onClose: () => void;
}
