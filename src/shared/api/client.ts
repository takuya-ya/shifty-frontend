import { getCookie } from '../utils/cookie';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

/**
 * APIリクエストのベースとなるクライアント
 */
export const apiClient = async (endpoint: string, options: RequestInit = {}) => {
  const xsrfToken = getCookie('XSRF-TOKEN');

  const defaultHeaders: Record<string, string> = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  };

  if (xsrfToken) {
    defaultHeaders['X-XSRF-TOKEN'] = xsrfToken;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    // クッキー（Sanctum）を送信するために必要
    credentials: 'include',
  });

  return response;
};
