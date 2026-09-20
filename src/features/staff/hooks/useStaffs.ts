import { queryOptions, useQuery } from '@tanstack/react-query';
import { fetchStaffs } from '../api/staffs';

const ONE_HOUR = 60 * 60 * 1000;

export const staffQueryKeys = {
  all: ['staffs'] as const,
};

export const staffsQueryOptions = () =>
  queryOptions({
    queryKey: staffQueryKeys.all,
    queryFn: fetchStaffs,
    // スタッフ情報は変更頻度が低いため、自動再フェッチを抑制
    staleTime: ONE_HOUR,
  });

export const useStaffs = () => useQuery(staffsQueryOptions());
