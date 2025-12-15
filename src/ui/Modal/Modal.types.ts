import React from 'react';

export type ModalVariant = 'trailer';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  modalClassName?: string;
  variant?: ModalVariant;
}
