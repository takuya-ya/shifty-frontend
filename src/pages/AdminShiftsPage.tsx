import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '../components/ui/button'
import { PeriodLabel } from '../features/shift/components/PeriodLabel'
import { ShiftGrid } from '../features/shift/components/ShiftGrid'
import { usePeriodNavigation } from '../features/shift/hooks/usePeriodNavigation'
import { generateDateRange } from '../features/shift/utils/generateDateRange'
import type { DayOfWeek, Shift, Staff } from '../features/shift/types'

const DUMMY_STAFF: Staff[] = [
  { id: 1, name: '田中 太郎', position: '店長' },
  { id: 2, name: '佐藤 花子', position: 'ホール' },
  { id: 3, name: '鈴木 一郎', position: 'キッチン' },
  { id: 4, name: '高橋 美咲', position: 'ホール' },
  { id: 5, name: '渡辺 健太', position: 'キッチン' },
]

// Phase1ダミー: 17.5 のAPI接続時に削除する
const DUMMY_SHIFTS: Shift[] = [
  { id: 1, staffId: 1, startAt: '2026-06-01T00:00:00Z', endAt: '2026-06-01T09:00:00Z', state: 'draft' },
  { id: 2, staffId: 1, startAt: '2026-06-03T00:00:00Z', endAt: '2026-06-03T09:00:00Z', state: 'confirmed' },
  { id: 3, staffId: 2, startAt: '2026-06-02T01:00:00Z', endAt: '2026-06-02T10:00:00Z', state: 'draft' },
  { id: 4, staffId: 2, startAt: '2026-06-04T01:00:00Z', endAt: '2026-06-04T10:00:00Z', state: 'draft' },
  { id: 5, staffId: 3, startAt: '2026-06-01T00:00:00Z', endAt: '2026-06-01T06:00:00Z', state: 'draft' },
  { id: 6, staffId: 4, startAt: '2026-06-05T02:00:00Z', endAt: '2026-06-05T11:00:00Z', state: 'draft' },
]

// Phase1ダミー: 日曜（0）を定休日として設定（タスク17でAPIデータに差し替え）
const CLOSED_DAYS: DayOfWeek[] = [0]

export function AdminShiftsPage() {
  const { period, goToPrev, goToNext } = usePeriodNavigation()
  const dates = generateDateRange(period)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center gap-3">
        <Button variant="outline" size="icon" onClick={goToPrev} aria-label="前の半月">
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <PeriodLabel period={period} />
        <Button variant="outline" size="icon" onClick={goToNext} aria-label="次の半月">
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
      <ShiftGrid dates={dates} members={DUMMY_STAFF} shifts={DUMMY_SHIFTS} closedDays={CLOSED_DAYS} />
    </div>
  )
}
