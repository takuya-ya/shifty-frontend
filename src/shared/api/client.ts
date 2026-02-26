import { getCookie } from '../utils/cookie';

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

  const response = await fetch(endpoint, {
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
