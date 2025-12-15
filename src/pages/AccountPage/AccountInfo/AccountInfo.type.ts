import { User } from '@/api/Api';

export interface AccountInfoProps {
  user: User;
  logout: () => Promise<void> | void;
  logoutLoading: boolean;
  logoutError: string | null;
}
