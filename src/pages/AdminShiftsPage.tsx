import { useState } from 'react'
import { ShiftEditModal } from '../features/shift/components/ShiftEditModal'
import { ShiftGrid } from '../features/shift/components/ShiftGrid'
import { TopBar } from '../features/shift/components/TopBar'
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
  const { period, goToPrev, goToNext, goToToday } = usePeriodNavigation()
  const dates = generateDateRange(period)
  const { data: shifts, isPending, isError } = useShifts(period)
  const [selectedCell, setSelectedCell] = useState<SelectedCell | null>(null)
  const [showBalanceBar, setShowBalanceBar] = useState(true)

  function handleCellClick(cell: SelectedCell) {
    setSelectedCell(cell)
  }

  function handleModalClose() {
    setSelectedCell(null)
  }

  return (
    <div className="flex flex-col h-full">
      <TopBar
        period={period}
        onPrev={goToPrev}
        onNext={goToNext}
        onToday={goToToday}
        showBalanceBar={showBalanceBar}
        onBalanceBarToggle={setShowBalanceBar}
      />

      <div className="flex-1 overflow-auto">
        {isPending && <p className="text-center text-sm text-gray-500 py-8">読み込み中...</p>}
        {isError && <p className="text-center text-sm text-red-500 py-8">シフトの取得に失敗しました</p>}
        {!isPending && !isError && (
          <ShiftGrid dates={dates} members={DUMMY_STAFF} shifts={shifts ?? []} closedDays={CLOSED_DAYS} showBalanceBar={showBalanceBar} onCellClick={handleCellClick} />
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
