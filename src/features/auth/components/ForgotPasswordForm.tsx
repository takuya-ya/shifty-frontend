import { useState, type FormEvent } from 'react';
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

interface ForgotPasswordFormProps {
  onSwitchToLogin: () => void;
}

export function ForgotPasswordForm({ onSwitchToLogin }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState('');
  const { mutate: sendResetLink, isPending, isSuccess, error } = useForgotPassword();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendResetLink(email);
  };

  if (isSuccess) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>メールを送信しました</CardTitle>
          <CardDescription>
            パスワード再設定のリンクを <strong>{email}</strong> に送信しました。メールをご確認ください。
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-sm font-medium">
              メールアドレス
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
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
