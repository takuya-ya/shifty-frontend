import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AdminRegisterPage } from '../pages/AdminRegisterPage'
import { AdminShiftsPage } from '../pages/AdminShiftsPage'
import { AdminStaffsPage } from '../pages/AdminStaffsPage'
import { LoginPage } from '../pages/LoginPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { ResetPasswordPage } from '../pages/ResetPasswordPage'
import { SettingsPage } from '../pages/SettingsPage'
import { AppLayout } from '../shared/components/layout/AppLayout'
import { RouteGuard } from './RouteGuard'
import { PATHS } from './paths'

// ──────────────────────────────────────────────────────────────
// ルート定義
// ──────────────────────────────────────────────────────────────

const links = [
  { to: PATHS.LOGIN, label: 'ログイン' },
  { to: PATHS.RESET_PASSWORD, label: 'パスワード再設定' },
  { to: PATHS.ADMIN_REGISTER, label: '管理者登録' },
  { to: PATHS.ADMIN_SHIFTS, label: 'シフト管理' },
  { to: PATHS.ADMIN_STAFFS, label: 'スタッフ管理' },
  { to: PATHS.SETTINGS, label: '設定' },
]

export const router = createBrowserRouter([
  {
    path: PATHS.ROOT,
    element: <AppLayout appName="Shifty" navigation={links} />,
    children: [
      // ルートアクセスは /login へリダイレクト
      {
        index: true,
        element: <Navigate to={PATHS.LOGIN} replace />,
      },
      // requireAuth=false: 認証済みユーザーを /admin/shifts にリダイレクト
      // ログイン・管理者登録は未認証ユーザー専用
      {
        element: <RouteGuard requireAuth={false} />,
        children: [
          {
            path: PATHS.LOGIN,
            element: <LoginPage />,
            handle: {
              title: 'ログイン',
              description: '認証前ユーザー向けのログイン画面です。',
            },
          },
          {
            path: PATHS.ADMIN_REGISTER,
            element: <AdminRegisterPage />,
            handle: {
              title: '管理者登録',
              description: '認証前ユーザー向けの管理者登録画面です。',
            },
          },
        ],
      },
      // パスワード再設定はトークン付きアクセスのため認証状態によらずアクセス可
      {
        path: PATHS.RESET_PASSWORD,
        element: <ResetPasswordPage />,
        handle: {
          title: 'パスワード再設定',
          description: 'ログイン前に、再設定リンク送信用のメールアドレスを入力する画面です。',
        },
      },
      {
        path: PATHS.PASSWORD_RESET_WITH_TOKEN,
        element: <ResetPasswordPage />,
        handle: {
          title: 'パスワード再設定',
          description: 'ログインできない人向けの復旧用パスワード再設定画面です。',
        },
      },
      // requireAuth=true: 未認証ユーザーを /login にリダイレクト
      {
        element: <RouteGuard requireAuth={true} />,
        children: [
          {
            path: PATHS.ADMIN_SHIFTS,
            element: <AdminShiftsPage />,
            handle: {
              title: '管理者シフト管理',
              description: '認証後ユーザー向けのメイン画面です。',
            },
          },
          {
            path: PATHS.ADMIN_STAFFS,
            element: <AdminStaffsPage />,
            handle: {
              title: 'スタッフ管理',
              description: '認証後ユーザー向けのスタッフ管理画面です。',
            },
          },
          {
            path: PATHS.SETTINGS,
            element: <SettingsPage />,
            handle: {
              title: '設定',
              description: '認証後ユーザー向けの設定画面です。',
            },
          },
        ],
      },
    ],
  },
  {
    path: PATHS.NOT_FOUND,
    element: <NotFoundPage />,
  },
])
