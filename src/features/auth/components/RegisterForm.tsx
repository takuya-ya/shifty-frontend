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

      if (response.ok) {
        // 登録成功時は通常そのままログイン状態になる
        // 本来ならユーザー情報を取得するAPIを叩くのが確実
        const userRes = await apiClient('/api/user');
        if (userRes.ok) {
            const userData = await userRes.json();
            onRegisterSuccess(userData);
        }
      } else {
        const data = await response.json();
        setError(data.message || '登録に失敗しました。');
      }
    } catch (err) {
      setError('通信エラーが発生しました。');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', maxWidth: '400px' }}>
    <div className="max-w-sm border border-gray-300 p-5 rounded-lg">
      <h2>新規登録</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2.5">
          <label className="block mb-1">名前:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
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
        <div className="mb-2.5">
          <label className="block mb-1">パスワード(確認):</label>
          <input
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2.5 rounded-md text-white border-none mb-2.5 ${
            loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 cursor-pointer'
          }`}
        >
          {loading ? '送信中...' : '登録'}
        </button>
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="w-full py-2.5 bg-transparent text-blue-500 border-none cursor-pointer underline"
          ログインはこちら
        </button>
      </form>
    </div>
  );
};
