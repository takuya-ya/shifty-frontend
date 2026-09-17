import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchStaffs } from '../staffs';

vi.mock('@/shared/api/client', () => ({
  get: vi.fn(),
}));

import { get } from '@/shared/api/client';

const mockGet = vi.mocked(get);

const makeSuccessResponse = (data: unknown) =>
  new Response(
    JSON.stringify({ status: 'success', data, message: null, errors: null }),
    { status: 200, headers: { 'Content-Type': 'application/json' } },
  );

describe('fetchStaffs', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('GET /api/v1/staffs を呼び出し、data 配列をそのまま返す', async () => {
    const staffs = [
      {
        id: 1,
        name: '山田太郎',
        hourly_wage: 1200,
        is_student: false,
        memo: '',
        positions: [{ id: 1, name: 'ホール' }],
      },
    ];
    mockGet.mockResolvedValue(makeSuccessResponse(staffs));

    const result = await fetchStaffs();

    expect(mockGet).toHaveBeenCalledWith('/api/v1/staffs');
    expect(result).toEqual(staffs);
  });

  it('レスポンスが失敗のとき ApiError をスローする', async () => {
    mockGet.mockResolvedValue(
      new Response(JSON.stringify({}), { status: 500 }),
    );

    await expect(fetchStaffs()).rejects.toMatchObject({
      message: 'スタッフ一覧の取得に失敗しました',
      status: 500,
    });
  });
});
