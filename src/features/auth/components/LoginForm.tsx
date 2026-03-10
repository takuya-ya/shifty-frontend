import React, { useState } from 'react';
import { apiClient } from '../../../shared/api/client';
import { getCsrfCookie } from '../api/auth';
import type { User } from '../types';

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
    <div className="max-w-[400px] p-5 border border-gray-300 rounded-lg">
      <h2 className="text-xl font-bold mb-4">ログイン</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2.5">
          <label className="block mb-1">メールアドレス:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-2.5">
          <label className="block mb-1">パスワード:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2.5 rounded-md text-white border-none mt-4 ${
            loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
          }`}
        >
          {loading ? '送信中...' : 'ログイン'}
        </button>
      </form>
    </div>
  );
};
