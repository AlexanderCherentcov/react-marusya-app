import { Movie } from '@/api/Api';

export interface SearchMoviesViewProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
  loading: boolean;
  error: string | null;
  movies: Movie[];
  trimmed?: string;
  onLinkClick: () => void;
  onReset: () => void;
}
