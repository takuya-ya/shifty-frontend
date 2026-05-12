import { Outlet } from 'react-router-dom'
import { Calendar, Users, Settings } from 'lucide-react'
import { Sidebar } from './Sidebar'
import { PATHS } from '../../../routes/paths'

const adminNavItems = [
  { to: PATHS.ADMIN_SHIFTS, label: 'シフト管理', icon: Calendar },
  { to: PATHS.ADMIN_STAFFS, label: 'スタッフ管理', icon: Users },
  { to: PATHS.SETTINGS, label: '設定', icon: Settings },
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
