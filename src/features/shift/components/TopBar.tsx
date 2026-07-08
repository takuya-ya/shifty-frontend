import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { PeriodLabel } from './PeriodLabel'
import type { ShiftPeriod } from '../types'

interface TopBarProps {
  period: ShiftPeriod
  onPrev: () => void
  onNext: () => void
  onToday: () => void
  showBalanceBar: boolean
  onBalanceBarToggle: (value: boolean) => void
}

export function TopBar({
  period,
  onPrev,
  onNext,
  onToday,
  showBalanceBar,
  onBalanceBarToggle,
}: TopBarProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        <div />

        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" onClick={onPrev} aria-label="前の半月">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <PeriodLabel period={period} />
          <Button variant="outline" size="icon" onClick={onNext} aria-label="次の半月">
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button variant="outline" onClick={onToday}>
            今日
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="balance-bar"
            checked={showBalanceBar}
            onCheckedChange={onBalanceBarToggle}
          />
          <label htmlFor="balance-bar" className="text-sm text-gray-700 cursor-pointer">
            人員バランスバー
          </label>
        </div>
      </div>
    </div>
  )
}
