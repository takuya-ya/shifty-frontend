import { useAuth } from '../features/auth/hooks/useAuth';
import { EmailVerificationPending } from '../features/auth/components/EmailVerificationPending';

export function EmailVerificationPendingPage() {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <EmailVerificationPending email={user?.email ?? ''} />
    </div>
  );
}
