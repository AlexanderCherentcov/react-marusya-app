import React from 'react';
import Spinner from '@/ui/Spinner';
import { AsyncStateProps } from '@/ui/AsyncState/AsyncState.type';

// Стили
import './AsyncState.scss';

const AsyncState: React.FC<AsyncStateProps> = ({
  loading,
  error,
  spinnerWrapperClassName,
  errorClassName,
  spinnerSize = 'lg',
}) => {
  if (loading) {
    return (
      <div
        className={`async-state__spinner-wrapper ${spinnerWrapperClassName || ''}`}
      >
        <Spinner size={spinnerSize} />
      </div>
    );
  }

  if (!loading && error) {
    return (
      <div
        className={`error-message async-state__error ${errorClassName || ''}`}
      >
        <span className="error-message__icon" aria-hidden="true">
          ⚠️
        </span>
        <span className="error-message__text">Ошибка: {error}</span>
      </div>
    );
  }

  return null;
};

export default AsyncState;
