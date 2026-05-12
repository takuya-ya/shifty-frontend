import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../features/auth/hooks/useAuth'
import { PATHS } from './paths'

type Props = {
  access: 'guest' | 'protected' | 'protected-verified'
}

// ──────────────────────────────────────────────────────────────
// RouteGuard: 認証状態に応じてルートへのアクセスを制御する
// - access="guest"               : 認証済みユーザーを /admin/shifts にリダイレクト
// - access="protected"           : 未認証ユーザーを /login にリダイレクト
// - access="protected-verified"  : 未認証 → /login、未メール認証 → /verify-pending にリダイレクト
// - isLoading 中は誤リダイレクトを防ぐためローディングUIを返す
// ──────────────────────────────────────────────────────────────
export function RouteGuard({ access }: Props) {
  const { isAuthenticated, isEmailVerified, isLoading, isError } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16 text-sm text-gray-500">
        認証情報を確認中...
      </div>
    )
  }

  if ((access === 'protected' || access === 'protected-verified') && !isAuthenticated && !isError) {
    return <Navigate to={PATHS.LOGIN} state={{ from: location }} replace />
  }

  if (access === 'protected-verified' && isAuthenticated && !isEmailVerified) {
    return <Navigate to={PATHS.VERIFY_PENDING} replace />
  }

  if (access === 'guest' && isAuthenticated) {
    const from = (location.state as { from?: { pathname: string; search: string } } | null)?.from
    const redirectTo = from ? `${from.pathname}${from.search}` : PATHS.ADMIN_SHIFTS
    return <Navigate to={redirectTo} replace />
  }

  return (
    <>
      <Outlet />
      {isError && (
        <div className="flex items-center justify-center py-4 text-sm text-red-500">
          認証情報の取得に失敗しました。ネットワーク接続を確認してください。
        </div>
      )}
    </>
  )
}
