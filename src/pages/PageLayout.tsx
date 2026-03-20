import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { PATHS } from '../routes/paths'

const links = [
  { to: PATHS.LOGIN, label: 'ログイン' },
  { to: PATHS.RESET_PASSWORD, label: 'パスワード再設定' },
  { to: PATHS.ADMIN_REGISTER, label: '管理者登録' },
  { to: PATHS.ADMIN_SHIFTS, label: 'シフト管理' },
  { to: PATHS.ADMIN_STAFFS, label: 'スタッフ管理' },
  { to: PATHS.SETTINGS, label: '設定' },
]

interface PageLayoutProps {
  title: string
  description: string
  children?: ReactNode
}

export function PageLayout({ title, description, children }: PageLayoutProps) {
  return (
    <main style={{ padding: '24px', maxWidth: '960px', margin: '0 auto' }}>
      <header style={{ marginBottom: '16px' }}>
        <h1 style={{ margin: 0, fontSize: '2rem' }}>{title}</h1>
        <p style={{ marginTop: '8px', color: '#4b5563' }}>{description}</p>
      </header>

      <nav aria-label="主要画面ナビゲーション" style={{ marginBottom: '24px' }}>
        <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', listStyle: 'none', margin: 0, padding: 0 }}>
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                style={({ isActive }) => ({
                  display: 'inline-block',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  textDecoration: 'none',
                  backgroundColor: isActive ? '#e5e7eb' : '#ffffff',
                  color: '#111827',
                })}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <section
        style={{
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '16px',
          textAlign: 'left',
          backgroundColor: '#ffffff',
        }}
      >
        {children}
      </section>
    </main>
  )
}
