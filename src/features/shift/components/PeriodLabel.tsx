import type { ShiftPeriod } from '../types'
import { formatPeriodLabel } from '../utils/formatPeriodLabel'

interface PeriodLabelProps {
  period: ShiftPeriod
}

export function PeriodLabel({ period }: PeriodLabelProps) {
  return (
    <div className="px-4 py-2 bg-gray-50 rounded-lg min-w-[200px] text-center text-gray-900">
      {formatPeriodLabel(period)}
    </div>
  )
}
