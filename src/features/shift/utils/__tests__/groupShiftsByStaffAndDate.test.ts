import { describe, expect, it } from 'vitest'
import type { Shift } from '../../types'
import { groupShiftsByStaffAndDate } from '../groupShiftsByStaffAndDate'

const makeShift = (id: number, staffId: number, startAt: string): Shift => ({
  id,
  staffId,
  startAt,
  endAt: startAt,
  state: 'draft',
})

describe('groupShiftsByStaffAndDate', () => {
  it('異なるスタッフのシフトが互いに干渉しない', () => {
    const shifts: Shift[] = [
      makeShift(1, 1, '2026-05-01T00:00:00Z'),
      makeShift(2, 2, '2026-05-01T00:00:00Z'),
    ]

    const result = groupShiftsByStaffAndDate(shifts)

    expect(result[1]['2026-05-01']).toHaveLength(1)
    expect(result[1]['2026-05-01'][0].id).toBe(1)
    expect(result[2]['2026-05-01']).toHaveLength(1)
    expect(result[2]['2026-05-01'][0].id).toBe(2)
  })

  it('同一スタッフの異なる日付のシフトが別々のキーで管理される', () => {
    const shifts: Shift[] = [
      makeShift(1, 1, '2026-05-01T00:00:00Z'),
      makeShift(2, 1, '2026-05-02T00:00:00Z'),
    ]

    const result = groupShiftsByStaffAndDate(shifts)

    expect(result[1]['2026-05-01']).toHaveLength(1)
    expect(result[1]['2026-05-01'][0].id).toBe(1)
    expect(result[1]['2026-05-02']).toHaveLength(1)
    expect(result[1]['2026-05-02'][0].id).toBe(2)
  })

  // 上書きが許されないパターン：1件でも欠落するとシフト確認業務に支障が出る
  it('同一スタッフ・同一日に複数シフトがある場合、すべて保持される', () => {
    const shifts: Shift[] = [
      makeShift(1, 1, '2026-05-01T00:00:00Z'),
      makeShift(2, 1, '2026-05-01T05:00:00Z'),
    ]

    const result = groupShiftsByStaffAndDate(shifts)

    expect(result[1]['2026-05-01']).toHaveLength(2)
    expect(result[1]['2026-05-01'].map((s) => s.id)).toContain(1)
    expect(result[1]['2026-05-01'].map((s) => s.id)).toContain(2)
  })

  // タイムゾーンズレは全セルのシフト表示が消える致命的デグレになる
  // "2026-04-30T15:00:00Z" は JST では 2026-05-01T00:00:00+09:00（日付をまたぐケース）
  // TZ=Asia/Tokyo でテストを実行することを前提とする
  it('UTC の startAt が JST のローカル日付キーに正しく変換される', () => {
    const shifts: Shift[] = [
      makeShift(1, 1, '2026-04-30T15:00:00Z'),
    ]

    const result = groupShiftsByStaffAndDate(shifts)

    expect(result[1]['2026-05-01']).toBeDefined()
    expect(result[1]['2026-04-30']).toBeUndefined()
  })
})
