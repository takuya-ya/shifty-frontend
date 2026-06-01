import { format, parseISO } from 'date-fns'
import type { Shift } from '../types'

interface ShiftBlockProps {
  shift: Shift
}

export function ShiftBlock({ shift }: ShiftBlockProps) {
  const timeLabel = `${format(parseISO(shift.startAt), 'HH:mm')}〜${format(parseISO(shift.endAt), 'HH:mm')}`

  return (
    <div className="w-full h-full rounded-md bg-gray-200 flex items-center justify-center px-1.5">
      <span className="text-xs whitespace-nowrap">{timeLabel}</span>
    </div>
  )
}
