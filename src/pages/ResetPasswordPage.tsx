import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ForgotPasswordForm } from '../features/auth/components/ForgotPasswordForm';
import { ResetPasswordForm } from '../features/auth/components/ResetPasswordForm';
import { PATHS } from '../routes/paths';

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const { token: tokenFromPath } = useParams<{ token?: string }>();
  const [searchParams] = useSearchParams();
  const token = tokenFromPath;
  const emailFromQuery = searchParams.get('email');

  if (token && emailFromQuery) {
    return (
      <ResetPasswordForm
        token={token}
        email={emailFromQuery}
        onSuccess={() => navigate(PATHS.LOGIN)}
      />
    );
  }

  return <ForgotPasswordForm onSwitchToLogin={() => navigate(PATHS.LOGIN)} />;
}
