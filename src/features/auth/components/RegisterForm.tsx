import React, { useState } from 'react';
import { apiClient } from '../../../shared/api/client';
import { getCsrfCookie } from '../api/auth';
import type { User } from '../types';

interface RegisterFormProps {
  onRegisterSuccess: (user: User) => void;
  onSwitchToLogin: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onRegisterSuccess, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. CSRF Cookieの取得
      await getCsrfCookie();

      // 2. 登録実行
      const response = await apiClient('/api/register', {
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

      // 3. ユーザー情報を取得
      const userRes = await apiClient('/api/user');

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

      onRegisterSuccess(userData);
    } catch (err) {
      // 通信エラー（fetch自体の失敗）のみここに到達させる
      setError('通信エラーが発生しました。');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[400px] w-full p-8 border border-gray-300 rounded-lg bg-white">
      <h2 className="text-xl font-bold mb-8 text-center">新規登録</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium">名前</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">メールアドレス</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">パスワード</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">パスワード(確認)</label>
          <input
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            className="w-full p-2.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md text-white border-none font-bold ${
              loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 cursor-pointer'
            }`}
          >
            {loading ? '送信中...' : '登録する'}
          </button>
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-sm text-blue-500 hover:underline bg-transparent border-none cursor-pointer"
          >
            ログインはこちら
          </button>
        </div>
      </form>
    </div>
  );
};
