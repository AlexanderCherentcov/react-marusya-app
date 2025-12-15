import type { AnchorHTMLAttributes, ReactNode } from 'react';

export type LinkVariant = 'default' | 'button' | 'logo' | 'svg' | 'img';

export interface LinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  /** URL ссылки (для RouterLink) */
  to: string;

  /** Текст ссылки, если нет children */
  label?: ReactNode;

  /** Иконка слева от текста */
  icon?: ReactNode;

  /** Дополнительный текст под ссылкой */
  description?: ReactNode;

  /** Стилизация */
  variant?: LinkVariant;

  /** Сложный контент ссылки */
  children?: ReactNode;

  /** Класс для ссылки */
  className?: string;
}
