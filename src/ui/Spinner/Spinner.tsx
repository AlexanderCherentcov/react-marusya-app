import React from 'react';
import { SpinnerProps } from '@/ui/Spinner/Spinner.type';

// Стили
import './Spinner.scss';

const Spinner: React.FC<SpinnerProps> = ({ className, size = 'sm' }) => {
  return (
    <span
      className={`spinner spinner--${size} ${className || ''}`}
      aria-hidden="true"
    />
  );
};

export default Spinner;
