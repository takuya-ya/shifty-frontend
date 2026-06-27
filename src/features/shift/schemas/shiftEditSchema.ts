import { z } from 'zod'

const timePattern = /^\d{2}:\d{2}$/

const timeField = z.string().regex(timePattern, '時刻を選択してください')

export const shiftEditSchema = z
  .object({
    positionId: z.string().min(1, 'ポジションを選択してください'),
    startTime: timeField,
    endTime: timeField,
    breakStartTime: timeField,
    breakEndTime: timeField,
    memo: z.string().optional(),
  })
  .refine((data) => data.endTime > data.startTime, {
    message: '退勤時間は出勤時間より後にしてください',
    path: ['endTime'],
  })
  .refine(
    (data) =>
      data.breakStartTime >= data.startTime &&
      data.breakStartTime < data.endTime,
    {
      message: '休憩開始は勤務時間内にしてください',
      path: ['breakStartTime'],
    },
  )
  .refine((data) => data.breakEndTime > data.breakStartTime, {
    message: '休憩終了は休憩開始より後にしてください',
    path: ['breakEndTime'],
  })
  .refine(
    (data) => data.breakEndTime <= data.endTime,
    {
      message: '休憩終了は退勤時間以前にしてください',
      path: ['breakEndTime'],
    },
  )

export type ShiftEditFormValues = z.infer<typeof shiftEditSchema>
