import { Outlet, useMatches } from 'react-router-dom'
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

  const title = activeHandle?.title ?? 'Shifty'
  const description = activeHandle?.description ?? 'シフト管理を効率化する管理画面です。'

  return (
    <main style={{ padding: '24px', maxWidth: '1080px', margin: '0 auto' }}>
      <Header appName={appName} title={title} description={description} />

      <div style={{ display: 'grid', gridTemplateColumns: '240px minmax(0, 1fr)', gap: '16px', alignItems: 'start' }}>
        <Sidebar items={navigation} />
        <MainContent>
          <Outlet />
        </MainContent>
      </div>
    </main>
  )
}
