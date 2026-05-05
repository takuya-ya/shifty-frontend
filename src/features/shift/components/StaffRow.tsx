import type { DateCell, Staff } from '../types'
import { ShiftCell } from './ShiftCell'

interface StaffRowProps {
  staff: Staff
  dates: DateCell[]
  gridTemplateColumns: string
}

export function StaffRow({ staff, dates, gridTemplateColumns }: StaffRowProps) {
  return (
    <div
      className="grid border-b border-gray-200 bg-white"
      style={{ gridTemplateColumns }}
    >
      <div className="px-3 py-4 border-r border-gray-300 flex items-center min-w-0">
        <span className="text-xs text-gray-900 truncate">{staff.name}</span>
      </div>
      {dates.map((cell) => (
        <ShiftCell
          key={cell.date.toISOString()}
          staffId={staff.id}
          date={cell.date}
        />
      ))}
    </div>
  )
}
