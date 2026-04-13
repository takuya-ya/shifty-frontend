import { useNavigate, useLocation } from 'react-router-dom';
import { LoginForm } from '../features/auth/components/LoginForm';
import { PATHS } from '../routes/paths';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string; search: string } } | null)?.from;
  const redirectTo = from ? `${from.pathname}${from.search}` : PATHS.ADMIN_SHIFTS;

  return <LoginForm onLoginSuccess={() => navigate(redirectTo, { replace: true })} />;
}
