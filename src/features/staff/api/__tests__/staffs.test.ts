import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchStaffs, updateStaff } from '../staffs';
import type { StaffFormValues } from '../../schemas/staffFormSchema';

vi.mock('@/shared/api/client', () => ({
  get: vi.fn(),
  put: vi.fn(),
}));

import { get, put } from '@/shared/api/client';

const mockGet = vi.mocked(get);
const mockPut = vi.mocked(put);

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

describe('updateStaff', () => {
  const staffId = 1;
  const formValues: StaffFormValues = {
    name: '山田太郎',
    positionIds: [1, 2],
    hourlyWage: 1300,
    isStudent: true,
    memo: '週3日勤務',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('PUT /api/v1/staffs/{id} に snake_case の body を送る', async () => {
    const updatedStaff = {
      id: staffId,
      name: '山田太郎',
      hourly_wage: 1300,
      is_student: true,
      memo: '週3日勤務',
      positions: [
        { id: 1, name: 'ホール' },
        { id: 2, name: 'キッチン' },
      ],
    };
    mockPut.mockResolvedValue(makeSuccessResponse(updatedStaff));

    await updateStaff(staffId, formValues);

    expect(mockPut).toHaveBeenCalledWith('/api/v1/staffs/1', {
      name: '山田太郎',
      position_ids: [1, 2],
      hourly_wage: 1300,
      is_student: true,
      memo: '週3日勤務',
    });
  });

  it('レスポンスが失敗のとき ApiError をスローする', async () => {
    mockPut.mockResolvedValue(
      new Response(JSON.stringify({}), { status: 500 }),
    );

    await expect(updateStaff(staffId, formValues)).rejects.toMatchObject({
      message: 'スタッフの更新に失敗しました',
      status: 500,
    });
  });
});
