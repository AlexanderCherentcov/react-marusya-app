import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/ui/Input';
import Button from '@/ui/Button';
import Spinner from '@/ui/Spinner';
import { useRegister } from '@/hooks/useAuth';
import EmailIcon from '../icon/email.svg';
import PasswordIcon from '../icon/password.svg';
import UserIcon from '../icon/user.svg';
import {
  registerSchema,
  RegisterSchema,
} from '@/features/validation/validation';

//Стили
import '../AuthForm.scss';

interface RegisterFormProps {
  onSuccess?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const { register: registerUser, loading, error: serverError } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (values: RegisterSchema) => {
    try {
      await registerUser({
        name: values.name,
        surname: values.surname,
        email: values.email,
        password: values.password,
      });

      onSuccess?.();
    } catch {}
  };

  return (
    <form
      className="auth-form auth-form--register"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        {...register('email')}
        placeholder="sample@domain.ru"
        leftIcon={<EmailIcon />}
        error={errors.email?.message}
      />

      <Input
        {...register('name')}
        placeholder="Имя"
        leftIcon={<UserIcon />}
        error={errors.name?.message}
      />

      <Input
        {...register('surname')}
        placeholder="Фамилия"
        leftIcon={<UserIcon />}
        error={errors.surname?.message}
      />

      <Input
        {...register('password')}
        placeholder="Пароль"
        type="password"
        leftIcon={<PasswordIcon />}
        error={errors.password?.message}
      />

      <Input
        {...register('passwordRepeat')}
        placeholder="Повторите пароль"
        type="password"
        leftIcon={<PasswordIcon />}
        error={errors.passwordRepeat?.message}
      />

      {serverError && <p className="auth-form__error">{serverError}</p>}

      <Button
        type="submit"
        variant="primary"
        disabled={loading}
        className="auth-form__button"
      >
        {loading ? <Spinner size="sm" /> : 'Создать аккаунт'}
      </Button>
    </form>
  );
};

export default RegisterForm;
