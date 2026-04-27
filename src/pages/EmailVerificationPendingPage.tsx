import { Navigate } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth';
import { EmailVerificationPending } from '../features/auth/components/EmailVerificationPending';
import { PATHS } from '../routes/paths';

export function EmailVerificationPendingPage() {
  const { user, isEmailVerified } = useAuth();

  if (isEmailVerified) {
    return <Navigate to={PATHS.ADMIN_SHIFTS} replace />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <EmailVerificationPending email={user?.email ?? ''} />
    </div>
  );
}
