import { NavLink } from 'react-router-dom'

interface SidebarItem {
  to: string
  label: string
}

interface SidebarProps {
  items: SidebarItem[]
}

export function Sidebar({ items }: SidebarProps) {
  return (
    <aside
      style={{
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        backgroundColor: '#ffffff',
        padding: '16px',
        alignSelf: 'start',
        position: 'sticky',
        top: '24px',
      }}
    >
      <nav aria-label="主要機能ナビゲーション">
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: '8px' }}>
          {items.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                style={({ isActive }) => ({
                  display: 'block',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  padding: '8px 10px',
                  fontSize: '0.95rem',
                  fontWeight: isActive ? 700 : 400,
                  color: isActive ? '#ffffff' : '#111827',
                  backgroundColor: isActive ? '#111827' : 'transparent',
                  border: isActive ? '1px solid #111827' : '1px solid #d1d5db',
                })}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
