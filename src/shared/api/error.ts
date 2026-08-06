export type ApiErrorType = 'unauthorized' | 'forbidden' | 'validation' | 'server' | 'unknown';

/** HTTP ステータスコードからエラー種別を分類する */
const classifyStatus = (status: number): ApiErrorType => {
  if (status === 401) return 'unauthorized';
  if (status === 403) return 'forbidden';
  if (status === 422) return 'validation';
  if (status >= 500) return 'server';
  return 'unknown';
};

/** Laravel の標準エラーレスポンス形式 */
interface ErrorResponseBody {
  message?: string;
  errors?: Record<string, string[]>;
}

/**
 * API 通信で発生したエラーを表すクラス。
 * - `status`: HTTP ステータスコード
 * - `type`: エラー種別（unauthorized / validation / server / unknown）
 * - `errors`: 422 バリデーションエラーの詳細（フィールド別）
 */
export class ApiError extends Error {
  readonly status: number;
  readonly type: ApiErrorType;
  readonly errors: Record<string, string[]> | undefined;
　
  constructor(status: number, message: string, errors?: Record<string, string[]>) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.type = classifyStatus(status);
    this.errors = errors;
  }
}

export const isApiError = (error: unknown): error is ApiError =>
  error instanceof ApiError;

/** レスポンスが失敗の場合に ApiError をスローする */
export const throwIfNotOk = async (response: Response, fallback: string): Promise<void> => {
  if (response.ok) return;
  const data: ErrorResponseBody = await response.json().catch(() => ({}));
  throw new ApiError(response.status, data.message ?? fallback, data.errors);
};

/** レスポンスボディを一度だけ読み取り、失敗なら ApiError をスローして成功なら T を返す */
export const fetchJson = async <T>(response: Response, fallback: string): Promise<T> => {
  const data: ErrorResponseBody = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new ApiError(response.status, data.message ?? fallback, data.errors);
  }
  return data as T;
};
