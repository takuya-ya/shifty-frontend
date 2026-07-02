import { describe, it, expect } from 'vitest'
import { shiftEditSchema } from '../shiftEditSchema'

const validInput = {
  positionId: '1',
  startTime: '09:00',
  endTime: '18:00',
  breakStartTime: '12:00',
  breakEndTime: '13:00',
  memo: '',
}

function getFieldError(input: Record<string, string>, field: string): string | undefined {
  const result = shiftEditSchema.safeParse(input)
  if (result.success) return undefined
  return result.error.issues.find((issue) => issue.path[0] === field)?.message
}

describe('shiftEditSchema', () => {
  it('勤務時間・休憩時間がすべて正常な値でバリデーション通過する', () => {
    const result = shiftEditSchema.safeParse(validInput)
    expect(result.success).toBe(true)
  })

  describe('休憩なし', () => {
    it('休憩開始・休憩終了が両方空文字の場合バリデーション通過する', () => {
      const result = shiftEditSchema.safeParse({ ...validInput, breakStartTime: '', breakEndTime: '' })
      expect(result.success).toBe(true)
    })

    it('休憩なしの場合 breakStartTime / breakEndTime が undefined に変換される', () => {
      const result = shiftEditSchema.safeParse({ ...validInput, breakStartTime: '', breakEndTime: '' })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.breakStartTime).toBeUndefined()
        expect(result.data.breakEndTime).toBeUndefined()
      }
    })

    it('休憩開始のみ入力した場合エラーになる', () => {
      const error = getFieldError({ ...validInput, breakStartTime: '12:00', breakEndTime: '' }, 'breakStartTime')
      expect(error).toBe('休憩開始と休憩終了は両方入力してください')
    })

    it('休憩終了のみ入力した場合エラーになる', () => {
      const error = getFieldError({ ...validInput, breakStartTime: '', breakEndTime: '13:00' }, 'breakStartTime')
      expect(error).toBe('休憩開始と休憩終了は両方入力してください')
    })
  })

  describe('退勤 vs 出勤', () => {
    it('退勤時間が出勤時間より前の場合エラーになる', () => {
      const error = getFieldError({ ...validInput, startTime: '18:00', endTime: '09:00' }, 'endTime')
      expect(error).toBe('退勤時間は出勤時間より後にしてください')
    })

    it('退勤時間と出勤時間が同じ場合エラーになる', () => {
      const error = getFieldError({ ...validInput, startTime: '09:00', endTime: '09:00' }, 'endTime')
      expect(error).toBe('退勤時間は出勤時間より後にしてください')
    })
  })

  describe('休憩開始の範囲', () => {
    it('休憩開始が出勤時間より前の場合エラーになる', () => {
      const error = getFieldError({ ...validInput, startTime: '10:00', breakStartTime: '09:00' }, 'breakStartTime')
      expect(error).toBe('休憩開始は勤務時間内にしてください')
    })

    it('休憩開始が退勤時間と同じ場合エラーになる', () => {
      const error = getFieldError({ ...validInput, endTime: '18:00', breakStartTime: '18:00' }, 'breakStartTime')
      expect(error).toBe('休憩開始は勤務時間内にしてください')
    })
  })

  describe('休憩終了 vs 休憩開始', () => {
    it('休憩終了が休憩開始と同じ場合エラーになる', () => {
      const error = getFieldError({ ...validInput, breakStartTime: '12:00', breakEndTime: '12:00' }, 'breakEndTime')
      expect(error).toBe('休憩終了は休憩開始より後にしてください')
    })
  })

  describe('休憩終了 vs 退勤', () => {
    it('休憩終了が退勤時間より後の場合エラーになる', () => {
      const error = getFieldError({ ...validInput, endTime: '18:00', breakEndTime: '19:00' }, 'breakEndTime')
      expect(error).toBe('休憩終了は退勤時間以前にしてください')
    })
  })
})
