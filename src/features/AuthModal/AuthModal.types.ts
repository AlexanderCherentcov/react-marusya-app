export type AuthView = 'login' | 'register' | 'register-success' | null;

export interface AuthModalProps {
  view: AuthView;
  onChangeView: (view: AuthView) => void;
  onClose: () => void;
}
