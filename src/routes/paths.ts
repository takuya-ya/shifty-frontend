/**
 * アプリケーション内の全ルートパスを定数で管理する。
 * 変更時はここを更新するだけで全体に反映される。
 */
export const PATHS = {
  // ── 認証不要（公開） ──────────────────────────
  LOGIN: '/login',
  RESET_PASSWORD: '/reset-password',
  ADMIN_REGISTER: '/admin/register',

  // ── 認証必須（保護） ──────────────────────────
  ADMIN_SHIFTS: '/admin/shifts',
  ADMIN_STAFFS: '/admin/staffs',
  SETTINGS: '/settings',

  // ── 汎用 ──────────────────────────────────────
  NOT_FOUND: '*',
} as const
