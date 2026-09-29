import { z } from 'zod'

export const staffFormSchema = z.object({
  name: z.string().min(1, '氏名を入力してください').max(255),
  positionIds: z.array(z.number()).min(1, 'ポジションを選択してください'),
  hourlyWage: z.number().int().min(0).max(5000),
  isStudent: z.boolean(),
  memo: z.string().max(1000).optional(),
})

export type StaffFormValues = z.infer<typeof staffFormSchema>
