import { useEffect, useState } from 'react'
import './App.css'
import { LoginForm } from './features/auth/components/LoginForm'
import { RegisterForm } from './features/auth/components/RegisterForm'
import { VerifyEmailPage } from './features/auth/components/VerifyEmailPage'
import type { User } from './features/auth/types'
import { apiClient } from './shared/api/client'

interface VerifyParams {
  verifyUrl: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<'login' | 'register' | 'verify'>('login')
  const [verifyParams, setVerifyParams] = useState<VerifyParams | null>(null)

  const fetchCurrentUser = async () => {
    try {
      const res = await apiClient('/api/user')
      if (res.ok) {
        const data = await res.json()
        setUser(data)
      } else {
        setUser(null)
      }
    } catch (err) {
      console.error('Failed to fetch current user', err)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // メール認証リンクのクエリパラメータを検知
    const params = new URLSearchParams(window.location.search)
    const verifyPath = params.get('verify_path')

    if (verifyPath) {
      setVerifyParams({ verifyUrl: verifyPath })
      setView('verify')
    }

    fetchCurrentUser()
  }, [])

  const handleLogout = async () => {
    try {
      await apiClient('/api/logout', {
        method: 'POST',
      })
      setUser(null)
    } catch (err) {
      console.error('Logout failed', err)
    }
  }

  if (loading) {
    return <div className="p-5">読み込み中...</div>
  }

  // メール認証ページ
  if (view === 'verify' && verifyParams) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <VerifyEmailPage
          {...verifyParams}
          onVerified={() => {
            setView('login')
            setVerifyParams(null)
            fetchCurrentUser()
          }}
        />
      </div>
    )
  }

  return (
    <div className="p-5">
      <h1>Shifty 認証テスト</h1>

      {user ? (
        <div>
          <p>ログイン中: {user.name} ({user.email})</p>
          <button
            onClick={handleLogout}
            className="px-4 py-2 cursor-pointer"
          >
            ログアウト
          </button>
        </div>
      ) : (
        <div>
          <p>ログインしていません。</p>
          {view === 'login' ? (
            <div>
              <LoginForm onLoginSuccess={(u) => setUser(u)} />
              <button
                onClick={() => setView('register')}
                className="mt-2.5 bg-transparent text-blue-500 border-none cursor-pointer underline"
              >
                新規登録はこちら
              </button>
            </div>
          ) : (
            <RegisterForm
              onSwitchToLogin={() => setView('login')}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default App
