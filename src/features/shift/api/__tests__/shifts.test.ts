import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchShifts, createShift, updateShift } from '../shifts';

vi.mock('../../../../shared/api/client', () => ({
  get: vi.fn(),
  post: vi.fn(),
  patch: vi.fn(),
}));

import { get, post, patch } from '../../../../shared/api/client';

const mockGet = vi.mocked(get);
const mockPost = vi.mocked(post);
const mockPatch = vi.mocked(patch);

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

const sampleApiResponse = {
  id: 1,
  staff_id: 2,
  start_at: '2026-06-01T09:00:00+09:00',
  end_at: '2026-06-01T18:00:00+09:00',
  shift_state: 'draft' as const,
  position: { id: 1, name: 'ホール' },
  memo: 'メモ',
  break_start_at: null,
  break_end_at: null,
};

describe('createShift', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('POST /api/v1/shifts に staff_id とペイロードを送信し、変換された Shift を返す', async () => {
    mockPost.mockResolvedValue(makeSuccessResponse(sampleApiResponse));

    const payload = {
      position_id: 1,
      start_at: '2026-06-01 09:00:00',
      end_at: '2026-06-01 18:00:00',
      break_start_at: null,
      break_end_at: null,
      memo: null,
    };
    const result = await createShift(2, payload);

    expect(mockPost).toHaveBeenCalledWith('/api/v1/shifts', { staff_id: 2, ...payload });
    expect(result.id).toBe(1);
    expect(result.staffId).toBe(2);
    expect(result.positionName).toBe('ホール');
  });
});

describe('updateShift', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('PATCH /api/v1/shifts/{id} にペイロードを送信し、変換された Shift を返す', async () => {
    mockPatch.mockResolvedValue(makeSuccessResponse(sampleApiResponse));

    const payload = {
      position_id: 1,
      start_at: '2026-06-01 10:00:00',
      end_at: '2026-06-01 19:00:00',
      break_start_at: null,
      break_end_at: null,
      memo: null,
    };
    const result = await updateShift(1, payload);

    expect(mockPatch).toHaveBeenCalledWith('/api/v1/shifts/1', payload);
    expect(result.id).toBe(1);
    expect(result.staffId).toBe(2);
  });
});
