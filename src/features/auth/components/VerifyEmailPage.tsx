import React, { useEffect, useState } from 'react';
import { verifyEmail } from '../api/auth';

interface VerifyEmailPageProps {
  verifyUrl: string;
  onVerified: () => void;
}

export const VerifyEmailPage: React.FC<VerifyEmailPageProps> = ({
  verifyUrl,
  onVerified,
}) => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    verifyEmail(verifyUrl)
      .then(() => {
        // URLからクエリパラメータを除去
        window.history.replaceState({}, '', '/');
        setStatus('success');
        // 2秒後にダッシュボードへ
        setTimeout(() => onVerified(), 2000);
      })
      .catch((err: Error) => {
        setErrorMessage(err.message);
        setStatus('error');
      });
  }, []);

  return (
    <div className="max-w-[400px] w-full p-8 border border-gray-300 rounded-lg bg-white text-center">
      {status === 'loading' && (
        <>
          <div className="flex justify-center mb-4">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin" />
          </div>
          <p className="text-gray-600">メールアドレスを認証しています...</p>
        </>
      )}

      {status === 'success' && (
        <>
          <div className="flex justify-center mb-4">
            <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-2">認証が完了しました！</h2>
          <p className="text-sm text-gray-600">ダッシュボードへ移動します...</p>
        </>
      )}

      {status === 'error' && (
        <>
          <div className="flex justify-center mb-4">
            <svg className="w-16 h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-2">認証に失敗しました</h2>
          <p className="text-sm text-red-500 mb-4">{errorMessage}</p>
          <p className="text-sm text-gray-600">リンクの有効期限が切れているか、無効なリンクです。</p>
        </>
      )}
    </div>
  );
};
