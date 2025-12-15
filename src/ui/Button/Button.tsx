import React from 'react';
import cn from 'classnames';
import { ButtonProps } from '@/ui/Button/Button.type';

// Стили
import './Button.scss';

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  className,
  children,
  ...props
}) => {
  return (
    <button className={cn('btn', `btn--${variant}`, className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
