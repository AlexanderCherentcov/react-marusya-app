import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { ModalProps } from '@/ui/Modal/Modal.types';

//Стили
import './Modal.scss';

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  modalClassName,
  variant = 'default',
}) => {
  const [render, setRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setRender(true);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!render) return;

    const body = document.body;
    const html = document.documentElement;

    const prevOverflow = body.style.overflow;
    const prevPaddingRight = body.style.paddingRight;

    const scrollBarWidth = window.innerWidth - html.clientWidth;
    if (scrollBarWidth > 0) {
      body.style.paddingRight = `${scrollBarWidth}px`;
    }

    body.style.overflow = 'hidden';

    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPaddingRight;
    };
  }, [render]);

  const handleTransitionEnd = () => {
    if (!isOpen) {
      setRender(false);
    }
  };

  if (!render) return null;

  return (
    <div
      className={cn('modal', modalClassName, {
        'modal--visible': isOpen,
      })}
      onClick={onClose}
    >
      <div
        className={cn('modal__content', {
          'modal__content--trailer': variant === 'trailer',
        })}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        onTransitionEnd={handleTransitionEnd}
      >
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Закрыть"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
