import React, { useEffect, useState } from 'react'
import './App.css'
import { LoginForm } from './features/auth/components/LoginForm'
import { getCookie } from './shared/utils/cookie'

function App() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/user', {
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: 'include',
      })
      if (res.ok) {
        const data = await res.json()
        setUser(data)
      } else {
        setUser(null)
      }
    } catch (err) {
      console.error('Auth check failed', err)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  const handleLogout = async () => {
    const xsrfToken = getCookie('XSRF-TOKEN')
    try {
      await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          ...(xsrfToken ? { 'X-XSRF-TOKEN': xsrfToken } : {}),
        },
        credentials: 'include',
      })
      setUser(null)
    } catch (err) {
      console.error('Logout failed', err)
    }
  }

  if (loading) {
    return <div style={{ padding: 20 }}>読み込み中...</div>
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Shifty 認証テスト</h1>

      {user ? (
        <div>
          <p>ログイン中: {user.name} ({user.email})</p>
          <button
            onClick={handleLogout}
            style={{ padding: '8px 16px', cursor: 'pointer' }}
          >
            ログアウト
          </button>
        </div>
      ) : (
        <div>
          <p>ログインしていません。</p>
          <LoginForm onLoginSuccess={(u) => setUser(u)} />
        </div>
      )}
    </div>
  )
}

export default App
