import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { RouteGuard } from '../RouteGuard'
import * as useAuthModule from '../../features/auth/hooks/useAuth'

vi.mock('../../features/auth/hooks/useAuth')

const mockUseAuth = vi.mocked(useAuthModule.useAuth)

function createRouter(access: 'protected' | 'protected-verified' | 'guest', initialPath = '/') {
  return createMemoryRouter(
    [
      {
        path: '/',
        element: <RouteGuard access={access} />,
        children: [{ index: true, element: <div>保護コンテンツ</div> }],
      },
      { path: '/login', element: <div>ログインページ</div> },
      { path: '/admin/shifts', element: <div>シフトページ</div> },
      { path: '/verify-pending', element: <div>メール認証待ちページ</div> },
    ],
    { initialEntries: [initialPath] },
  )
}

describe('RouteGuard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    cleanup()
  })

  describe('access="protected"', () => {
    it('isLoading 中はローディングUIを表示する', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        isEmailVerified: false,
        isLoading: true,
        isError: false,
        user: null,
      })

      render(<RouterProvider router={createRouter('protected')} />)

      expect(screen.getByText('認証情報を確認中...')).toBeInTheDocument()
      expect(screen.queryByText('保護コンテンツ')).not.toBeInTheDocument()
    })

    it('isError 時はエラーUIを表示し Outlet を描画しない', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        isEmailVerified: false,
        isLoading: false,
        isError: true,
        user: null,
      })

      render(<RouterProvider router={createRouter('protected')} />)

      expect(screen.getByText('ネットワークエラーが発生しました。接続を確認してください。')).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'ログインページへ' })).toBeInTheDocument()
      expect(screen.queryByText('保護コンテンツ')).not.toBeInTheDocument()
    })

    it('未認証（isError なし）の場合は /login にリダイレクトする', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        isEmailVerified: false,
        isLoading: false,
        isError: false,
        user: null,
      })

      render(<RouterProvider router={createRouter('protected')} />)

      expect(screen.getByText('ログインページ')).toBeInTheDocument()
      expect(screen.queryByText('保護コンテンツ')).not.toBeInTheDocument()
    })

    it('認証済みの場合は Outlet を表示する', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        isEmailVerified: true,
        isLoading: false,
        isError: false,
        user: { id: 1, name: 'テストユーザー', email: 'test@example.com' },
      })

      render(<RouterProvider router={createRouter('protected')} />)

      expect(screen.getByText('保護コンテンツ')).toBeInTheDocument()
    })
  })

  describe('access="guest"', () => {
    it('認証済みの場合は /admin/shifts にリダイレクトする', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        isEmailVerified: true,
        isLoading: false,
        isError: false,
        user: { id: 1, name: 'テストユーザー', email: 'test@example.com' },
      })

      render(<RouterProvider router={createRouter('guest')} />)

      expect(screen.getByText('シフトページ')).toBeInTheDocument()
    })

    it('未認証の場合は Outlet を表示する', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        isEmailVerified: false,
        isLoading: false,
        isError: false,
        user: null,
      })

      render(<RouterProvider router={createRouter('guest')} />)

      expect(screen.getByText('保護コンテンツ')).toBeInTheDocument()
    })
  })
})
