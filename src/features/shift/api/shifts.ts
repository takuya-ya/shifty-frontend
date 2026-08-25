import { del, get, patch, post } from '../../../shared/api/client';
import { fetchJson, throwIfNotOk } from '../../../shared/api/error';
import type { ApiShiftResponse, Shift } from '../types';
import type { ShiftPayload } from '../utils/toShiftPayload';

const toShift = (raw: ApiShiftResponse): Shift => ({
  id: raw.id,
  staffId: raw.staff_id,
  startAt: raw.start_at,
  endAt: raw.end_at,
  breakStartAt: raw.break_start_at ?? undefined,
  breakEndAt: raw.break_end_at ?? undefined,
  state: raw.shift_state,
  positionId: raw.position?.id ?? undefined,
  positionName: raw.position?.name ?? undefined,
  memo: raw.memo ?? undefined,
});

export const fetchShifts = async (from: string, to: string): Promise<Shift[]> => {
  const params = new URLSearchParams({ from, to });
  const response = await get(`/api/v1/shifts?${params}`);
  const body = await fetchJson<{ data: ApiShiftResponse[] }>(response, 'シフトの取得に失敗しました');
  return body.data.map(toShift);
};

export const createShift = async (staffId: number, payload: ShiftPayload): Promise<Shift> => {
  const response = await post('/api/v1/shifts', { staff_id: staffId, ...payload });
  const body = await fetchJson<{ data: ApiShiftResponse }>(response, 'シフトの作成に失敗しました');
  return toShift(body.data);
};

export const updateShift = async (shiftId: number, payload: ShiftPayload): Promise<Shift> => {
  const response = await patch(`/api/v1/shifts/${shiftId}`, payload);
  const body = await fetchJson<{ data: ApiShiftResponse }>(response, 'シフトの更新に失敗しました');
  return toShift(body.data);
};

export const deleteShift = async (shiftId: number): Promise<void> => {
  const response = await del(`/api/v1/shifts/${shiftId}`);
  await throwIfNotOk(response, 'シフトの削除に失敗しました');
};
