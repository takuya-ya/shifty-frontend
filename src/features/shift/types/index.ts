export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface ShiftPeriod {
  from: Date;
  to: Date;
}

export interface DateCell {
  date: Date;
  dayOfWeek: DayOfWeek;
}

export interface Staff {
  id: number;
  name: string;
  position?: string;
}

export type ShiftState = "draft" | "confirmed";

export type BalanceStatus = "shortage" | "just" | "surplus";

export interface ApiShiftResponse {
  id: number;
  staff_id: number;
  start_at: string;
  end_at: string;
  break_start_at: string | null;
  break_end_at: string | null;
  shift_state: ShiftState;
  position: { id: number; name: string } | null;
  memo: string | null;
  staff_profile?: { name: string };
}

export interface Shift {
  id: number;
  staffId: number;
  startAt: string;
  endAt: string;
  breakStartAt?: string;
  breakEndAt?: string;
  state: ShiftState;
  positionId?: number;
  positionName?: string;
  memo?: string;
}

export interface SelectedCell {
  staffId: number;
  staffName: string;
  date: Date;
  shift?: Shift;
}
