import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../features/auth/components/LoginForm';
import { PATHS } from '../routes/paths';

export function LoginPage() {
  const navigate = useNavigate();
  return <LoginForm onLoginSuccess={() => navigate(PATHS.ADMIN_SHIFTS)} />;
}
