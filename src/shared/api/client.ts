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

  let timerId: ReturnType<typeof setTimeout> | undefined;
  let signal = options.signal;
  if (!signal) {
    const controller = new AbortController();
    timerId = setTimeout(() => controller.abort(), 10_000);
    signal = controller.signal;
  }

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

  clearTimeout(timerId);

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
