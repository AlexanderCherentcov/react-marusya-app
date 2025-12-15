import React, { useState, useEffect, useCallback } from 'react';
import { useMoviesFiltered } from '@/hooks/useMovies';
import { Movie } from '@/api/Api';

type UseMoviesSearchResult = {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  movies: Movie[];
  loading: boolean;
  error: string | null;
  trimmed: string | undefined;
  resetSearch: () => void;
};

export function useSearchMovies(): UseMoviesSearchResult {
  const [searchValue, setSearchValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      const trimmed = searchValue.trim();
      setDebouncedValue(trimmed === '' ? undefined : trimmed);
    }, 500); // задержка 500 мс

    return () => {
      clearTimeout(handler); // очищаем таймер при изменении searchValue
    };
  }, [searchValue]);

  const { movies, loading, error } = useMoviesFiltered(
    debouncedValue,
    undefined,
    1,
    5,
  );

  const resetSearch = () => {
    setSearchValue('');
    setDebouncedValue(undefined);
  };

  return {
    searchValue,
    setSearchValue,
    movies,
    loading,
    error,
    trimmed: debouncedValue,
    resetSearch,
  };
}
