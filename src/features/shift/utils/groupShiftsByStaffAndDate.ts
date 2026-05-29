import { format, parseISO, startOfDay } from 'date-fns'
import type { Shift } from '../types'

export type ShiftMap = { [staffId: number]: { [dateKey: string]: Shift[] } }

export function groupShiftsByStaffAndDate(shifts: Shift[]): ShiftMap {
  const map: ShiftMap = {}

  for (const shift of shifts) {
    const dateKey = format(startOfDay(parseISO(shift.startAt)), 'yyyy-MM-dd')

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
