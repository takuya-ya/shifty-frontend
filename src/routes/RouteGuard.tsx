import { Navigate, Outlet, useLocation } from 'react-router-dom'
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
  const { isAuthenticated, isLoading, isError } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16 text-sm text-gray-500">
        認証情報を確認中...
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center py-16 text-sm text-red-500">
        認証情報の取得に失敗しました。ネットワーク接続を確認してください。
      </div>
    )
  }

  if (requireAuth && !isAuthenticated) {
    return <Navigate to={PATHS.LOGIN} state={{ from: location }} replace />
  }

  if (!requireAuth && isAuthenticated) {
    return <Navigate to={PATHS.ADMIN_SHIFTS} replace />
  }

  return <Outlet />
}
