import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AdminRegisterPage } from '../pages/AdminRegisterPage'
import { AdminShiftsPage } from '../pages/AdminShiftsPage'
import { AdminStaffsPage } from '../pages/AdminStaffsPage'
import { VerifyEmailPage } from '../pages/VerifyEmailPage'
import { EmailVerificationPendingPage } from '../pages/EmailVerificationPendingPage'
import { LoginPage } from '../pages/LoginPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { ResetPasswordPage } from '../pages/ResetPasswordPage'
import { SettingsPage } from '../pages/SettingsPage'
import { AdminLayout } from '../layouts/AdminLayout'
import { AuthLayout } from '../layouts/AuthLayout'
import { RouteGuard } from './RouteGuard'
import { PATHS } from './paths'

// ──────────────────────────────────────────────────────────────
// ルート定義
// ──────────────────────────────────────────────────────────────

export const router = createBrowserRouter([
  // ルートアクセスは /login へリダイレクト
  {
    path: PATHS.ROOT,
    element: <Navigate to={PATHS.LOGIN} replace />,
  },

  // 認証ページ（サイドバーなし・中央配置）
  {
    element: <AuthLayout />,
    children: [
      // access="guest": 認証済みユーザーを /admin/shifts にリダイレクト
      {
        element: <RouteGuard access="guest" />,
        children: [
          { path: PATHS.LOGIN, element: <LoginPage /> },
          { path: PATHS.ADMIN_REGISTER, element: <AdminRegisterPage /> },
        ],
      },
      // パスワード再設定は認証状態によらずアクセス可
      { path: PATHS.RESET_PASSWORD, element: <ResetPasswordPage /> },
      { path: PATHS.PASSWORD_RESET_WITH_TOKEN, element: <ResetPasswordPage /> },
      // access="protected": メール認証関連はメール未認証でもアクセス可
      {
        element: <RouteGuard access="protected" />,
        children: [
          { path: PATHS.VERIFY_EMAIL, element: <VerifyEmailPage /> },
          { path: PATHS.VERIFY_PENDING, element: <EmailVerificationPendingPage /> },
        ],
      },
    ],
  },

  // 管理者ページ（サイドバーあり）
  {
    element: <AdminLayout />,
    children: [
      // access="protected-verified"
      {
        element: <RouteGuard access="protected-verified" />,
        children: [
          { path: PATHS.ADMIN_SHIFTS, element: <AdminShiftsPage /> },
          { path: PATHS.ADMIN_STAFFS, element: <AdminStaffsPage /> },
          { path: PATHS.SETTINGS, element: <SettingsPage /> },
        ],
      },
    ],
  },

  { path: PATHS.NOT_FOUND, element: <NotFoundPage /> },
])
