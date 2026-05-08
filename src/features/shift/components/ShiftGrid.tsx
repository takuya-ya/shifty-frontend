import type { DateCell, DayOfWeek, Staff } from '../types'
import { DateHeaderRow } from './DateHeaderRow'
import { StaffRow } from './StaffRow'

const STAFF_COL_WIDTH = '120px'
const DATE_COL_MIN_WIDTH = '80px'

interface ShiftGridProps {
  dates: DateCell[]
  members: Staff[]
  closedDays?: DayOfWeek[]
}

export function ShiftGrid({ dates, members, closedDays = [] }: ShiftGridProps) {
  const gridTemplateColumns = `${STAFF_COL_WIDTH} repeat(${dates.length}, minmax(${DATE_COL_MIN_WIDTH}, 1fr))`

  return (
    <div className="overflow-x-auto bg-gray-50">
      <div className="w-max min-w-full border-t border-l border-gray-200">
        <DateHeaderRow dates={dates} gridTemplateColumns={gridTemplateColumns} closedDays={closedDays} />
        {members.map((member, index) => (
          <StaffRow
            key={member.id}
            member={member}
            dates={dates}
            gridTemplateColumns={gridTemplateColumns}
            isEven={index % 2 === 0}
            closedDays={closedDays}
          />
        ))}
      </div>
    </div>
  )
}
