import { format } from 'date-fns'
import type { ShiftEditFormValues } from '../schemas/shiftEditSchema'

export interface ShiftPayload {
  position_id: number
  start_at: string
  end_at: string
  break_start_at: string
  break_end_at: string
  memo: string | null
}

function toDateTime(date: Date, time: string): string {
  return `${format(date, 'yyyy-MM-dd')}T${time}:00`
}

export function toShiftPayload(values: ShiftEditFormValues, date: Date): ShiftPayload {
  return {
    position_id: Number(values.positionId),
    start_at: toDateTime(date, values.startTime),
    end_at: toDateTime(date, values.endTime),
    break_start_at: toDateTime(date, values.breakStartTime),
    break_end_at: toDateTime(date, values.breakEndTime),
    memo: values.memo ? values.memo : null,
  }
}
