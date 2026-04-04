import { useState, type FormEvent } from 'react';
import { useLogin } from '../hooks/useLogin';
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mutate: login, isPending, error } = useLogin();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    login({ email, password }, { onSuccess: onLoginSuccess });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>ログイン</CardTitle>
        <CardDescription>登録済みメールアドレスでログインしてください。</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="login-email" className="block text-sm font-medium">メールアドレス</label>
            <Input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="login-password" className="block text-sm font-medium">パスワード</label>
            <Input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-sm text-destructive">{error.message}</p>}
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
