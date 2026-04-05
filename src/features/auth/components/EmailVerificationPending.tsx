import { CheckCircle2, Mail } from 'lucide-react';
import { useResendVerification } from '../hooks/useResendVerification';
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

export const EmailVerificationPending = ({ email }: { email: string }) => {
  const { mutate: resend, isPending, isSuccess, isError, data } = useResendVerification();

  return (
    <Card className="w-full max-w-md">
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

        {isSuccess && (
          <p className="inline-flex items-center gap-1.5 text-sm text-primary">
            <CheckCircle2 className="size-4" />
            {data === 'already-verified'
              ? 'すでにメール認証が完了しています。'
              : '確認メールを再送しました。'}
          </p>
        )}
        {isError && (
          <p className="text-sm text-destructive">再送に失敗しました。しばらくしてから再試行してください。</p>
        )}
      </CardContent>
      <CardFooter>
        <Button
          type="button"
          onClick={() => resend()}
          disabled={isPending}
          variant="outline"
          className="w-full"
        >
          {isPending ? '送信中...' : 'メールを再送する'}
        </Button>
      </CardFooter>
    </Card>
  );
};
