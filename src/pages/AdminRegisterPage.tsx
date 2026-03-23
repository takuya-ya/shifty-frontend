import { useNavigate } from 'react-router-dom';
import { RegisterForm } from '../features/auth/components/RegisterForm';
import { PATHS } from '../routes/paths';

export function AdminRegisterPage() {
  const navigate = useNavigate();
  return <RegisterForm onSwitchToLogin={() => navigate(PATHS.LOGIN)} />;
}
