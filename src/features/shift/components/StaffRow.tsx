import { format } from 'date-fns'
import { cn } from "@/lib/utils";
import type { DateCell, DayOfWeek, Shift, Staff } from "../types";
import { ShiftCell } from "./ShiftCell";

interface StaffRowProps {
  member: Staff;
  dates: DateCell[];
  staffShifts: { [dateKey: string]: Shift[] };
  gridTemplateColumns: string;
  isEven: boolean;
  closedDays?: DayOfWeek[];
}

export function StaffRow({
  member,
  dates,
  staffShifts,
  gridTemplateColumns,
  isEven,
  closedDays = [],
}: StaffRowProps) {
  return (
    <div
      className={cn(
        "grid border-b border-gray-200",
        isEven ? "bg-white" : "bg-gray-50",
      )}
      style={{ gridTemplateColumns }}
    >
      <div className="h-16 px-3 border-r-2 border-gray-300 flex flex-col justify-center gap-0.5 min-w-0">
        <span className="text-xs font-medium text-gray-900 truncate">
          {member.name}
        </span>
        {member.position && (
          <span className="text-[10px] text-gray-500 truncate">
            {member.position}
          </span>
        )}
      </div>
      {dates.map((cell) => {
        const dateKey = format(cell.date, 'yyyy-MM-dd')
        const shift = staffShifts[dateKey]?.[0]
        return (
          <ShiftCell
            key={cell.date.toISOString()}
            staffId={member.id}
            date={cell.date}
            shift={shift}
            isClosed={closedDays.includes(cell.dayOfWeek)}
          />
        )
      })}
    </div>
  );
}
