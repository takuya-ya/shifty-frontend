import { get, post, put } from '@/shared/api/client';
import { parseJsonOrThrow } from '@/shared/api/error';
import type { StaffFormValues } from '../schemas/staffFormSchema';
import type { StaffProfile } from '../types';

interface StaffProfileResponse {
  id: number;
  name: string;
  hourly_wage: number | null;
  is_student: boolean | null;
  memo: string | null;
  positions: { id: number; name: string }[];
}

export const fetchStaffs = async (): Promise<StaffProfile[]> => {
  const response = await get('/api/v1/staffs');
  const body = await parseJsonOrThrow<{ data: StaffProfileResponse[] }>(response, 'スタッフ一覧の取得に失敗しました');
  return body.data.map((staff) => ({
    ...staff,
    hourly_wage: staff.hourly_wage ?? 0,
    is_student: staff.is_student ?? false,
    memo: staff.memo ?? '',
  }));
};

interface StaffRequest {
  name: string;
  position_ids: number[];
  hourly_wage: number;
  is_student: boolean;
  memo: string | null;
}

export const createStaff = async (values: StaffFormValues): Promise<StaffProfile> => {
  const response = await post<StaffRequest>('/api/v1/staffs', {
    name: values.name,
    position_ids: values.positionIds,
    hourly_wage: values.hourlyWage,
    is_student: values.isStudent,
    memo: values.memo || null,
  });
  const body = await parseJsonOrThrow<{ data: StaffProfile }>(response, 'スタッフの登録に失敗しました');
  return body.data;
};

export const updateStaff = async (id: number, values: StaffFormValues): Promise<void> => {
  const response = await put<StaffRequest>(`/api/v1/staffs/${id}`, {
    name: values.name,
    position_ids: values.positionIds,
    hourly_wage: values.hourlyWage,
    is_student: values.isStudent,
    memo: values.memo || null,
  });
  await parseJsonOrThrow<unknown>(response, 'スタッフの更新に失敗しました');
};
