import React from 'react';
import Icon from './icon-placeholder.svg';

//Стили
import './ImagePlaceholder.scss';

interface ImagePlaceholderProps {
  text?: string;
}

const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({ text }) => (
  <div className={'image-placeholder'}>
    <Icon className="image-placeholder__icon" />
    {text && <span className="image-placeholder__text">{text}</span>}
  </div>
);

export default ImagePlaceholder;
