import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '../components/ui/button'
import { PeriodLabel } from '../features/shift/components/PeriodLabel'
import { ShiftGrid } from '../features/shift/components/ShiftGrid'
import { usePeriodNavigation } from '../features/shift/hooks/usePeriodNavigation'
import { generateDateRange } from '../features/shift/utils/generateDateRange'
import type { StaffRow } from '../features/shift/types'

const DUMMY_STAFF: StaffRow[] = [
  { id: 1, name: '田中 太郎' },
  { id: 2, name: '佐藤 花子' },
  { id: 3, name: '鈴木 一郎' },
  { id: 4, name: '高橋 美咲' },
  { id: 5, name: '渡辺 健太' },
]

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
      <ShiftGrid dates={dates} staffRows={DUMMY_STAFF} />
    </div>
  )
}
