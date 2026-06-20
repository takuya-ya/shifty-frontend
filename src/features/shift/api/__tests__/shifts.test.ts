import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchShifts } from '../shifts';

vi.mock('../../../../shared/api/client', () => ({
  get: vi.fn(),
}));

import { get } from '../../../../shared/api/client';

const mockGet = vi.mocked(get);

const makeSuccessResponse = (data: unknown) =>
  new Response(
    JSON.stringify({ status: 'success', data, message: null, errors: null }),
    { status: 200, headers: { 'Content-Type': 'application/json' } },
  );

describe('fetchShifts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('APIレスポンスの snake_case フィールドが camelCase に変換され null が undefined になる', async () => {
    mockGet.mockResolvedValue(
      makeSuccessResponse([
        {
          id: 1,
          staff_id: 2,
          start_at: '2026-06-01T09:00:00+09:00',
          end_at: '2026-06-01T18:00:00+09:00',
          shift_state: 'draft',
          position: null,
          memo: null,
        },
      ]),
    );

    const result = await fetchShifts('2026-06-01', '2026-06-15');

    expect(result).toEqual([
      {
        id: 1,
        staffId: 2,
        startAt: '2026-06-01T09:00:00+09:00',
        endAt: '2026-06-01T18:00:00+09:00',
        state: 'draft',
        positionName: undefined,
        memo: undefined,
      },
    ]);
  });

  it('position.name があるとき positionName にその値が入る', async () => {
    mockGet.mockResolvedValue(
      makeSuccessResponse([
        {
          id: 1,
          staff_id: 1,
          start_at: '2026-06-01T09:00:00+09:00',
          end_at: '2026-06-01T18:00:00+09:00',
          shift_state: 'confirmed',
          position: { name: 'ホール' },
          memo: null,
        },
      ]),
    );

    const result = await fetchShifts('2026-06-01', '2026-06-15');

    expect(result[0].positionName).toBe('ホール');
  });
});
