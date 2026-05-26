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

export interface Shift {
  id: number;
  staffId: number;
  startAt: string;
  endAt: string;
  state: ShiftState;
  // 17.6.4 でポジション別カラー体系（hall/kitchen/register/other）を実装する際に参照する
  positionId?: number;
  memo?: string;
}
