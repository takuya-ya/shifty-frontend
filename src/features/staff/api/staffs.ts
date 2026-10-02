import { get, post } from '../../../shared/api/client';
import { parseJsonOrThrow } from '../../../shared/api/error';
import type { StaffFormValues } from '../schemas/staffFormSchema';
import type { StaffProfile } from '../types';

export const fetchStaffs = async (): Promise<StaffProfile[]> => {
  const response = await get('/api/v1/staffs');
  const body = await parseJsonOrThrow<{ data: StaffProfile[] }>(response, 'スタッフ一覧の取得に失敗しました');
  return body.data;
};

export const createStaff = async (values: StaffFormValues): Promise<StaffProfile> => {
  const response = await post('/api/v1/staffs', {
    name: values.name,
    position_ids: values.positionIds,
    hourly_wage: values.hourlyWage,
    is_student: values.isStudent,
    memo: values.memo,
  });
  const body = await parseJsonOrThrow<{ data: StaffProfile }>(response, 'スタッフの登録に失敗しました');
  return body.data;
};
