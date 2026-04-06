import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '../hooks/useLogin';
import { loginSchema, type LoginFormValues } from '../schemas/loginSchema';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

interface LoginFormProps {
  onLoginSuccess: () => void;
}

export const LoginForm = ({ onLoginSuccess }: LoginFormProps) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });
  const { mutate: login, isPending } = useLogin();

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    setServerError(null);
    login(data, {
      onSuccess: onLoginSuccess,
      onError: (error) => setServerError(error.message),
    });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>ログイン</CardTitle>
        <CardDescription>登録済みメールアドレスでログインしてください。</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="login-email" className="block text-sm font-medium">メールアドレス</label>
            <Input
              id="login-email"
              type="email"
              disabled={isPending}
              {...register('email')}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <label htmlFor="login-password" className="block text-sm font-medium">パスワード</label>
            <Input
              id="login-password"
              type="password"
              disabled={isPending}
              {...register('password')}
            />
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password.message}</p>
            )}
          </div>
          {serverError && <p className="text-sm text-destructive">{serverError}</p>}
          <Button
            type="submit"
            disabled={isPending}
            className="w-full"
          >
            {isPending ? '送信中...' : 'ログイン'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
