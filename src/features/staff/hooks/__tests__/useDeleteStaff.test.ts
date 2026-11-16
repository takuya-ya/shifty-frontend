import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { QueryClient } from '@tanstack/react-query';
import { createWrapper } from '@/test/utils';
import { deleteStaff } from '../../api/staffs';
import { staffQueryKeys } from '../useStaffs';
import { useDeleteStaff } from '../useDeleteStaff';

vi.mock('../../api/staffs', () => ({
  deleteStaff: vi.fn(),
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
});
