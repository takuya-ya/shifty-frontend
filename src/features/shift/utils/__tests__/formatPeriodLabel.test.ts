import { describe, expect, it } from 'vitest'
import { formatPeriodLabel } from '../formatPeriodLabel'

describe('formatPeriodLabel', () => {
  it('前半期間 → "年月 前半" 形式で返す', () => {
    const period = { from: new Date(2026, 7, 1), to: new Date(2026, 7, 15) }
    expect(formatPeriodLabel(period)).toBe('2026年8月 前半')
  })

  it('後半期間 → "年月 後半" 形式で返す', () => {
    const period = { from: new Date(2026, 7, 16), to: new Date(2026, 7, 31) }
    expect(formatPeriodLabel(period)).toBe('2026年8月 後半')
  })

  it('1月 → 月が1-indexed で正しく表示される', () => {
    const period = { from: new Date(2026, 0, 1), to: new Date(2026, 0, 15) }
    expect(formatPeriodLabel(period)).toBe('2026年1月 前半')
  })
})
