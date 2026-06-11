import type { ShiftState } from '../types'

type PositionColorSet = {
  confirmed: string
  draft: string
}

const POSITION_COLORS: Partial<Record<string, PositionColorSet>> = {
  ホール: {
    confirmed: 'bg-blue-500 text-white',
    draft: 'bg-blue-200 text-gray-800 border border-blue-400',
  },
  キッチン: {
    confirmed: 'bg-green-500 text-white',
    draft: 'bg-green-200 text-gray-800 border border-green-400',
  },
}

const OTHER_COLORS: PositionColorSet = {
  confirmed: 'bg-slate-400 text-white',
  draft: 'bg-slate-200 text-gray-800 border border-slate-400',
}

export function getShiftColorClasses(state: ShiftState, positionName?: string): string {
  const colorSet: PositionColorSet =
    (positionName !== undefined ? POSITION_COLORS[positionName] : undefined) ?? OTHER_COLORS
  return colorSet[state]
}
