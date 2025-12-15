import React from 'react';
import Modal from '@/ui/Modal';
import LoginForm from '@/ui/Auth/LoginForm';
import RegisterForm from '@/ui/Auth/RegisterForm';
import type { AuthModalProps } from './AuthModal.types';
import Button from '@/ui/Button';
import Image from '@/ui/Image';
import logo from './marusa-black.webp';

// Стили
import './AuthModal.scss';

const AuthModal: React.FC<AuthModalProps> = ({
  view,
  onChangeView,
  onClose,
}) => {
  const isOpen = view !== null;

  if (!isOpen) return null;

  const handleClose = () => {
    onChangeView(null);
    onClose();
  };

  const handleToggleClick = () => {
    if (view === 'login') {
      onChangeView('register');
    } else if (view === 'register') {
      onChangeView('login');
    } else if (view === 'register-success') {
      onChangeView('login');
    }
  };

  const toggleLabel =
    view === 'login'
      ? 'Регистрация'
      : view === 'register'
        ? 'У меня есть пароль'
        : view === 'register-success'
          ? 'Войти'
          : '';

  return (
    <Modal isOpen={isOpen} onClose={handleClose} modalClassName="auth-modal">
      <Image
        src={logo}
        alt="logotip"
        width="156"
        height="35"
        className="auth-modal__logotip"
      />
      {view === 'login' && <LoginForm onSuccess={handleClose} />}

      {view === 'register' && (
        <RegisterForm onSuccess={() => onChangeView('register-success')} />
      )}

      {view === 'register-success' && (
        <div>
          <h2>Регистрация прошла успешно</h2>
          <p>Теперь вы можете войти в свой аккаунт.</p>
        </div>
      )}

      {toggleLabel && (
        <div className="auth-modal__footer">
          <Button
            variant="ghost"
            type="button"
            onClick={handleToggleClick}
            className="auth-modal__btn"
          >
            {toggleLabel}
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default AuthModal;
