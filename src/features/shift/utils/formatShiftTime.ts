/**
 * 開始・終了時刻を "HH:MM〜HH:MM" 形式にフォーマットする。
 *
 * - どちらかが null / undefined / 空文字の場合は null を返す
 * - midnight 跨ぎ（終了 < 開始）はそのまま表示する（例: "22:00〜02:00"）
 */
export function formatShiftTime(
  startTime: string | null | undefined,
  endTime: string | null | undefined,
): string | null {
  if (!startTime || !endTime) return null

  return `${startTime}〜${endTime}`
}
