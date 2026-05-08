export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6

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

export interface ShiftData {
  id: number;
  staffId: number;
  date: string;
  startTime: string;
  endTime: string;
}
