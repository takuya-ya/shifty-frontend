export interface StaffProfile {
  id: number
  name: string
  hourly_wage: number
  is_student: boolean
  memo: string
  positions: { id: number; name: string }[]
}
