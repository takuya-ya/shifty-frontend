import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../features/auth/hooks/useAuth'
import { PATHS } from './paths'

// ──────────────────────────────────────────────────────────────
// ProtectedRoute: 認証済みユーザーのみアクセス可
// - useAuth で認証状態を判定する（固定値 prop 不要）
// - isLoading 中は誤リダイレクトを防ぐためローディングUIを返す
// - 未認証の場合は /login にリダイレクトする
// ──────────────────────────────────────────────────────────────
export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16 text-sm text-gray-500">
        認証情報を確認中...
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to={PATHS.LOGIN} replace />
  }

  return <Outlet />
}
