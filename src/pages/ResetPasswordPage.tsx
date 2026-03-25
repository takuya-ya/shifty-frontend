import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ForgotPasswordForm } from '../features/auth/components/ForgotPasswordForm';
import { ResetPasswordForm } from '../features/auth/components/ResetPasswordForm';
import { PATHS } from '../routes/paths';

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const { token: tokenFromPath } = useParams<{ token?: string }>();
  const [searchParams] = useSearchParams();
  const token = tokenFromPath;
  const email = searchParams.get('email') ?? '';

  if (token) {
    return (
      <ResetPasswordForm
        token={token}
        email={email}
        onSuccess={() => navigate(PATHS.LOGIN)}
      />
    );
  }

  return <ForgotPasswordForm onSwitchToLogin={() => navigate(PATHS.LOGIN)} />;
}
