import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../features/auth/hooks/useAuth'
import { PATHS } from './paths'

type Props = {
  requireAuth: boolean
}

// ──────────────────────────────────────────────────────────────
// RouteGuard: 認証状態に応じてルートへのアクセスを制御する
// - requireAuth=true : 未認証ユーザーを /login にリダイレクト
// - requireAuth=false: 認証済みユーザーを /admin/shifts にリダイレクト
// - isLoading 中は誤リダイレクトを防ぐためローディングUIを返す
// ──────────────────────────────────────────────────────────────
export function RouteGuard({ requireAuth }: Props) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16 text-sm text-gray-500">
        認証情報を確認中...
      </div>
    )
  }

  if (requireAuth && !isAuthenticated) {
    return <Navigate to={PATHS.LOGIN} replace />
  }

  if (!requireAuth && isAuthenticated) {
    return <Navigate to={PATHS.ADMIN_SHIFTS} replace />
  }

  return <Outlet />
}
