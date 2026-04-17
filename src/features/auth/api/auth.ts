import { get, post } from "../../../shared/api/client";
import { throwIfNotOk } from "../../../shared/api/error";
import type { User } from "../types";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface ResetPasswordPayload {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export const getCsrfCookie = async (): Promise<void> => {
  const response = await get("/sanctum/csrf-cookie");
  await throwIfNotOk(response, "CSRFトークンの取得に失敗しました");
};

export const login = async (payload: LoginPayload): Promise<void> => {
  await getCsrfCookie();
  const response = await post("/api/v1/login", payload);
  await throwIfNotOk(response, "ログインに失敗しました");
};

export const register = async (payload: RegisterPayload): Promise<void> => {
  await getCsrfCookie();
  const response = await post("/api/v1/register", payload);
  await throwIfNotOk(response, "登録に失敗しました");
};

export const logout = async (): Promise<void> => {
  const response = await post("/api/v1/logout");
  await throwIfNotOk(response, "ログアウトに失敗しました");
};

export const getCurrentUser = async (): Promise<User | null> => {
  const response = await get("/api/v1/user");
  if (response.status === 401) return null;
  await throwIfNotOk(response, "ユーザー情報の取得に失敗しました");
  return response.json() as Promise<User>;
};

export const verifyEmail = async (verifyUrl: string): Promise<void> => {
  const response = await get(verifyUrl);
  await throwIfNotOk(response, "メール認証に失敗しました");
};

export const resendVerificationEmail = async (): Promise<"sent" | "already-verified"> => {
  const response = await post("/api/v1/email/verification-notification");
  await throwIfNotOk(response, "確認メールの再送に失敗しました");
  const data = await response.json().catch(() => ({}));
  return (data as { status?: string }).status === "already-verified"
    ? "already-verified"
    : "sent";
};

export const sendPasswordResetLink = async (email: string): Promise<void> => {
  await getCsrfCookie();
  const response = await post("/api/v1/forgot-password", { email });
  await throwIfNotOk(response, "パスワード再設定メールの送信に失敗しました");
};

export const resetPassword = async (payload: ResetPasswordPayload): Promise<void> => {
  await getCsrfCookie();
  const response = await post("/api/v1/reset-password", payload);
  await throwIfNotOk(response, "パスワードのリセットに失敗しました");
};
