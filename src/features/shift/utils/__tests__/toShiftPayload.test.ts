import { describe, it, expect } from 'vitest'
import { toShiftPayload } from '../toShiftPayload'

const validValues = {
  positionId: '1',
  startTime: '09:00',
  endTime: '18:00',
  breakStartTime: '12:00',
  breakEndTime: '13:00',
  memo: '早番',
}

describe('toShiftPayload', () => {
  it('フォーム入力値と日付を結合して正しいペイロードに変換される', () => {
    const date = new Date(2026, 3, 26)
    const result = toShiftPayload(validValues, date)

    expect(result).toEqual({
      position_id: 1,
      start_at: '2026-04-26 09:00:00',
      end_at: '2026-04-26 18:00:00',
      break_start_at: '2026-04-26 12:00:00',
      break_end_at: '2026-04-26 13:00:00',
      memo: '早番',
    })
  })

  it('memo が空文字の場合 null に変換される', () => {
    const date = new Date(2026, 3, 26)
    const result = toShiftPayload({ ...validValues, memo: '' }, date)

    expect(result.memo).toBeNull()
  })

  it('休憩なし（undefined）の場合 break_start_at / break_end_at が null になる', () => {
    const date = new Date(2026, 3, 26)
    const result = toShiftPayload({ ...validValues, breakStartTime: undefined, breakEndTime: undefined }, date)

    expect(result.break_start_at).toBeNull()
    expect(result.break_end_at).toBeNull()
  })

  it('月末日で日付部分が正しく出力される', () => {
    const date = new Date(2026, 0, 31)
    const result = toShiftPayload(validValues, date)

    expect(result.start_at).toBe('2026-01-31 09:00:00')
    expect(result.end_at).toBe('2026-01-31 18:00:00')
  })
})
