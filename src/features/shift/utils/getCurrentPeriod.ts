import { endOfMonth } from 'date-fns'
import type { ShiftPeriod } from '../types'

export function getCurrentPeriod(): ShiftPeriod {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()

  if (today.getDate() <= 15) {
    return {
      from: new Date(year, month, 1),
      to: new Date(year, month, 15),
    }
  }

  return {
    from: new Date(year, month, 16),
    to: endOfMonth(today),
  }
}
