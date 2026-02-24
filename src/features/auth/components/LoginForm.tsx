import React, { useState } from 'react';
import { apiClient } from '../../../shared/api/client';

interface LoginFormProps {
  onLoginSuccess: (user: any) => void;
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
      await fetch('/sanctum/csrf-cookie', {
        method: 'GET',
        credentials: 'include',
      });

      // 2. ログイン実行
      const response = await apiClient('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        onLoginSuccess(data.user);
      } else {
        setError(data.message || 'ログインに失敗しました。');
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
      <h2>ログイン</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block' }}>メールアドレス:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block' }}>パスワード:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: loading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? '送信中...' : 'ログイン'}
        </button>
      </form>
    </div>
  );
};
