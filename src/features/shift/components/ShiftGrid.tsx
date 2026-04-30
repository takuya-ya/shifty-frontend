import type { DateCell, StaffRow } from '../types'

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
      <div className="min-w-[1200px]" style={{ gridTemplateColumns }}>
        {/* ヘッダー行 */}
        <div
          className="grid sticky top-0 z-10 bg-white border-b-2 border-gray-300"
          style={{ gridTemplateColumns }}
        >
          <div className="px-3 py-2 border-r border-gray-300 flex items-center">
            <span className="text-xs text-gray-900">スタッフ名</span>
          </div>
          {dates.map((cell) => (
            <div
              key={cell.date.toISOString()}
              className="px-2 py-2 border-r border-gray-200 text-center"
            >
              <span className="text-sm text-gray-900">
                {cell.date.getDate()}日
              </span>
            </div>
          ))}
        </div>

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
