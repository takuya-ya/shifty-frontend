export interface ShiftPeriod {
  from: Date;
  to: Date;
}

export interface DateCell {
  date: Date;
  dayOfWeek: number;
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
