import React, { useState } from 'react';
import { apiClient } from '../../../shared/api/client';
import { getCsrfCookie } from '../api/auth';
import type { User } from '../types';
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
  onLoginSuccess: (user: User) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
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

      // 3. ユーザー情報を取得
      const userRes = await apiClient('/api/v1/user');

      if (!userRes.ok) {
        setError('ユーザー情報の取得に失敗しました。');
        return;
      }

      // パース失敗をキャッチ → 外側の catch に委譲しない
      const userData = await userRes.json().catch(() => null);
      if (!userData) {
        setError('ユーザー情報の解析に失敗しました。');
        return;
      }

      onLoginSuccess(userData);
    } catch (err) {
      // 通信エラー（fetch自体の失敗）のみここに到達させる
      setError('通信エラーが発生しました。');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-100">
      <CardHeader>
        <CardTitle>ログイン</CardTitle>
        <CardDescription>登録済みメールアドレスでログインしてください。</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium">メールアドレス</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium">パスワード</label>
            <Input
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
