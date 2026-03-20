import type { ReactNode } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AdminRegisterPage } from '../pages/AdminRegisterPage'
import { AdminShiftsPage } from '../pages/AdminShiftsPage'
import { AdminStaffsPage } from '../pages/AdminStaffsPage'
import { LoginPage } from '../pages/LoginPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { ResetPasswordPage } from '../pages/ResetPasswordPage'
import { SettingsPage } from '../pages/SettingsPage'
import { PATHS } from './paths'

// ──────────────────────────────────────────────────────────────
// ProtectedRoute: 認証済みユーザーのみアクセス可
// 未認証の場合は /login にリダイレクトする。
// 認証状態の判定は 12.2.3 以降で useAuth を使って差し替える。
// ──────────────────────────────────────────────────────────────
interface ProtectedRouteProps {
  children: ReactNode
  isAuthenticated: boolean
}

export function ProtectedRoute({ children, isAuthenticated }: ProtectedRouteProps) {
  if (!isAuthenticated) {
    return <Navigate to={PATHS.LOGIN} replace />
  }
  return <>{children}</>
}

// ──────────────────────────────────────────────────────────────
// ルート定義
// 12.2.4 でページコンポーネントを作成後、element を差し替える。
// ──────────────────────────────────────────────────────────────

/** 認証不要のルート */
const publicRoutes = [
  {
    path: PATHS.ROOT,
    element: <Navigate to={PATHS.LOGIN} replace />,
  },
  {
    path: PATHS.LOGIN,
    element: <LoginPage />,
  },
  {
    path: PATHS.RESET_PASSWORD,
    element: <ResetPasswordPage />,
  },
  {
    path: PATHS.ADMIN_REGISTER,
    element: <AdminRegisterPage />,
  },
]

/** 認証必須のルート（ProtectedRoute でラップ） */
const protectedRoutes = [
  {
    path: PATHS.ADMIN_SHIFTS,
    element: <AdminShiftsPage />,
  },
  {
    path: PATHS.ADMIN_STAFFS,
    element: <AdminStaffsPage />,
  },
  {
    path: PATHS.SETTINGS,
    element: <SettingsPage />,
  },
]

export const router = createBrowserRouter([
  ...publicRoutes,
  ...protectedRoutes,
  {
    path: PATHS.NOT_FOUND,
    element: <NotFoundPage />,
  },
])
