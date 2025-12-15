import React from 'react';
import Button from '@/ui/Button';
import Spinner from '@/ui/Spinner';
import IconEmail from './icon/mail.svg';
import { AccountInfoProps } from '@/pages/AccountPage/AccountInfo/AccountInfo.type';
import { getInitials } from '@/utils/getInitials';

import './AccountInfo.scss';

const AccountInfo: React.FC<AccountInfoProps> = ({
  user,
  logout,
  logoutLoading,
  logoutError,
}) => {
  return (
    <>
      <div className="info-account">
        <div className="info-account__date">
          <div className="info-account__icon">
            {getInitials(user.name, user.surname)}
          </div>
          <div className="info-account__wrapper">
            <span className="info-account__label">Имя Фамилия</span>
            <span className="info-account__info">
              {user.name} {user.surname}
            </span>
          </div>
        </div>

        <div className="info-account__date">
          <div className="info-account__icon">
            <IconEmail />
          </div>
          <div className="info-account__wrapper">
            <span className="info-account__label">Электронная почта</span>
            <span className="info-account__info">{user.email}</span>
          </div>
        </div>
      </div>

      <Button
        className="account__btn"
        variant="primary"
        onClick={logout}
        disabled={logoutLoading}
      >
        {logoutLoading ? <Spinner size="sm" /> : 'Выйти из аккаунта'}
      </Button>

      {logoutError && <p className="account__error">{logoutError}</p>}
    </>
  );
};

export default AccountInfo;
