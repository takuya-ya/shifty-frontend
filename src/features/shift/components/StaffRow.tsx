import type { DateCell, Staff } from '../types'
import { ShiftCell } from './ShiftCell'

interface StaffRowProps {
  member: Staff
  dates: DateCell[]
  gridTemplateColumns: string
}

export function StaffRow({ member, dates, gridTemplateColumns }: StaffRowProps) {
  return (
    <div
      className="grid border-b border-gray-200 bg-white"
      style={{ gridTemplateColumns }}
    >
      <div className="h-16 px-3 border-r border-gray-300 flex items-center min-w-0">
        <span className="text-xs text-gray-900 truncate">{member.name}</span>
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
