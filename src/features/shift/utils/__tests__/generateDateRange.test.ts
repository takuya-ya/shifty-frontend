import { describe, expect, it } from 'vitest'
import { generateDateRange } from '../generateDateRange'

describe('generateDateRange', () => {
  it('前半期間(8/1〜8/15) → 15個の DateCell を返す', () => {
    const period = { from: new Date(2026, 7, 1), to: new Date(2026, 7, 15) }
    const result = generateDateRange(period)
    expect(result).toHaveLength(15)
  })

  it('後半期間(8/16〜8/31) → 16個の DateCell を返す', () => {
    const period = { from: new Date(2026, 7, 16), to: new Date(2026, 7, 31) }
    const result = generateDateRange(period)
    expect(result).toHaveLength(16)
  })

  it('2月後半(2/16〜2/28) → 13個の DateCell を返す', () => {
    const period = { from: new Date(2026, 1, 16), to: new Date(2026, 1, 28) }
    const result = generateDateRange(period)
    expect(result).toHaveLength(13)
  })

  it('各 DateCell の dayOfWeek が正しい曜日値を持つ', () => {
    const period = { from: new Date(2026, 7, 1), to: new Date(2026, 7, 3) }
    const result = generateDateRange(period)

    expect(result[0].dayOfWeek).toBe(6) // 8/1 土曜
    expect(result[1].dayOfWeek).toBe(0) // 8/2 日曜
    expect(result[2].dayOfWeek).toBe(1) // 8/3 月曜
  })
})
