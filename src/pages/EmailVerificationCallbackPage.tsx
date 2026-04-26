import { useSearchParams, useNavigate, Navigate } from 'react-router-dom';
import { EmailVerificationPage } from '../features/auth/components/EmailVerificationPage';
import { PATHS } from '../routes/paths';

export function EmailVerificationCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const verifyPath = searchParams.get('verify_path');

  if (!verifyPath) {
    return <Navigate to={PATHS.LOGIN} replace />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <EmailVerificationPage
        verifyUrl={verifyPath}
        onVerified={() => navigate(PATHS.ADMIN_SHIFTS, { replace: true })}
      />
    </div>
  );
}
