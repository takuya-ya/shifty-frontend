import type { ShiftPeriod } from '../types'

export function formatPeriodLabel(period: ShiftPeriod): string {
  const { from } = period
  const year = from.getFullYear()
  const month = from.getMonth() + 1
  const half = from.getDate() <= 15 ? '前半' : '後半'

  return `${year}年${month}月 ${half}`
}
