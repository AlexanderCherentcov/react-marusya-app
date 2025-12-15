import React from 'react';
import HeroMovie from '@/pages/MainPage/HeroMovie';
import TopMovies from './TopMovies/TopMovies';

interface MainPageProps {
  onAuthRequired?: () => void;
}

const MainPage: React.FC<MainPageProps> = ({ onAuthRequired }) => {
  return (
    <div className="main-page">
      <h1 className="visually-hidden">Онлайн-кинотеатр — лучшие фильмы</h1>
      <HeroMovie onAuthRequired={onAuthRequired} />
      <TopMovies />
    </div>
  );
};

export default MainPage;
