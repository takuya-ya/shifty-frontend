import { useNavigate, useLocation } from 'react-router-dom';
import { LoginForm } from '../features/auth/components/LoginForm';
import { PATHS } from '../routes/paths';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string; search: string } } | null)?.from;
  const redirectTo = from ? `${from.pathname}${from.search}` : PATHS.ADMIN_SHIFTS;

  return (
    <div className="w-full max-w-lg">
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Shiftyにログイン</h1>
      <LoginForm onLoginSuccess={() => navigate(redirectTo, { replace: true })} />
    </div>
  );
}
