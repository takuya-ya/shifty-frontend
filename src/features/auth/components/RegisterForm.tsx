import { useState, type FormEvent } from 'react';
import { useRegister } from '../hooks/useRegister';
import { EmailVerificationPending } from './EmailVerificationPending';
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

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export const RegisterForm = ({ onSwitchToLogin }: RegisterFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const { mutate: register, isPending, error, isSuccess } = useRegister();

  // 登録成功後に認証待ち画面を表示
  if (isSuccess) {
    return <EmailVerificationPending email={email} />;
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    register({ name, email, password, password_confirmation: passwordConfirmation });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>新規登録</CardTitle>
        <CardDescription>アカウント情報を入力して登録します。</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="register-name" className="block text-sm font-medium">名前</label>
            <Input
              id="register-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isPending}
              required
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="register-email" className="block text-sm font-medium">メールアドレス</label>
            <Input
              id="register-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isPending}
              required
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="register-password" className="block text-sm font-medium">パスワード</label>
            <Input
              id="register-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isPending}
              required
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="register-password-confirmation" className="block text-sm font-medium">パスワード(確認)</label>
            <Input
              id="register-password-confirmation"
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              disabled={isPending}
              required
            />
          </div>

          {error && <p className="text-sm text-destructive">{error.message}</p>}

          <Button
            type="submit"
            disabled={isPending}
            className="w-full"
          >
            {isPending ? '送信中...' : '登録する'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="justify-center">
        <Button
          type="button"
          variant="link"
          onClick={onSwitchToLogin}
          className="px-0"
        >
          ログインはこちら
        </Button>
      </CardFooter>
    </Card>
  );
};
