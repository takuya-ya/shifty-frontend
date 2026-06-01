import { format, parseISO } from 'date-fns'
import type { Shift } from '../types'

export function toDateKey(date: Date): string {
  return format(date, 'yyyy-MM-dd')
}

export type ShiftMap = { [staffId: number]: { [dateKey: string]: Shift[] } }

export function groupShiftsByStaffAndDate(shifts: Shift[]): ShiftMap {
  const map: ShiftMap = {}

  for (const shift of shifts) {
    const dateKey = toDateKey(parseISO(shift.startAt))

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
