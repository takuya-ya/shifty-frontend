import { cn } from '@/lib/utils'
import type { DateCell, Staff } from '../types'
import { ShiftCell } from './ShiftCell'

interface StaffRowProps {
  member: Staff
  dates: DateCell[]
  gridTemplateColumns: string
  isEven: boolean
}

export function StaffRow({ member, dates, gridTemplateColumns, isEven }: StaffRowProps) {
  return (
    <div
      className={cn('grid border-b border-gray-200', isEven ? 'bg-white' : 'bg-gray-50')}
      style={{ gridTemplateColumns }}
    >
      <div className="h-16 px-3 border-r border-gray-300 flex flex-col justify-center gap-0.5 min-w-0">
        <span className="text-xs font-medium text-gray-900 truncate">{member.name}</span>
        {member.position && (
          <span className="text-[10px] text-gray-500 truncate">{member.position}</span>
        )}
      </div>
      {dates.map((cell) => (
        <ShiftCell
          key={cell.date.toISOString()}
          staffId={member.id}
          date={cell.date}
        />
      ))}
    </div>
  )
}
