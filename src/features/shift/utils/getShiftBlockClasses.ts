import type { ShiftState } from '../types'

export function getShiftBlockClasses(state: ShiftState): string {
  if (state === 'confirmed') {
    return 'bg-blue-500 text-white'
  }
  return 'bg-blue-200 text-gray-800 border border-blue-400'
}
