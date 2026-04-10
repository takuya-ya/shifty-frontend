import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { useResetPassword } from '../hooks/useResetPassword';
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from '../schemas/resetPasswordSchema';

interface ResetPasswordFormProps {
  token: string;
  email: string;
  onSuccess: () => void;
}

export function ResetPasswordForm({ token, email, onSuccess }: ResetPasswordFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({ resolver: zodResolver(resetPasswordSchema) });
  const { mutate: resetPassword, isPending, error } = useResetPassword();

  const onSubmit: SubmitHandler<ResetPasswordFormValues> = (data) => {
    resetPassword(
      { token, email, password: data.password, password_confirmation: data.password_confirmation },
      { onSuccess },
    );
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>新しいパスワードを設定</CardTitle>
        <CardDescription>
          {email} の新しいパスワードを入力してください。
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="reset-password" className="block text-sm font-medium">
              新しいパスワード
            </label>
            <Input
              id="reset-password"
              type="password"
              disabled={isPending}
              autoComplete="new-password"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password.message}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <label htmlFor="reset-password-confirmation" className="block text-sm font-medium">
              パスワード（確認）
            </label>
            <Input
              id="reset-password-confirmation"
              type="password"
              disabled={isPending}
              autoComplete="new-password"
              {...register('password_confirmation')}
            />
            {errors.password_confirmation && (
              <p className="text-sm text-destructive">{errors.password_confirmation.message}</p>
            )}
          </div>
          {error && (
            <p className="text-sm text-destructive">{error.message}</p>
          )}
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? '更新中...' : 'パスワードを更新'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
