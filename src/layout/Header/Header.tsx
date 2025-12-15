import React from 'react';
import Link from '@/ui/Link';
import Button from '@/ui/Button';
import Image from '@/ui/Image';
import SearchMovies from '@/features/SearchMovies';
import logo from '@/assets/img/header/logotip.webp';
import { HeaderProps } from '@/layout/Header/Header.type';
import IconUser from '@/assets/img/header/user.svg';
import IconGenre from '@/assets/img/header/genres.svg';

// Стили
import './Header.scss';

interface NavItem {
  id: number;
  name: string;
  to: string;
}

const navLinks: NavItem[] = [
  { id: 1, name: 'Главная', to: '/main' },
  { id: 2, name: 'Жанры', to: '/genres' },
];

const Header: React.FC<HeaderProps> = ({
  user,
  loading,
  isAuth,
  onLoginClick,
}) => {
  const showUser = !!user && isAuth;
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <Link
            to="/main"
            variant="logo"
            aria-label="На главную"
            className="header__logo-link"
          >
            <Image
              src={logo}
              alt="logo"
              width={144}
              height={32}
              className="header__logo"
              loading="eager"
            />
          </Link>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item header__nav-item--sm">
                <Link to="/genres" variant="default">
                  <IconGenre />
                </Link>
              </li>
              {navLinks.map(link => (
                <li key={link.id} className="header__nav-item">
                  <Link to={link.to} label={link.name} />
                </li>
              ))}
            </ul>
            <SearchMovies />
          </nav>

          {showUser ? (
            <Link to="/account" className="header__user" aria-label="Профиль">
              <span className="header__user-text">{user!.name}</span>
              <span className="header__user-icon" aria-hidden="true">
                <IconUser />
              </span>
            </Link>
          ) : (
            !loading && (
              <Button
                variant="ghost"
                className="header__login"
                onClick={onLoginClick}
                aria-label="Войти"
              >
                <span className="header__user-text">Войти</span>
                <span className="header__user-icon" aria-hidden="true">
                  <IconUser />
                </span>
              </Button>
            )
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
