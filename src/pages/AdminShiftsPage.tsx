import { ShiftGrid } from '../features/shift/components/ShiftGrid'
import { generateDateRange } from '../features/shift/utils/generateDateRange'
import type { ShiftPeriod, StaffRow } from '../features/shift/types'

const DUMMY_PERIOD: ShiftPeriod = {
  from: new Date(2026, 3, 1),
  to: new Date(2026, 3, 15),
}

const DUMMY_STAFF: StaffRow[] = [
  { id: 1, name: '田中 太郎' },
  { id: 2, name: '佐藤 花子' },
  { id: 3, name: '鈴木 一郎' },
  { id: 4, name: '高橋 美咲' },
  { id: 5, name: '渡辺 健太' },
]

export function AdminShiftsPage() {
  const dates = generateDateRange(DUMMY_PERIOD)

  return (
    <ShiftGrid dates={dates} staffRows={DUMMY_STAFF} />
  )
}
