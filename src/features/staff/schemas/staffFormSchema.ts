import { z } from 'zod'

export const staffFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, '氏名を入力してください')
    .max(255, '氏名は255文字以内で入力してください'),
  positionIds: z.array(z.number()).min(1, 'ポジションを選択してください'),
  hourlyWage: z
    .number('時給を入力してください')
    .int('時給は整数で入力してください')
    .min(0, '時給は0円以上で入力してください')
    .max(5000, '時給は5000円以下で入力してください'),
  isStudent: z.boolean(),
  memo: z.string().max(1000, 'メモは1000文字以内で入力してください').optional(),
})

export type StaffFormValues = z.infer<typeof staffFormSchema>
