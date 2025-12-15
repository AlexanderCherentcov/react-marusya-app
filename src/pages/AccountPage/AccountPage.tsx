import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useLogout } from '@/hooks/useAuth';
import Spinner from '@/ui/Spinner';
import Button from '@/ui/Button';
import AccountInfo from '@/pages/AccountPage/AccountInfo/AccountInfo';
import IconFavorite from './icon/favorite.svg';
import IconUser from './icon/user.svg';
import AccountFavorites from '@/pages/AccountPage/AccountFavorites/AccountFavorites';

// Стили
import './AccountPage.scss';

type Tab = 'info' | 'favorites';

const AccountPage: React.FC = () => {
  const navigate = useNavigate();

  const { user, loading: userLoading, isAuth } = useAuth();
  const { logout, loading: logoutLoading, error: logoutError } = useLogout();

  const [activeTab, setActiveTab] = useState<Tab>('info');

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/main');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className="account">
      <div className="container">
        <h1 className="account__title">Мой аккаунт</h1>

        {userLoading && <Spinner size="lg" />}

        {!userLoading && (!isAuth || !user) && <p>Вы не авторизованы</p>}

        {!userLoading && isAuth && user && (
          <>
            <div className="account__tabs">
              <Button
                variant="ghost"
                type="button"
                className={`account__tab ${
                  activeTab === 'favorites' ? 'account__tab--active' : ''
                }`}
                onClick={() => setActiveTab('favorites')}
              >
                <IconFavorite />
                <span className="account__tabs-text">Избранные фильмы</span>
                <span className="account__tabs-text-md">Избранное</span>
              </Button>

              <Button
                variant="ghost"
                type="button"
                className={`account__tab ${
                  activeTab === 'info' ? 'account__tab--active' : ''
                }`}
                onClick={() => setActiveTab('info')}
              >
                <IconUser />
                <span className="account__tabs-text">Настройка аккаунта</span>
                <span className="account__tabs-text-md">Настройки</span>
              </Button>
            </div>

            <div className="account-page__content">
              {activeTab === 'info' && (
                <AccountInfo
                  user={user}
                  logout={handleLogout}
                  logoutLoading={logoutLoading}
                  logoutError={logoutError}
                />
              )}

              {activeTab === 'favorites' && (
                <AccountFavorites favoritesIds={user.favorites ?? []} />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default AccountPage;
