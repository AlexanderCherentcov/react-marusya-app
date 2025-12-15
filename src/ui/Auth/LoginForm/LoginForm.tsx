import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/ui/Input';
import Button from '@/ui/Button';
import Spinner from '@/ui/Spinner';
import { useLogin } from '@/hooks/useAuth';
import EmailIcon from '../icon/email.svg';
import PasswordIcon from '../icon/password.svg';

//Стили
import '../AuthForm.scss';

import { loginSchema, LoginSchema } from '@/features/validation/validation';

interface LoginFormProps {
  onSuccess?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const { login, loading, error: serverError } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (values: LoginSchema) => {
    try {
      await login(values);
      onSuccess?.();
    } catch {}
  };

  return (
    <form
      className="auth-form auth-form--login"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        id="email"
        {...register('email')}
        placeholder="Электронная почта"
        type="email"
        leftIcon={<EmailIcon />}
        error={errors.email?.message}
      />

      <Input
        id="password"
        {...register('password')}
        placeholder="Пароль"
        type="password"
        leftIcon={<PasswordIcon />}
        error={errors.password?.message}
      />

      {serverError && <p className="auth-form__error">{serverError}</p>}

      <Button
        type="submit"
        variant="primary"
        disabled={loading}
        className="auth-form__button"
      >
        {loading ? <Spinner size="sm" /> : 'Войти'}
      </Button>
    </form>
  );
};

export default LoginForm;
