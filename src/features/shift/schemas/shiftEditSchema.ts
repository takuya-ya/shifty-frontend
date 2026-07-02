import { z } from 'zod'

const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/

const timeField = z.string().regex(TIME_PATTERN, '有効な時刻を入力してください')

const optionalTimeField = timeField
  .or(z.literal(''))
  .transform((value) => (value === '' ? undefined : value))

export const shiftEditSchema = z
  .object({
    positionId: z.string().min(1, 'ポジションを選択してください'),
    startTime: timeField,
    endTime: timeField,
    breakStartTime: optionalTimeField,
    breakEndTime: optionalTimeField,
    memo: z.string().optional(),
  })
  .refine((data) => data.endTime > data.startTime, {
    message: '退勤時間は出勤時間より後にしてください',
    path: ['endTime'],
    abort: true,
  })
  .refine(
    (data) => (data.breakStartTime === undefined) === (data.breakEndTime === undefined),
    {
      message: '休憩開始と休憩終了は両方入力してください',
      path: ['breakStartTime'],
    },
  )
  .refine(
    (data) => {
      if (!data.breakStartTime) return true
      return data.breakStartTime >= data.startTime && data.breakStartTime < data.endTime
    },
    {
      message: '休憩開始は勤務時間内にしてください',
      path: ['breakStartTime'],
    },
  )
  .refine(
    (data) => {
      if (!data.breakStartTime || !data.breakEndTime) return true
      return data.breakEndTime > data.breakStartTime
    },
    {
      message: '休憩終了は休憩開始より後にしてください',
      path: ['breakEndTime'],
    },
  )
  .refine(
    (data) => {
      if (!data.breakEndTime) return true
      return data.breakEndTime <= data.endTime
    },
    {
      message: '休憩終了は退勤時間以前にしてください',
      path: ['breakEndTime'],
    },
  )

export type ShiftEditFormInput = z.input<typeof shiftEditSchema>
export type ShiftEditFormValues = z.infer<typeof shiftEditSchema>
