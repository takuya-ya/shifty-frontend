import type { ShiftData } from '../types'

interface ShiftCellProps {
  // TODO: API接続タスク（Phase1）でシフト登録モーダルを開く際に使用
  staffId: number
  // TODO: API接続タスク（Phase1）でシフト登録モーダルを開く際に使用
  date: Date
  // TODO: シフトデータ表示タスク（Phase1）でセル内に開始・終了時刻を描画する際に使用
  shift?: ShiftData
}

export function ShiftCell({ staffId: _staffId, date: _date, shift: _shift }: ShiftCellProps) {
  return (
    <div className="h-16 border-r border-gray-200 hover:bg-gray-100 cursor-pointer" />
  )
}
