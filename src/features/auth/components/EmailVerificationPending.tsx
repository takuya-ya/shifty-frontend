import React, { useState } from 'react';
import { resendVerificationEmail } from '../api/auth';

interface EmailVerificationPendingProps {
  email: string;
}

export const EmailVerificationPending: React.FC<EmailVerificationPendingProps> = ({ email }) => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleResend = async () => {
    setStatus('sending');
    try {
      const result = await resendVerificationEmail();
      if (result === 'already-verified' || result === 'sent') {
        setStatus('sent');
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error('再送エラー:', err);
      setStatus('error');
    }
  };

  return (
    <div className="max-w-[400px] w-full p-8 border border-gray-300 rounded-lg bg-white">
      <div className="text-center mb-6">
        <div className="flex justify-center mb-4">
          <svg
            className="w-16 h-16 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
          </svg>
        </div>
        <h2 className="text-xl font-bold mb-2">メール認証をお願いします</h2>
        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-900">{email}</span> に確認メールを送信しました。
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-6 text-sm text-gray-700 space-y-1">
        <p>1. 受信トレイを確認してください。</p>
        <p>2. メール内の「メールアドレスを確認する」リンクをクリックしてください。</p>
        <p>3. 認証が完了するとログインできます。</p>
      </div>

      {status === 'sent' && (
        <p className="text-sm text-green-600 text-center mb-4">確認メールを再送しました。</p>
      )}
      {status === 'error' && (
        <p className="text-sm text-red-500 text-center mb-4">再送に失敗しました。しばらくしてから再試行してください。</p>
      )}

      <button
        type="button"
        onClick={handleResend}
        disabled={status === 'sending'}
        className="w-full py-2.5 px-4 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {status === 'sending' ? '送信中...' : 'メールを再送する'}
      </button>
    </div>
  );
};
