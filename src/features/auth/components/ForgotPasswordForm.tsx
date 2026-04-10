import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useForgotPassword } from '../hooks/useForgotPassword';
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from '../schemas/forgotPasswordSchema';

interface ForgotPasswordFormProps {
  onSwitchToLogin: () => void;
}

export function ForgotPasswordForm({ onSwitchToLogin }: ForgotPasswordFormProps) {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({ resolver: zodResolver(forgotPasswordSchema) });
  const { mutate: sendResetLink, isPending, isSuccess, error } = useForgotPassword();

  const onSubmit: SubmitHandler<ForgotPasswordFormValues> = (data) => {
    sendResetLink(data.email);
  };

  if (isSuccess) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>メールを送信しました</CardTitle>
          <CardDescription>
            パスワード再設定のリンクを <strong>{getValues('email')}</strong> に送信しました。メールをご確認ください。
          </CardDescription>
        </CardHeader>
        <CardFooter className="justify-center">
          <Button variant="link" className="px-0" onClick={onSwitchToLogin}>
            ログインに戻る
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>パスワード再設定</CardTitle>
        <CardDescription>
          登録済みのメールアドレスを入力してください。再設定リンクをお送りします。
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="forgot-password-email" className="block text-sm font-medium">
              メールアドレス
            </label>
            <Input
              id="forgot-password-email"
              type="email"
              disabled={isPending}
              autoComplete="email"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>
          {error && (
            <p className="text-sm text-destructive">{error.message}</p>
          )}
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? '送信中...' : '再設定リンクを送信'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="justify-center">
        <Button type="button" variant="link" className="px-0" onClick={onSwitchToLogin}>
          ログインに戻る
        </Button>
      </CardFooter>
    </Card>
  );
}
