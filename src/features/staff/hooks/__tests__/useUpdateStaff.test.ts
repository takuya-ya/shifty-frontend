import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ApiError } from '@/shared/api/error';
import { createWrapper } from '@/test/utils';
import { updateStaff } from '../../api/staffs';
import type { StaffFormValues } from '../../schemas/staffFormSchema';
import { staffQueryKeys } from '../useStaffs';
import { useUpdateStaff } from '../useUpdateStaff';

vi.mock('../../api/staffs', () => ({
  updateStaff: vi.fn(),
}));

vi.mock('sonner', () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

const mockUpdateStaff = vi.mocked(updateStaff);

const staffId = 1;

const validValues: StaffFormValues = {
  name: '山田太郎',
  positionIds: [1],
  hourlyWage: 1200,
  isStudent: false,
  memo: '',
};

describe('useUpdateStaff', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
    });
    vi.clearAllMocks();
  });

  const renderUseUpdateStaff = () =>
    renderHook(() => useUpdateStaff(), { wrapper: createWrapper(queryClient) });

  it('mutationFn として updateStaff が (id, values) で呼び出される', async () => {
    mockUpdateStaff.mockResolvedValue(undefined);
    const { result } = renderUseUpdateStaff();

    await act(async () => {
      await result.current.mutateAsync({ id: staffId, values: validValues });
    });

    expect(mockUpdateStaff).toHaveBeenCalledWith(staffId, validValues);
  });

  it('更新成功時にスタッフ一覧のキャッシュが無効化される', async () => {
    mockUpdateStaff.mockResolvedValue(undefined);
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');
    const { result } = renderUseUpdateStaff();

    await act(async () => {
      await result.current.mutateAsync({ id: staffId, values: validValues });
    });

    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: staffQueryKeys.all });
  });

  it('更新成功時に成功トーストが表示される', async () => {
    mockUpdateStaff.mockResolvedValue(undefined);
    const { result } = renderUseUpdateStaff();

    await act(async () => {
      await result.current.mutateAsync({ id: staffId, values: validValues });
    });

    expect(toast.success).toHaveBeenCalledWith('スタッフ情報を更新しました');
  });

  it('バリデーションエラー時に API が返したメッセージがエラートーストに表示される', async () => {
    mockUpdateStaff.mockRejectedValue(new ApiError(422, '氏名を入力してください'));
    const { result } = renderUseUpdateStaff();

    act(() => {
      result.current.mutate({ id: staffId, values: validValues });
    });

    await waitFor(() => expect(toast.error).toHaveBeenCalledWith('氏名を入力してください'));
  });

  it('バリデーション以外のエラー時に既定のエラートーストが表示される', async () => {
    mockUpdateStaff.mockRejectedValue(new ApiError(500, 'Server Error'));
    const { result } = renderUseUpdateStaff();

    act(() => {
      result.current.mutate({ id: staffId, values: validValues });
    });

    await waitFor(() => expect(toast.error).toHaveBeenCalledWith('スタッフの更新に失敗しました'));
  });
});
