import React from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Вариант оформления кнопки */
  variant: 'primary' | 'secondary' | 'formAccent' | 'ghost' | 'icon';

  /** Дополнительный класс */
  className?: string;
}
