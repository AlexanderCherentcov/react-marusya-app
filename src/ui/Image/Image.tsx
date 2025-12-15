import React, { useState } from 'react';
import { ImageProps } from '@/ui/Image/Image.types';
import ImagePlaceholder from '@/ui/ImagePlaceholder';

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  ariaLabel,
  className,
  style,
  loading = 'lazy',
  placeholderText,
}) => {
  const [hasError, setHasError] = useState(false);

  const showPlaceholder = !src || hasError;

  if (showPlaceholder) {
    return <ImagePlaceholder text={placeholderText || alt} />;
  }

  return (
    <img
      src={src}
      alt={alt}
      aria-label={ariaLabel || alt}
      width={width}
      height={height}
      className={className}
      style={style}
      loading={loading}
      onError={() => setHasError(true)}
    />
  );
};

export default Image;
