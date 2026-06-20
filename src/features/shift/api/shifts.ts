import { get } from '../../../shared/api/client';
import { fetchJson } from '../../../shared/api/error';
import type { ApiShiftResponse, Shift } from '../types';

const toShift = (raw: ApiShiftResponse): Shift => ({
  id: raw.id,
  staffId: raw.staff_id,
  staffName: raw.staff_profile?.name ?? '',
  startAt: raw.start_at,
  endAt: raw.end_at,
  state: raw.shift_state,
  positionName: raw.position?.name ?? undefined,
  memo: raw.memo ?? undefined,
});

export const fetchShifts = async (from: string, to: string): Promise<Shift[]> => {
  const params = new URLSearchParams({ from, to });
  const response = await get(`/api/v1/shifts?${params}`);
  const body = await fetchJson<{ data: ApiShiftResponse[] }>(response, 'シフトの取得に失敗しました');
  return body.data.map(toShift);
};
