import { useState } from 'react'
import type { ShiftPeriod } from '../types'
import { getCurrentPeriod } from '../utils/getCurrentPeriod'
import { getPrevPeriod, getNextPeriod } from '../utils/periodHelpers'

export function usePeriodNavigation(initialPeriod: ShiftPeriod = getCurrentPeriod()) {
  const [period, setPeriod] = useState<ShiftPeriod>(initialPeriod)

  const goToPrev = () => setPeriod((p) => getPrevPeriod(p))
  const goToNext = () => setPeriod((p) => getNextPeriod(p))
  const goToToday = () => setPeriod(getCurrentPeriod())

  return { period, goToPrev, goToNext, goToToday }
}
