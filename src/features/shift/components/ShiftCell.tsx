import type { ShiftData } from '../types'

interface ShiftCellProps {
  staffId: number
  date: Date
  shift?: ShiftData
}

export function ShiftCell({ staffId: _staffId, date: _date, shift: _shift }: ShiftCellProps) {
  return (
    <div className="h-16 border-r border-gray-200 hover:bg-gray-100 cursor-pointer" />
  )
}
