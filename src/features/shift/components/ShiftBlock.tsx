import { format, parseISO } from "date-fns";
import type { Shift } from "../types";
import { getShiftBlockClasses } from "../utils/getShiftBlockClasses";

interface ShiftBlockProps {
  shift: Shift;
}

export function ShiftBlock({ shift }: ShiftBlockProps) {
  const timeLabel = `${format(parseISO(shift.startAt), "HH:mm")}〜${format(parseISO(shift.endAt), "HH:mm")}`;
  const colorClasses = getShiftBlockClasses(shift.state);

  return (
    <div
      className={`w-full h-full rounded-md flex items-center justify-center px-1.5 ${colorClasses}`}
    >
      <span className="text-xs whitespace-nowrap">{timeLabel}</span>
    </div>
  );
}
