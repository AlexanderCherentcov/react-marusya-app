import { useAuthContext } from '@/features/auth/AuthContext';

export const useAuth = () => {
  const { user, loading, isAuth, error, reloadProfile } = useAuthContext();
  return { user, loading, isAuth, error, reloadProfile };
};

export const useLogin = () => {
  const { login, loading, error } = useAuthContext();
  return { login, loading, error };
};

export const useLogout = () => {
  const { logout, loading, error } = useAuthContext();
  return { logout, loading, error };
};

export const useRegister = () => {
  const { register, loading, error } = useAuthContext();
  return { register, loading, error };
};
