import React, { useState } from 'react';
import { apiClient } from '../../../shared/api/client';
import { getCsrfCookie } from '../api/auth';
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

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [verificationPending, setVerificationPending] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');

  // 登録成功後に認証待ち画面を表示
  if (verificationPending) {
    return <EmailVerificationPending email={registeredEmail} />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. CSRF Cookieの取得
      await getCsrfCookie();

      // 2. 登録実行
      const response = await apiClient('/api/v1/register', {
        method: 'POST',
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
        }),
      });

      if (!response.ok) {
        // レスポンスのパース失敗も考慮
        const data = await response.json().catch(() => ({}));
        setError(data.message || '登録に失敗しました。');
        return; // 早期リターンで後続処理を止める
      }

      // 登録成功 → メール認証待ち画面へ
      setRegisteredEmail(email);
      setVerificationPending(true);
    } catch (err) {
      // 通信エラー（fetch自体の失敗）のみここに到達させる
      setError('通信エラーが発生しました。');
      console.error(err);
    } finally {
      setLoading(false);
    }
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
              required
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? '送信中...' : '登録する'}
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
