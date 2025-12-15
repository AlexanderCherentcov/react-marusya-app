import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiClient } from '@/services/api';
import type { User } from '@/api/Api';

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  isAuth: boolean;
  error: string | null;

  login: (data: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    name?: string;
    surname?: string;
  }) => Promise<void>;

  reloadProfile: () => Promise<void>; // тихая перезагрузка профиля
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // загрузка профиля при старте
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async (options?: { silent?: boolean }) => {
    const silent = options?.silent === true;

    if (!silent) {
      setLoading(true);
    }

    setError(null);

    try {
      const res = await apiClient.profile.profileGet();
      setUser(res.data);
    } catch {
      setUser(null);
    } finally {
      if (!silent) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    void fetchProfile();
  }, []);

  const login = async (data: { email: string; password: string }) => {
    setError(null);
    try {
      await apiClient.auth.authLoginPost(data);
      await fetchProfile(); // обычная загрузка
    } catch (e) {
      setUser(null);
      setError(e instanceof Error ? e.message : 'Ошибка авторизации');
      throw e;
    }
  };

  const register = async (data: {
    email: string;
    password: string;
    name?: string;
    surname?: string;
  }) => {
    setError(null);
    try {
      await apiClient.user.userPost(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Ошибка регистрации');
      throw e;
    }
  };

  const logout = async () => {
    setError(null);
    try {
      await apiClient.auth.authLogoutGet();
      setUser(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Ошибка выхода');
      throw e;
    }
  };

  const reloadProfile = async () => {
    await fetchProfile({ silent: true });
  };

  const value: AuthContextValue = {
    user,
    loading,
    isAuth: !!user,
    error,
    login,
    logout,
    register,
    reloadProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error(
      'useAuthContext должен использоваться внутри <AuthProvider>',
    );
  }
  return ctx;
};
