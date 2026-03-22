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
      aria-label="主要機能ナビゲーション"
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
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: '8px' }}>
        {items.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              style={{
                display: 'block',
                textDecoration: 'none',
                color: '#111827',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                padding: '8px 10px',
                fontSize: '0.95rem',
              }}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  )
}
