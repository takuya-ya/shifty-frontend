import { Outlet, useMatches, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../features/auth/hooks/useAuth'
import { useLogout } from '../../../features/auth/hooks/useLogout'
import { Button } from '../../../components/ui/button'
import { PATHS } from '../../../routes/paths'
import { Header } from './Header'
import { MainContent } from './MainContent'
import { Sidebar } from './Sidebar'

interface NavigationItem {
  to: string
  label: string
}

interface AppLayoutProps {
  appName: string
  navigation: NavigationItem[]
}

interface LayoutHandle {
  title: string
  description: string
}

function isLayoutHandle(value: unknown): value is LayoutHandle {
  if (!value || typeof value !== 'object') {
    return false
  }

  const handle = value as LayoutHandle

  return typeof handle.title === 'string' && typeof handle.description === 'string'
}

export function AppLayout({ appName, navigation }: AppLayoutProps) {
  const matches = useMatches()
  const activeHandle = [...matches].reverse().map((match) => match.handle).find(isLayoutHandle)
  const navigate = useNavigate()
  const { user } = useAuth()
  const { mutate: logout } = useLogout()

  const title = activeHandle?.title ?? 'Shifty'
  const description = activeHandle?.description ?? 'シフト管理を効率化する管理画面です。'

  const logoutButton = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      {user && <span style={{ fontSize: '0.875rem', color: '#4b5563' }}>{user.name}でログイン中</span>}
      <Button variant="outline" size="sm" onClick={() => logout(undefined, { onSuccess: () => navigate(PATHS.LOGIN) })}>
        ログアウト
      </Button>
    </div>
  )

  return (
    <main style={{ padding: '24px', maxWidth: '1080px', margin: '0 auto' }}>
      <Header appName={appName} title={title} description={description} primaryAction={logoutButton} />

      {/*
        ProtectedRoute（認証必須ルートのラップ）は、13.7工程「認証状態管理・PrivateRoute実装」完了後に対応予定。
        現状はまだ全ルートがAppLayout配下で直接Outletされている。
      */}
      <div style={{ display: 'grid', gridTemplateColumns: '240px minmax(0, 1fr)', gap: '16px', alignItems: 'start' }}>
        <Sidebar items={navigation} />
        <MainContent>
          <Outlet />
        </MainContent>
      </div>
    </main>
  )
}
