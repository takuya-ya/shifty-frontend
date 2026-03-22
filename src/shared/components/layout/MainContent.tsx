import type { ReactNode } from 'react'

interface MainContentProps {
  children?: ReactNode
}

export function MainContent({ children }: MainContentProps) {
  return (
    <section
      style={{
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        backgroundColor: '#ffffff',
        padding: '20px',
        minHeight: '320px',
        textAlign: 'left',
      }}
    >
      {children}
    </section>
  )
}
