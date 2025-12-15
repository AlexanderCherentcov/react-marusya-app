import React from 'react';
import cn from 'classnames';

import { InputProps } from './Input.types';
import './Input.scss';

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = 'text',
      placeholder,
      className,
      inputClassName,
      id,
      variant = 'default',
      label,
      error,
      leftIcon,
      rightIcon,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        className={cn(
          'custom-input',
          {
            'custom-input--search': variant === 'search',
            'custom-input--default': variant === 'default',
            'custom-input--error': !!error,
          },
          className,
        )}
      >
        {label && (
          <label className="custom-input__label" htmlFor={id}>
            {label}
          </label>
        )}

        <div className="custom-input__inner">
          {leftIcon && (
            <span
              className={cn('custom-input__icon custom-input__icon--left', {
                'custom-input__icon--error': !!error,
              })}
            >
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            className={cn(
              'input',
              {
                'input--error': !!error,
                'input--with-left-icon': !!leftIcon,
                'input--with-right-icon': !!rightIcon,
              },
              inputClassName,
            )}
            type={type}
            placeholder={placeholder}
            id={id}
            aria-invalid={!!error}
            {...props}
          />

          {rightIcon && (
            <span className="custom-input__icon custom-input__icon--right">
              {rightIcon}
            </span>
          )}
        </div>

        {error && <span className="custom-input__error">{error}</span>}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
