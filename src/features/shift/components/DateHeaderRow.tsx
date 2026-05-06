import { format, isSameDay } from 'date-fns'
import { cn } from '@/lib/utils'
import { useCurrentDate } from '@/shared/hooks/useCurrentDate'
import type { DateCell } from '../types'

const DAY_LABELS = ['日', '月', '火', '水', '木', '金', '土'] as const

interface DateHeaderRowProps {
  dates: DateCell[]
  gridTemplateColumns: string
  closedDays?: number[]
}

export function DateHeaderRow({ dates, gridTemplateColumns, closedDays = [] }: DateHeaderRowProps) {
  const currentDate = useCurrentDate()

  return (
    <div
      className="grid sticky top-0 z-10 bg-white border-b-2 border-gray-300"
      style={{ gridTemplateColumns }}
    >
      <div className="px-3 py-2 border-r-2 border-gray-300 flex items-center">
        <span className="text-xs text-gray-900">スタッフ名</span>
      </div>
      {dates.map((cell) => {
        const isCurrentDay = isSameDay(cell.date, currentDate)
        const isSunday = cell.dayOfWeek === 0
        const isSaturday = cell.dayOfWeek === 6
        const isClosed = closedDays.includes(cell.dayOfWeek)

        const dateTextColor = isSunday
          ? 'text-red-500'
          : isSaturday
            ? 'text-blue-500'
            : 'text-gray-900'

        return (
          <div
            key={cell.date.toISOString()}
            className={cn(
              'px-1 py-2 border-r border-gray-200 text-center',
              isClosed ? 'bg-gray-100' : isCurrentDay ? 'bg-blue-50' : '',
            )}
          >
            <div className={`text-xs font-medium ${dateTextColor}`}>
              {format(cell.date, 'M/d')}
            </div>
            <div className={`text-xs ${dateTextColor}`}>
              {DAY_LABELS[cell.dayOfWeek]}
            </div>
          </div>
        )
      })}
    </div>
  )
}
