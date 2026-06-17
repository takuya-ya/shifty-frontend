import { cn } from "@/lib/utils";
import type { SelectedCell, Shift } from "../types";
import { ShiftBlock } from "./ShiftBlock";

interface ShiftCellProps {
  staffId: number;
  date: Date;
  shift?: Shift;
  isClosed?: boolean;
  onCellClick?: (cell: SelectedCell) => void;
}

export function ShiftCell({
  staffId,
  date,
  shift,
  isClosed = false,
  onCellClick,
}: ShiftCellProps) {
  function handleClick() {
    if (isClosed) return;
    onCellClick?.({ staffId, date, shiftId: shift?.id });
  }

  return (
    <button
      type="button"
      disabled={isClosed}
      onClick={handleClick}
      className={cn(
        "h-16 w-full border-r border-gray-200 p-0.5",
        isClosed
          ? "bg-gray-100 cursor-not-allowed"
          : "hover:bg-gray-100 cursor-pointer transition-colors",
      )}
    >
      {shift && <ShiftBlock shift={shift} />}
    </button>
  );
}
