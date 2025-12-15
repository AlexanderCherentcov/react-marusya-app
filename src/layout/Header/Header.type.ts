import { User } from '@/api/Api';

export type HeaderProps = {
  user: User | null;
  loading: boolean;
  isAuth: boolean;
  onLoginClick: () => void;
};
