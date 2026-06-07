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

  const requestUrl = BASE_URL
    ? new URL(endpoint, BASE_URL).toString()
    : endpoint;

  // 呼び出し元（TanStack Query の signal 等）がキャンセル制御を持つ場合はそちらを優先する
  const signal = options.signal ?? AbortSignal.timeout(10_000);

  const response = await fetch(requestUrl, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    // クッキー（Sanctum）を送信するために必要
    credentials: 'include',
    signal,
  });
  return response;
};

export const get = (endpoint: string, options: Omit<RequestInit, 'method'> = {}) =>
  apiClient(endpoint, { ...options, method: 'GET' });

export const post = (endpoint: string, body?: unknown, options: Omit<RequestInit, 'method' | 'body'> = {}) =>
  apiClient(endpoint, { ...options, method: 'POST', body: body !== undefined ? JSON.stringify(body) : undefined });

export const patch = (endpoint: string, body?: unknown, options: Omit<RequestInit, 'method' | 'body'> = {}) =>
  apiClient(endpoint, { ...options, method: 'PATCH', body: body !== undefined ? JSON.stringify(body) : undefined });

export const del = (endpoint: string, options: Omit<RequestInit, 'method'> = {}) =>
  apiClient(endpoint, { ...options, method: 'DELETE' });
