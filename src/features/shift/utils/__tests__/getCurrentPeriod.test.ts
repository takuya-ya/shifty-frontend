import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { endOfMonth } from 'date-fns'
import { getCurrentPeriod } from '../getCurrentPeriod'

describe('getCurrentPeriod', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('1日 → 当月前半を返す', () => {
    vi.setSystemTime(new Date(2026, 7, 1))
    const result = getCurrentPeriod()
    expect(result).toEqual({
      from: new Date(2026, 7, 1),
      to: new Date(2026, 7, 15),
    })
  })

  it('15日 → 当月前半を返す（境界値）', () => {
    vi.setSystemTime(new Date(2026, 7, 15))
    const result = getCurrentPeriod()
    expect(result).toEqual({
      from: new Date(2026, 7, 1),
      to: new Date(2026, 7, 15),
    })
  })

  it('16日 → 当月後半を返す（境界値）', () => {
    vi.setSystemTime(new Date(2026, 7, 16))
    const result = getCurrentPeriod()
    expect(result).toEqual({
      from: new Date(2026, 7, 16),
      to: endOfMonth(new Date(2026, 7, 1)),
    })
  })

  it('2月16日 → 2月後半を返す（月末日が28日）', () => {
    vi.setSystemTime(new Date(2026, 1, 16))
    const result = getCurrentPeriod()
    expect(result).toEqual({
      from: new Date(2026, 1, 16),
      to: endOfMonth(new Date(2026, 1, 1)),
    })
  })
})
