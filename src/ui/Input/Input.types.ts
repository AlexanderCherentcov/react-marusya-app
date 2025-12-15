import React from 'react';

export type InputVariant = 'default' | 'search';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id'> {
  id?: string;

  /** Текст метки сверху */
  label?: string;

  /** Текст ошибки */
  error?: string;

  /** Вид инпута: обычный или поисковый */
  variant?: InputVariant;

  /** Класс на контейнер (обёртку) */
  className?: string;

  /** Класс на сам <input> */
  inputClassName?: string;

  /** Иконка слева от текста (SearchIcon и т.д.) */
  leftIcon?: React.ReactNode;

  /** Иконка/кнопка справа */
  rightIcon?: React.ReactNode;
}
