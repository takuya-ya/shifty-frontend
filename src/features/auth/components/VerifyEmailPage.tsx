import React, { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, XCircle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
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
    const verify = async () => {
      try {
        await verifyEmail(verifyUrl);
        window.history.replaceState({}, '', '/');
        setStatus('success');
        setTimeout(() => onVerified(), 2000);
      } catch (err: any) {
        setErrorMessage(err.message);
        setStatus('error');
      }
    };
    verify();
  }, []); // 認証は1回だけ実行

  return (
    <Card className="w-full max-w-100 text-center">
      <CardHeader>
        <CardTitle>メール認証</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="space-y-3">
      {status === 'loading' && (
        <>
          <div className="flex justify-center">
            <Loader2 className="size-10 animate-spin text-primary" />
          </div>
          <CardDescription>メールアドレスを認証しています...</CardDescription>
        </>
      )}

      {status === 'success' && (
        <>
          <div className="flex justify-center">
            <CheckCircle2 className="size-14 text-primary" />
          </div>
          <p className="text-lg font-semibold">認証が完了しました</p>
          <CardDescription>ダッシュボードへ移動します...</CardDescription>
        </>
      )}

      {status === 'error' && (
        <>
          <div className="flex justify-center">
            <XCircle className="size-14 text-destructive" />
          </div>
          <p className="text-lg font-semibold">認証に失敗しました</p>
          <p className="text-sm text-destructive">{errorMessage}</p>
          <CardDescription>リンクの有効期限が切れているか、無効なリンクです。</CardDescription>
        </>
      )}
      </CardContent>
    </Card>
  );
};
