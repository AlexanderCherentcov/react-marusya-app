import SearchMoviesView from '@/ui/SearchMoviesView';
import React from 'react';
import { useSearchMovies } from '@/hooks/useSearchMovies';

const SearchMovies: React.FC = () => {
  const {
    searchValue,
    setSearchValue,
    movies,
    loading,
    error,
    trimmed,
    resetSearch,
  } = useSearchMovies();

  return (
    <SearchMoviesView
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      movies={movies}
      loading={loading}
      error={error}
      trimmed={trimmed}
      onReset={resetSearch}
      onLinkClick={() => resetSearch()}
    />
  );
};

export default SearchMovies;
