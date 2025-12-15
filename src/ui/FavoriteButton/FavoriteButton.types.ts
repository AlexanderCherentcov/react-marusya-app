type FavoriteButtonVariant = 'remove';
export interface FavoriteButtonProps {
  movieId?: number;
  className?: string;
  variant?: FavoriteButtonVariant;
  onAuthRequired?: () => void;
  onRemoveStart?: () => void;
}
