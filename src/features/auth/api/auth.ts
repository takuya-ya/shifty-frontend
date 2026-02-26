import { apiClient } from '../../../shared/api/client';

/**
 * CSRFクッキーを取得する
 */
export const getCsrfCookie = async (): Promise<void> => {
  await apiClient('/sanctum/csrf-cookie', {
    method: 'GET',
  });
};
