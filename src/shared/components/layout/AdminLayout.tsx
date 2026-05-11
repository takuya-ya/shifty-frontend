import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { PATHS } from '../../../routes/paths'

// 共通.3 でSidebarをFigmaコンパクトアイコン式に差し替え予定
const adminNavItems = [
  { to: PATHS.ADMIN_SHIFTS, label: 'シフト管理' },
  { to: PATHS.ADMIN_STAFFS, label: 'スタッフ管理' },
  { to: PATHS.SETTINGS, label: '設定' },
]

export function AdminLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar items={adminNavItems} />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
