import React, { useEffect, useRef, useState } from 'react';
import Input from '@/ui/Input';
import MovieSearchCard from '@/ui/MovieSearchCard';
import SearchIcon from './search-icon.svg';
import CloseIcon from './close-icon.svg';
import AsyncState from '@/ui/AsyncState';
import { SearchMoviesViewProps } from '@/ui/SearchMoviesView/SearchMoviesView.type';
import Button from '@/ui/Button';

// Стили
import './SearchMoviesView.scss';

const SearchMoviesView: React.FC<SearchMoviesViewProps> = ({
  searchValue,
  setSearchValue,
  loading,
  error,
  movies,
  trimmed,
  onLinkClick,
  onReset,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const hasMovies = movies.length > 0;

  const openSearch = () => setIsOpen(true);

  const clearSearch = () => {
    onReset();
  };

  const closeSearch = () => {
    onReset();
    setIsOpen(false);
  };

  const handleClearOrClose = () => {
    if (isOpen) closeSearch();
    else clearSearch();
  };

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const showOverlay = Boolean(trimmed) && (isOpen || searchValue.length > 0);

  return (
    <div className="search-films">
      <Button
        variant="ghost"
        type="button"
        className="search-films__open-btn"
        onClick={openSearch}
        aria-label="Открыть поиск"
      >
        <SearchIcon width={20} height={20} />
      </Button>

      <div
        className="search-films__inner"
        data-open={isOpen ? 'true' : 'false'}
      >
        <Input
          ref={inputRef}
          id="search"
          variant="search"
          type="search"
          placeholder="Поиск"
          className="search-films__search"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          leftIcon={
            <SearchIcon className="search-films__icon" width={20} height={20} />
          }
          rightIcon={
            searchValue || isOpen ? (
              <Button
                type="button"
                variant="ghost"
                className="search-films__clear-btn"
                onClick={handleClearOrClose}
                aria-label={isOpen ? 'Закрыть поиск' : 'Очистить поиск'}
              >
                <CloseIcon width={18} height={18} />
              </Button>
            ) : null
          }
        />
      </div>

      {showOverlay && (
        <div className="search-films__overlay">
          <AsyncState loading={loading} error={error} spinnerSize="sm" />

          {!loading && !error && (
            <>
              {hasMovies ? (
                <ul className="search-films__list">
                  {movies.map(movie => (
                    <li key={movie.id} className="search-films__item">
                      <MovieSearchCard
                        movie={movie}
                        onLinkClick={() => {
                          onLinkClick?.();
                          setIsOpen(false);
                        }}
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="search-films__not-found">Ничего не найдено</div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchMoviesView;
