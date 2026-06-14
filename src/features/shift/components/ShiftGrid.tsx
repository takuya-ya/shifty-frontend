import type { DateCell, DayOfWeek, Shift, Staff } from '../types'
import { groupShiftsByStaffAndDate } from '../utils/groupShiftsByStaffAndDate'
import { BalanceBar } from './BalanceBar'
import { DateHeaderRow } from './DateHeaderRow'
import { StaffRow } from './StaffRow'

const STAFF_COL_WIDTH = '120px'
const DATE_COL_MIN_WIDTH = '80px'

const DUMMY_BALANCE_STATUSES = ['shortage', 'just', 'surplus'] as const
const DUMMY_BALANCE_DIFFS = [-2, 0, 1] as const

interface ShiftGridProps {
  dates: DateCell[]
  members: Staff[]
  shifts: Shift[]
  closedDays?: DayOfWeek[]
}

export function ShiftGrid({ dates, members, shifts, closedDays = [] }: ShiftGridProps) {
  const gridTemplateColumns = `${STAFF_COL_WIDTH} repeat(${dates.length}, minmax(${DATE_COL_MIN_WIDTH}, 1fr))`
  const shiftMap = groupShiftsByStaffAndDate(shifts)

  return (
    <div className="overflow-x-auto bg-gray-50">
      <div className="w-max min-w-full border-t border-l border-gray-200">
        <DateHeaderRow dates={dates} gridTemplateColumns={gridTemplateColumns} closedDays={closedDays} />
        <div className="grid" style={{ gridTemplateColumns }}>
          <div className="border-r-2 border-b border-gray-300" />
          {dates.map((cell, index) => (
            <div key={cell.date.toISOString()} className="border-r border-b border-gray-200">
              <BalanceBar
                status={DUMMY_BALANCE_STATUSES[index % DUMMY_BALANCE_STATUSES.length]}
                diff={DUMMY_BALANCE_DIFFS[index % DUMMY_BALANCE_DIFFS.length]}
              />
            </div>
          ))}
        </div>
        {members.map((member, index) => (
          <StaffRow
            key={member.id}
            member={member}
            dates={dates}
            staffShifts={shiftMap[member.id] ?? {}}
            gridTemplateColumns={gridTemplateColumns}
            isEven={index % 2 === 0}
            closedDays={closedDays}
          />
        ))}
      </div>
    </div>
  )
}
