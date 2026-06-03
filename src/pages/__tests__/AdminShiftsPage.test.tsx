import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClient } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import { AdminShiftsPage } from '../AdminShiftsPage';
import { createWrapper } from '@/test/utils';
import type { Shift } from '@/features/shift/types';

vi.mock('@/features/shift/hooks/useShifts', () => ({
  useShifts: vi.fn(),
}));

import { useShifts } from '@/features/shift/hooks/useShifts';

const mockUseShifts = vi.mocked(useShifts);

describe('AdminShiftsPage', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    vi.clearAllMocks();
  });

  it('isPending のとき「読み込み中...」が表示される', () => {
    mockUseShifts.mockReturnValue(
      { isPending: true, isError: false, data: undefined } as UseQueryResult<Shift[], Error>,
    );

    render(<AdminShiftsPage />, { wrapper: createWrapper(queryClient) });

    expect(screen.getByText('読み込み中...')).toBeInTheDocument();
  });

  it('isError のとき「シフトの取得に失敗しました」が表示される', () => {
    mockUseShifts.mockReturnValue(
      { isPending: false, isError: true, data: undefined } as UseQueryResult<Shift[], Error>,
    );

    render(<AdminShiftsPage />, { wrapper: createWrapper(queryClient) });

    expect(screen.getByText('シフトの取得に失敗しました')).toBeInTheDocument();
  });
});
