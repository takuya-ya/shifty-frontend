import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '../components/ui/button'
import { PeriodLabel } from '../features/shift/components/PeriodLabel'
import { ShiftEditModal } from '../features/shift/components/ShiftEditModal'
import { ShiftGrid } from '../features/shift/components/ShiftGrid'
import { useShifts } from '../features/shift/hooks/useShifts'
import { usePeriodNavigation } from '../features/shift/hooks/usePeriodNavigation'
import { generateDateRange } from '../features/shift/utils/generateDateRange'
import type { DayOfWeek, SelectedCell, Staff } from '../features/shift/types'

const DUMMY_STAFF: Staff[] = [
  { id: 1, name: '田中 太郎', position: '店長' },
  { id: 2, name: '佐藤 花子', position: 'ホール' },
  { id: 3, name: '鈴木 一郎', position: 'キッチン' },
  { id: 4, name: '高橋 美咲', position: 'ホール' },
  { id: 5, name: '渡辺 健太', position: 'キッチン' },
]

// Phase1ダミー: 日曜（0）を定休日として設定（設定API接続タスクで差し替え）
const CLOSED_DAYS: DayOfWeek[] = [0]

export function AdminShiftsPage() {
  const { period, goToPrev, goToNext } = usePeriodNavigation()
  const dates = generateDateRange(period)
  const { data: shifts, isPending, isError } = useShifts(period)
  const [selectedCell, setSelectedCell] = useState<SelectedCell | null>(null)

  function handleCellClick(cell: SelectedCell) {
    setSelectedCell(cell)
  }

  function handleModalClose() {
    setSelectedCell(null)
  }

  return (
    <div className="flex flex-col h-full">
      {/* TopBar エリア: 18.6 で TopBar コンポーネントに置き換え */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-center gap-3">
          <Button variant="outline" size="icon" onClick={goToPrev} aria-label="前の半月">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <PeriodLabel period={period} />
          <Button variant="outline" size="icon" onClick={goToNext} aria-label="次の半月">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* カレンダーエリア: 残りの高さを全て使い、溢れたらここだけスクロール */}
      <div className="flex-1 overflow-auto">
        {isPending && <p className="text-center text-sm text-gray-500 py-8">読み込み中...</p>}
        {isError && <p className="text-center text-sm text-red-500 py-8">シフトの取得に失敗しました</p>}
        {!isPending && !isError && (
          <ShiftGrid dates={dates} members={DUMMY_STAFF} shifts={shifts ?? []} closedDays={CLOSED_DAYS} onCellClick={handleCellClick} />
        )}
      </div>

      {selectedCell && (
        <ShiftEditModal
          open={!!selectedCell}
          onOpenChange={(open) => { if (!open) handleModalClose() }}
          staffName={selectedCell.staffName}
          date={selectedCell.date}
          shift={selectedCell.shift}
        />
      )}
    </div>
  )
}
