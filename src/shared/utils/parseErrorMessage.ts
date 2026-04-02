/**
 * catch ブロックで受け取った unknown なエラーを表示用文字列に変換する。
 * API 関数は必ず new Error() をスローするため、通常は err.message がそのまま返る。
 */
export const parseErrorMessage = (
  err: unknown,
  fallback = "エラーが発生しました",
): string => {
  if (err instanceof Error) return err.message;
  return fallback;
};
