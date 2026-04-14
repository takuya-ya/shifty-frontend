/** レスポンスが失敗の場合にサーバーメッセージ付きでエラーをスローする */
export const throwIfNotOk = async (response: Response, fallback: string): Promise<void> => {
  if (response.ok) return;
  const data = await response.json().catch(() => ({}));
  throw new Error((data as { message?: string }).message ?? fallback);
};
