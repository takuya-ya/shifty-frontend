import { Link } from 'react-router-dom'
import { PATHS } from '../routes/paths'

export function NotFoundPage() {
  return (
    <main style={{ padding: '24px', maxWidth: '720px', margin: '0 auto', textAlign: 'left' }}>
      <h1 style={{ marginBottom: '8px' }}>404</h1>
      <p style={{ marginTop: 0, marginBottom: '16px' }}>未定義のURLです。ページが見つかりません。</p>
      <Link to={PATHS.LOGIN}>ログイン画面へ戻る</Link>
    </main>
  )
}
