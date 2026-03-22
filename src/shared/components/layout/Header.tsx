import type { ReactNode } from 'react'

interface HeaderProps {
  appName: string
  title: string
  description: string
  primaryAction?: ReactNode
}

export function Header({ appName, title, description, primaryAction }: HeaderProps) {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: '16px',
        marginBottom: '24px',
      }}
    >
      <div>
        <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.04em', color: '#4b5563' }}>
          {appName}
        </p>
        <h1 style={{ margin: '4px 0 0', fontSize: '1.875rem', fontWeight: 800, color: '#111827', letterSpacing: '-0.025em' }}>{title}</h1>
        <p style={{ marginTop: '8px', fontSize: '1rem', color: '#4b5563', lineHeight: 1.5 }}>{description}</p>
      </div>
      <div>{primaryAction}</div>
    </header>
  )
}
