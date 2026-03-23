import React, { useState } from 'react';
import { CheckCircle2, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
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
    <Card className="w-full max-w-100">
      <CardHeader className="text-center">
        <div className="mx-auto mb-2 flex size-14 items-center justify-center rounded-full bg-muted">
          <Mail className="size-7 text-primary" />
        </div>
        <CardTitle>メール認証をお願いします</CardTitle>
        <CardDescription>
          <span className="font-medium text-foreground">{email}</span> に確認メールを送信しました。
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="space-y-4">
        <div className="rounded-lg bg-muted/60 p-4 text-sm text-muted-foreground">
          <ol className="list-decimal space-y-1 pl-5">
            <li>受信トレイを確認してください。</li>
            <li>メール内の「メールアドレスを確認する」リンクをクリックしてください。</li>
            <li>認証が完了するとログインできます。</li>
          </ol>
        </div>

        {status === 'sent' && (
          <p className="inline-flex items-center gap-1.5 text-sm text-primary">
            <CheckCircle2 className="size-4" />
            確認メールを再送しました。
          </p>
        )}
        {status === 'error' && (
          <p className="text-sm text-destructive">再送に失敗しました。しばらくしてから再試行してください。</p>
        )}
      </CardContent>
      <CardFooter>
        <Button
          type="button"
          onClick={handleResend}
          disabled={status === 'sending'}
          variant="outline"
          className="w-full"
        >
          {status === 'sending' ? '送信中...' : 'メールを再送する'}
        </Button>
      </CardFooter>
    </Card>
  );
};
