import type { Shift } from '../types'
import { formatShiftTime } from '../utils/formatShiftTime'

interface ShiftBlockProps {
  shift: Shift
}

export function ShiftBlock({ shift }: ShiftBlockProps) {
  const timeLabel = formatShiftTime(shift.startTime, shift.endTime)

  return (
    <div className="w-full h-full rounded-md bg-gray-200 flex items-center justify-center px-1.5">
      <span className="text-xs whitespace-nowrap">{timeLabel}</span>
    </div>
  )
}
