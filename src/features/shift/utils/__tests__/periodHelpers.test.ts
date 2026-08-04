import { describe, expect, it } from 'vitest'
import { endOfMonth } from 'date-fns'
import { isFirstHalf, getPrevPeriod, getNextPeriod } from '../periodHelpers'

describe('isFirstHalf', () => {
  it('from が1日 → true', () => {
    const period = { from: new Date(2026, 7, 1), to: new Date(2026, 7, 15) }
    expect(isFirstHalf(period)).toBe(true)
  })

  it('from が15日 → true（境界値）', () => {
    const period = { from: new Date(2026, 7, 15), to: new Date(2026, 7, 15) }
    expect(isFirstHalf(period)).toBe(true)
  })

  it('from が16日 → false（境界値）', () => {
    const period = { from: new Date(2026, 7, 16), to: new Date(2026, 7, 31) }
    expect(isFirstHalf(period)).toBe(false)
  })
})

describe('getPrevPeriod', () => {
  it('8月前半 → 7月後半(7/16〜7/31)', () => {
    const current = { from: new Date(2026, 7, 1), to: new Date(2026, 7, 15) }
    const result = getPrevPeriod(current)
    expect(result).toEqual({
      from: new Date(2026, 6, 16),
      to: endOfMonth(new Date(2026, 6, 1)),
    })
  })

  it('8月後半 → 8月前半(8/1〜8/15)', () => {
    const current = { from: new Date(2026, 7, 16), to: new Date(2026, 7, 31) }
    const result = getPrevPeriod(current)
    expect(result).toEqual({
      from: new Date(2026, 7, 1),
      to: new Date(2026, 7, 15),
    })
  })

  it('1月前半 → 前年12月後半(12/16〜12/31)', () => {
    const current = { from: new Date(2026, 0, 1), to: new Date(2026, 0, 15) }
    const result = getPrevPeriod(current)
    expect(result).toEqual({
      from: new Date(2025, 11, 16),
      to: endOfMonth(new Date(2025, 11, 1)),
    })
  })

  it('3月前半 → 2月後半(2/16〜2/28)※平年', () => {
    const current = { from: new Date(2026, 2, 1), to: new Date(2026, 2, 15) }
    const result = getPrevPeriod(current)
    expect(result).toEqual({
      from: new Date(2026, 1, 16),
      to: endOfMonth(new Date(2026, 1, 1)),
    })
  })

  it('5月前半 → 4月後半(4/16〜4/30)', () => {
    const current = { from: new Date(2026, 4, 1), to: new Date(2026, 4, 15) }
    const result = getPrevPeriod(current)
    expect(result).toEqual({
      from: new Date(2026, 3, 16),
      to: endOfMonth(new Date(2026, 3, 1)),
    })
  })
})

describe('getNextPeriod', () => {
  it('8月前半 → 8月後半(8/16〜8/31)', () => {
    const current = { from: new Date(2026, 7, 1), to: new Date(2026, 7, 15) }
    const result = getNextPeriod(current)
    expect(result).toEqual({
      from: new Date(2026, 7, 16),
      to: endOfMonth(new Date(2026, 7, 1)),
    })
  })

  it('8月後半 → 9月前半(9/1〜9/15)', () => {
    const current = { from: new Date(2026, 7, 16), to: new Date(2026, 7, 31) }
    const result = getNextPeriod(current)
    expect(result).toEqual({
      from: new Date(2026, 8, 1),
      to: new Date(2026, 8, 15),
    })
  })

  it('12月後半 → 翌年1月前半(1/1〜1/15)', () => {
    const current = { from: new Date(2026, 11, 16), to: new Date(2026, 11, 31) }
    const result = getNextPeriod(current)
    expect(result).toEqual({
      from: new Date(2027, 0, 1),
      to: new Date(2027, 0, 15),
    })
  })

  it('1月後半 → 2月前半(2/1〜2/15)', () => {
    const current = { from: new Date(2026, 0, 16), to: new Date(2026, 0, 31) }
    const result = getNextPeriod(current)
    expect(result).toEqual({
      from: new Date(2026, 1, 1),
      to: new Date(2026, 1, 15),
    })
  })

  it('2月前半 → 2月後半(2/16〜2/28)※平年', () => {
    const current = { from: new Date(2026, 1, 1), to: new Date(2026, 1, 15) }
    const result = getNextPeriod(current)
    expect(result).toEqual({
      from: new Date(2026, 1, 16),
      to: endOfMonth(new Date(2026, 1, 1)),
    })
  })
})
