import type { Shift } from '../types'

export type ShiftMap = { [staffId: number]: { [dateKey: string]: Shift[] } }

export function groupShiftsByStaffAndDate(shifts: Shift[]): ShiftMap {
  const map: ShiftMap = {}

  for (const shift of shifts) {
    const dateKey = shift.startAt.slice(0, 10)

    if (!map[shift.staffId]) {
      map[shift.staffId] = {}
    }
    if (!map[shift.staffId][dateKey]) {
      map[shift.staffId][dateKey] = []
    }
    map[shift.staffId][dateKey].push(shift)
  }

  return map
}
