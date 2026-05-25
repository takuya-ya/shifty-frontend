import { cn } from "@/lib/utils";
import type { Shift } from "../types";
import { ShiftBlock } from "./ShiftBlock";

interface ShiftCellProps {
  // TODO: API接続タスク（Phase1）でシフト登録モーダルを開く際に使用
  staffId: number;
  // TODO: API接続タスク（Phase1）でシフト登録モーダルを開く際に使用
  date: Date;
  shift?: Shift;
  isClosed?: boolean;
}

export function ShiftCell({
  staffId: _staffId,
  date: _date,
  shift,
  isClosed = false,
}: ShiftCellProps) {
  return (
    // TODO: タスク 18.1.1 で onClick にシフト登録モーダルを開くハンドラを渡す
    <button
      type="button"
      disabled={isClosed}
      className={cn(
        "h-16 w-full border-r border-gray-200 p-0.5",
        isClosed
          ? "bg-gray-100 cursor-not-allowed"
          : "hover:bg-gray-100 cursor-pointer",
      )}
    >
      {shift && <ShiftBlock shift={shift} />}
    </button>
  );
}
