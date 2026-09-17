import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClient } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import { AdminStaffsPage } from '../AdminStaffsPage';
import { createWrapper } from '@/test/utils';
import type { StaffProfile } from '@/features/staff/types';

vi.mock('@/features/staff/hooks/useStaffs', () => ({
  useStaffs: vi.fn(),
}));

import { useStaffs } from '@/features/staff/hooks/useStaffs';

const mockUseStaffs = vi.mocked(useStaffs);

describe('AdminStaffsPage', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    vi.clearAllMocks();
  });

  it('isPending のとき「読み込み中...」が表示される', () => {
    mockUseStaffs.mockReturnValue(
      { isPending: true, isError: false, data: undefined } as UseQueryResult<StaffProfile[], Error>,
    );

    render(<AdminStaffsPage />, { wrapper: createWrapper(queryClient) });

    expect(screen.getByText('読み込み中...')).toBeInTheDocument();
  });

  it('isError のとき「スタッフ情報の取得に失敗しました」が表示される', () => {
    mockUseStaffs.mockReturnValue(
      { isPending: false, isError: true, data: undefined } as UseQueryResult<StaffProfile[], Error>,
    );

    render(<AdminStaffsPage />, { wrapper: createWrapper(queryClient) });

    expect(screen.getByText('スタッフ情報の取得に失敗しました')).toBeInTheDocument();
  });

  it('取得成功のとき StaffListTable にスタッフが表示される', () => {
    const staffs: StaffProfile[] = [
      {
        id: 1,
        name: '山田太郎',
        hourly_wage: 1200,
        is_student: false,
        memo: '',
        positions: [{ id: 1, name: 'ホール' }],
      },
    ];
    mockUseStaffs.mockReturnValue(
      { isPending: false, isError: false, data: staffs } as UseQueryResult<StaffProfile[], Error>,
    );

    render(<AdminStaffsPage />, { wrapper: createWrapper(queryClient) });

    expect(screen.getByText('山田太郎')).toBeInTheDocument();
    expect(screen.getByText('ホール')).toBeInTheDocument();
  });
});
