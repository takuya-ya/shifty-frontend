import { useState } from 'react'
import { endOfMonth } from 'date-fns'
import type { ShiftPeriod } from '../types'
import { getCurrentPeriod } from '../utils/getCurrentPeriod'

function isFirstHalf(period: ShiftPeriod): boolean {
  return period.from.getDate() <= 15
}

function getPrevPeriod(current: ShiftPeriod): ShiftPeriod {
  const { from } = current
  const year = from.getFullYear()
  const month = from.getMonth()

  if (isFirstHalf(current)) {
    const prevMonth = month === 0 ? 11 : month - 1
    const prevYear = month === 0 ? year - 1 : year
    return {
      from: new Date(prevYear, prevMonth, 16),
      to: endOfMonth(new Date(prevYear, prevMonth, 1)),
    }
  }

  return {
    from: new Date(year, month, 1),
    to: new Date(year, month, 15),
  }
}

function getNextPeriod(current: ShiftPeriod): ShiftPeriod {
  const { from } = current
  const year = from.getFullYear()
  const month = from.getMonth()

  if (isFirstHalf(current)) {
    return {
      from: new Date(year, month, 16),
      to: endOfMonth(new Date(year, month, 1)),
    }
  }

  const nextMonth = month === 11 ? 0 : month + 1
  const nextYear = month === 11 ? year + 1 : year
  return {
    from: new Date(nextYear, nextMonth, 1),
    to: new Date(nextYear, nextMonth, 15),
  }
}

export function usePeriodNavigation(initialPeriod: ShiftPeriod = getCurrentPeriod()) {
  const [period, setPeriod] = useState<ShiftPeriod>(initialPeriod)

  const goToPrev = () => setPeriod((p) => getPrevPeriod(p))
  const goToNext = () => setPeriod((p) => getNextPeriod(p))

  return { period, goToPrev, goToNext }
}
