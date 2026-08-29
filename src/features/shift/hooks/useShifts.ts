import { queryOptions, useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { fetchShifts } from '../api/shifts';
import type { ShiftPeriod } from '../types';

const ONE_MINUTE = 60 * 1000;

export const shiftQueryKeys = {
  all: ['shifts'] as const,
  list: (from: string, to: string) => ['shifts', { from, to }] as const,
};

export const shiftsQueryOptions = (from: string, to: string) =>
  queryOptions({
    queryKey: shiftQueryKeys.list(from, to),
    queryFn: () => fetchShifts(from, to),
    staleTime: ONE_MINUTE,
    gcTime: 5 * ONE_MINUTE,
  });

export const useShifts = (period: ShiftPeriod) => {
  const from = format(period.from, 'yyyy-MM-dd');
  const to = format(period.to, 'yyyy-MM-dd');
  return useQuery(shiftsQueryOptions(from, to));
};
