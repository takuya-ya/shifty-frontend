import { eachDayOfInterval, getDay } from 'date-fns'
import type { DateCell, ShiftPeriod } from '../types'

export function generateDateRange(period: ShiftPeriod): DateCell[] {
  return eachDayOfInterval({ start: period.from, end: period.to }).map((date) => ({
    date,
    dayOfWeek: getDay(date),
  }))
}
