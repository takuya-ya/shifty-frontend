import { useState, type FormEvent } from 'react';
import { apiClient } from '../../../shared/api/client';
import { getCsrfCookie } from '../api/auth';
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
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. CSRF Cookieの取得
      await getCsrfCookie();

      // 2. ログイン実行（204 No Content が返るためボディなし）
      const response = await apiClient('/api/v1/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        // レスポンスのパース失敗も考慮
        const data = await response.json().catch(() => ({}));
        setError(data.message || 'ログインに失敗しました。');
        return; // 早期リターンで後続処理を止める
      }

      onLoginSuccess();
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
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? '送信中...' : 'ログイン'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
