import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import cn from 'classnames';
import type { LinkProps } from './Link.types';

import './Link.scss';

const Link: React.FC<LinkProps> = ({
  to,
  label,
  children,
  description,
  icon,
  className,
  variant = 'default',
  ...rest
}) => {
  return (
    <>
      <RouterLink
        to={to}
        className={cn(
          'link',
          {
            'link-default': variant === 'default',
            'link--button': variant === 'button',
            'link--logo': variant === 'logo',
            'link--svg': variant === 'svg',
            'link--img': variant === 'img',
          },
          className,
        )}
        {...rest}
      >
        {icon && <span className="link-icon">{icon}</span>}
        {children ?? label}
      </RouterLink>

      {description && <div className="link-description">{description}</div>}
    </>
  );
};

export default Link;
