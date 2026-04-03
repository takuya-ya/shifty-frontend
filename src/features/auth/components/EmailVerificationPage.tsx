import { useEffect } from 'react';
import { CheckCircle2, Loader2, XCircle } from 'lucide-react';
import { useVerifyEmail } from '../hooks/useVerifyEmail';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export const EmailVerificationPage = ({
  verifyUrl,
  onVerified,
}: {
  verifyUrl: string;
  onVerified: () => void;
}) => {
  const { mutate: verify, status, error } = useVerifyEmail();

  useEffect(() => {
    verify(verifyUrl);
  }, []); // 認証は1回だけ実行

  useEffect(() => {
    if (status !== 'success') return;
    window.history.replaceState({}, '', '/');
    const timer = setTimeout(() => onVerified(), 2000);
    return () => clearTimeout(timer);
  }, [status]);

  const isLoading = status === 'idle' || status === 'pending';

  return (
    <Card className="w-full max-w-md text-center">
      <CardHeader>
        <CardTitle>メール認証</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="space-y-3">
        {isLoading && (
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
            <p className="text-sm text-destructive">{error?.message}</p>
            <CardDescription>リンクの有効期限が切れているか、無効なリンクです。</CardDescription>
          </>
        )}
      </CardContent>
    </Card>
  );
};
