import { get } from '../../../shared/api/client';
import { parseJsonOrThrow } from '../../../shared/api/error';
import type { StaffProfile } from '../types';

export const fetchStaffs = async (): Promise<StaffProfile[]> => {
  const response = await get('/api/v1/staffs');
  const body = await parseJsonOrThrow<{ data: StaffProfile[] }>(response, 'スタッフ一覧の取得に失敗しました');
  return body.data;
};
