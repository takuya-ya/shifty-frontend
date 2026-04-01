import { apiClient } from "../../../shared/api/client";
import type { User } from "../types";

export interface LoginPayload {
  email: string;
  password: string;
}

/**
 * CSRFクッキーを取得する
 */
export const getCsrfCookie = async (): Promise<void> => {
  await apiClient("/sanctum/csrf-cookie", {
    method: "GET",
  });
};

/**
 * ログインする（CSRF取得 → POST /api/v1/login）
 */
export const login = async (payload: LoginPayload): Promise<void> => {
  await getCsrfCookie();
  const response = await apiClient("/api/v1/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(
      (data as { message?: string }).message ?? "ログインに失敗しました",
    );
  }
};

/**
 * 現在の認証ユーザーを取得する
 */
export const getCurrentUser = async (): Promise<User | null> => {
  const response = await apiClient("/api/v1/user", {
    method: "GET",
  });

  if (response.status === 401) {
    return null;
  }

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(
      (data as { message?: string }).message ??
        "ユーザー情報の取得に失敗しました",
    );
  }

  return response.json() as Promise<User>;
};

/**
 * メールアドレスを認証する
 * @param verifyUrl - Laravel から送られた認証URL（絶対URLまたはパス）
 */
export const verifyEmail = async (verifyUrl: string): Promise<void> => {
  const response = await apiClient(verifyUrl, {
    method: "GET",
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(
      (data as { message?: string }).message ?? "メール認証に失敗しました",
    );
  }
};

/**
 * 確認メールを再送する
 * @returns 'sent' | 'already-verified'
 */
export const resendVerificationEmail = async (): Promise<
  "sent" | "already-verified"
> => {
  const response = await apiClient("/api/v1/email/verification-notification", {
    method: "POST",
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(
      (data as { message?: string }).message ??
        "確認メールの再送に失敗しました",
    );
  }

  const data = await response.json().catch(() => ({}));
  if ((data as { status?: string }).status === "already-verified") {
    return "already-verified";
  }
  return "sent";
};

/**
 * パスワード再設定リンクをメールで送信する
 */
export const sendPasswordResetLink = async (email: string): Promise<void> => {
  await getCsrfCookie();
  const response = await apiClient("/api/v1/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(
      (data as { message?: string }).message ??
        "パスワード再設定メールの送信に失敗しました",
    );
  }
};

interface ResetPasswordPayload {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
}

/**
 * パスワードをリセットする
 */
export const resetPassword = async (
  payload: ResetPasswordPayload,
): Promise<void> => {
  await getCsrfCookie();
  const response = await apiClient("/api/v1/reset-password", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(
      (data as { message?: string }).message ??
        "パスワードのリセットに失敗しました",
    );
  }
};
