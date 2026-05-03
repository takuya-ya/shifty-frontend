import type { DateCell, StaffRow } from '../types'
import { DateHeaderRow } from './DateHeaderRow'

const STAFF_COL_WIDTH = '120px'
const DATE_COL_MIN_WIDTH = '80px'

interface ShiftGridProps {
  dates: DateCell[]
  staffRows: StaffRow[]
}

export function ShiftGrid({ dates, staffRows }: ShiftGridProps) {
  const gridTemplateColumns = `${STAFF_COL_WIDTH} repeat(${dates.length}, minmax(${DATE_COL_MIN_WIDTH}, 1fr))`

  return (
    <div className="overflow-x-auto bg-gray-50">
      <div className="w-max min-w-full">
        <DateHeaderRow dates={dates} gridTemplateColumns={gridTemplateColumns} />

        {/* スタッフ行 */}
        {staffRows.map((staff) => (
          <div
            key={staff.id}
            className="grid border-b border-gray-200 bg-white"
            style={{ gridTemplateColumns }}
          >
            <div className="px-3 py-4 border-r border-gray-300 flex items-center">
              <span className="text-xs text-gray-900 truncate">{staff.name}</span>
            </div>
            {dates.map((cell) => (
              <div
                key={cell.date.toISOString()}
                className="h-16 border-r border-gray-200"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
