type BalanceStatus = 'shortage' | 'just' | 'surplus'

interface BalanceBarProps {
  status: BalanceStatus
  diff: number
}

const STATUS_COLORS: Record<BalanceStatus, string> = {
  shortage: 'bg-red-500',
  just: 'bg-green-500',
  surplus: 'bg-blue-500',
}

function formatDiff(status: BalanceStatus, diff: number): string {
  if (status === 'just') return 'OK'
  if (status === 'shortage') return `▲${Math.abs(diff)}`
  return `+${diff}`
}

export function BalanceBar({ status, diff }: BalanceBarProps) {
  return (
    <div className={`h-5 ${STATUS_COLORS[status]} flex items-center justify-center`}>
      <span className="text-[10px] text-white">{formatDiff(status, diff)}</span>
    </div>
  )
}
