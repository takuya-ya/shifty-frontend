import { cn } from "@/lib/utils";
import type { DateCell, DayOfWeek, Shift, Staff } from "../types";
import { ShiftCell } from "./ShiftCell";

// TODO: 17.3 完了後に削除する
const DUMMY_SHIFT: Shift = {
  id: 1,
  staffId: 1,
  date: "2026-05-01",
  startTime: "09:00",
  endTime: "18:00",
  state: "draft",
};

interface StaffRowProps {
  member: Staff;
  dates: DateCell[];
  gridTemplateColumns: string;
  isEven: boolean;
  closedDays?: DayOfWeek[];
}

export function StaffRow({
  member,
  dates,
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
      {dates.map((cell, index) => (
        <ShiftCell
          key={cell.date.toISOString()}
          staffId={member.id}
          date={cell.date}
          // TODO: 17.3 完了後に実データへ切り替える
          shift={index === 0 && member.id === 1 ? DUMMY_SHIFT : undefined}
          isClosed={closedDays.includes(cell.dayOfWeek)}
        />
      ))}
    </div>
  );
}
