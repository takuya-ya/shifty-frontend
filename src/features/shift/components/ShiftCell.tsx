import { cn } from "@/lib/utils";
import type { Shift } from "../types";

interface ShiftCellProps {
  // TODO: API接続タスク（Phase1）でシフト登録モーダルを開く際に使用
  staffId: number;
  // TODO: API接続タスク（Phase1）でシフト登録モーダルを開く際に使用
  date: Date;
  // TODO: シフトデータ表示タスク（Phase1）でセル内に開始・終了時刻を描画する際に使用
  shift?: Shift;
  isClosed?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ShiftCell({
  staffId: _staffId,
  date: _date,
  shift: _shift,
  isClosed = false,
}: ShiftCellProps) {
  return (
    // TODO: タスク 18.1.1 で onClick にシフト登録モーダルを開くハンドラを渡す
    <button
      type="button"
      disabled={isClosed}
      className={cn(
        "h-16 w-full border-r border-gray-200",
        isClosed
          ? "bg-gray-100 cursor-not-allowed"
          : "hover:bg-gray-100 cursor-pointer",
      )}
    />
  );
}
