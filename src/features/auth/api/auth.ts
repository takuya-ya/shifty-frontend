import { apiClient } from '../../../shared/api/client';

/**
 * CSRFクッキーを取得する
 */
export const getCsrfCookie = async (): Promise<void> => {
  await apiClient('/sanctum/csrf-cookie', {
    method: 'GET',
  });
};

/**
 * メールアドレスを認証する
 * @param verifyUrl - Laravel から送られた認証URL（絶対URLまたはパス）
 */
export const verifyEmail = async (verifyUrl: string): Promise<void> => {
  const response = await apiClient(verifyUrl, {
    method: 'GET',
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error((data as { message?: string }).message ?? 'メール認証に失敗しました');
  }
};

/**
 * 確認メールを再送する
 * @returns 'sent' | 'already-verified'
 */
export const resendVerificationEmail = async (): Promise<'sent' | 'already-verified'> => {
  const response = await apiClient('/api/v1/email/verification-notification', {
    method: 'POST',
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error((data as { message?: string }).message ?? '確認メールの再送に失敗しました');
  }

  const data = await response.json().catch(() => ({}));
  if ((data as { status?: string }).status === 'already-verified') {
    return 'already-verified';
  }
  return 'sent';
};
