import { useState, type FormEvent } from 'react';
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

interface ResetPasswordFormProps {
  token: string;
  email: string;
  onSuccess: () => void;
}

export function ResetPasswordForm({ token, email, onSuccess }: ResetPasswordFormProps) {
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const { mutate: resetPassword, isPending, error } = useResetPassword();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    resetPassword(
      { token, email, password, password_confirmation: passwordConfirmation },
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="password" className="block text-sm font-medium">
              新しいパスワード
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="password_confirmation" className="block text-sm font-medium">
              パスワード（確認）
            </label>
            <Input
              id="password_confirmation"
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
              autoComplete="new-password"
            />
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
