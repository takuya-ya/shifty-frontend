import { z } from 'zod';

export const registerSchema = z
  .object({
    name: z.string().min(1, '名前を入力してください').max(255, '名前は255文字以内で入力してください'),
    email: z
      .string()
      .min(1, 'メールアドレスを入力してください')
      .max(255, 'メールアドレスは255文字以内で入力してください')
      .pipe(z.email('メールアドレスの形式が正しくありません')),
    password: z
      .string()
      .min(1, 'パスワードを入力してください')
      .min(8, 'パスワードは8文字以上で入力してください'),
    password_confirmation: z.string().min(1, 'パスワード(確認)を入力してください'),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'パスワードが一致しません',
    path: ['password_confirmation'],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
