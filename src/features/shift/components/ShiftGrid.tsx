import type { DateCell, Staff } from '../types'
import { DateHeaderRow } from './DateHeaderRow'
import { StaffRow } from './StaffRow'

const STAFF_COL_WIDTH = '120px'
const DATE_COL_MIN_WIDTH = '80px'

interface ShiftGridProps {
  dates: DateCell[]
  members: Staff[]
}

export function ShiftGrid({ dates, members }: ShiftGridProps) {
  const gridTemplateColumns = `${STAFF_COL_WIDTH} repeat(${dates.length}, minmax(${DATE_COL_MIN_WIDTH}, 1fr))`

  return (
    <div className="overflow-x-auto bg-gray-50">
      <div className="w-max min-w-full">
        <DateHeaderRow dates={dates} gridTemplateColumns={gridTemplateColumns} />
        {members.map((member) => (
          <StaffRow
            key={member.id}
            member={member}
            dates={dates}
            gridTemplateColumns={gridTemplateColumns}
          />
        ))}
      </div>
    </div>
  )
}
