import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ApiError } from '@/shared/api/error';
import { createWrapper } from '@/test/utils';
import { deleteStaff } from '../../api/staffs';
import { staffQueryKeys } from '../useStaffs';
import { useDeleteStaff } from '../useDeleteStaff';

vi.mock('../../api/staffs', () => ({
  deleteStaff: vi.fn(),
}));

vi.mock('sonner', () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

const mockDeleteStaff = vi.mocked(deleteStaff);

const staffId = 1;

describe('useDeleteStaff', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
    });
    vi.clearAllMocks();
  });

  const renderUseDeleteStaff = () =>
    renderHook(() => useDeleteStaff(), { wrapper: createWrapper(queryClient) });

  it('mutationFn として deleteStaff が id で呼び出される', async () => {
    mockDeleteStaff.mockResolvedValue(undefined);
    const { result } = renderUseDeleteStaff();

    await act(async () => {
      await result.current.mutateAsync(staffId);
    });

    expect(mockDeleteStaff).toHaveBeenCalledWith(staffId);
  });

  it('削除成功時にスタッフ一覧のキャッシュが無効化される', async () => {
    mockDeleteStaff.mockResolvedValue(undefined);
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');
    const { result } = renderUseDeleteStaff();

    await act(async () => {
      await result.current.mutateAsync(staffId);
    });

    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: staffQueryKeys.all });
  });

  it('削除成功時に成功トーストが表示される', async () => {
    mockDeleteStaff.mockResolvedValue(undefined);
    const { result } = renderUseDeleteStaff();

    await act(async () => {
      await result.current.mutateAsync(staffId);
    });

    expect(toast.success).toHaveBeenCalledWith('スタッフを削除しました');
  });

  it('削除対象が存在しない（404）場合、一覧が再取得され削除済みの旨がトースト表示される', async () => {
    mockDeleteStaff.mockRejectedValue(new ApiError(404, 'Not Found'));
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');
    const { result } = renderUseDeleteStaff();

    act(() => {
      result.current.mutate(staffId);
    });

    await waitFor(() =>
      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: staffQueryKeys.all }),
    );
    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith('スタッフはすでに削除されています'),
    );
  });

  it('404 以外のエラー時、既定のエラートーストが表示される', async () => {
    mockDeleteStaff.mockRejectedValue(new ApiError(500, 'Server Error'));
    const { result } = renderUseDeleteStaff();

    act(() => {
      result.current.mutate(staffId);
    });

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith('スタッフの削除に失敗しました'),
    );
  });
});
