import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'Введите email').email('Некорректный email'),
  password: z.string().min(6, 'Минимум 6 символов'),
});

export const registerSchema = z
  .object({
    name: z.string().min(1, 'Введите имя'),
    surname: z.string().min(1, 'Введите фамилию'),
    email: z.string().min(1, 'Введите email').email('Некорректный email'),
    password: z.string().min(6, 'Минимум 6 символов'),
    passwordRepeat: z.string().min(1, 'Повторите пароль'),
  })
  .refine(data => data.password === data.passwordRepeat, {
    message: 'Пароли не совпадают',
    path: ['passwordRepeat'],
  });

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
