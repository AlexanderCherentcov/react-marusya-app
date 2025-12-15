import React from 'react';

export interface ImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
  loading?: 'lazy' | 'eager';
  placeholderText?: string;
}
