import type { ReactNode } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
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
    path: PATHS.LOGIN,
    element: <div>ログイン画面（仮）</div>,
  },
  {
    path: PATHS.RESET_PASSWORD,
    element: <div>パスワード再設定画面（仮）</div>,
  },
  {
    path: PATHS.ADMIN_REGISTER,
    element: <div>管理者登録画面（仮）</div>,
  },
]

/** 認証必須のルート（ProtectedRoute でラップ） */
const protectedRoutes = [
  {
    path: PATHS.ADMIN_SHIFTS,
    element: <div>シフト管理画面（仮）</div>,
  },
  {
    path: PATHS.ADMIN_STAFFS,
    element: <div>スタッフ管理画面（仮）</div>,
  },
  {
    path: PATHS.SETTINGS,
    element: <div>設定画面（仮）</div>,
  },
]

export const router = createBrowserRouter([
  ...publicRoutes,
  ...protectedRoutes,
  {
    path: PATHS.NOT_FOUND,
    element: <div>404 - ページが見つかりません（仮）</div>,
  },
])
