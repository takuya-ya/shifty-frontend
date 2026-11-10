import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { QueryClient } from '@tanstack/react-query';
import { AdminStaffsPage } from '../AdminStaffsPage';
import { createWrapper } from '@/test/utils';
import type { StaffProfile } from '@/features/staff/types';
import { fetchStaffs } from '@/features/staff/api/staffs';

// useStaffs / useUpdateStaff / TanStack Query は本物を動かし、通信する API 関数だけを差し替える
vi.mock('@/features/staff/api/staffs');

const mockFetchStaffs = vi.mocked(fetchStaffs);

// 氏名・時給・高校生・メモのすべてを 2 人で変え、別の行の値が入ってもテストが落ちるようにする
const staffs: StaffProfile[] = [
  {
    id: 1,
    name: '山田太郎',
    hourly_wage: 1200,
    is_student: false,
    memo: '平日のみ',
    positions: [{ id: 1, name: 'ホール' }],
  },
  {
    id: 2,
    name: '鈴木花子',
    hourly_wage: 1500,
    is_student: true,
    memo: '土日のみ',
    positions: [{ id: 2, name: 'キッチン' }],
  },
];

describe('AdminStaffsPage', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    vi.clearAllMocks();
  });

  it('isPending のとき「読み込み中...」が表示される', () => {
    mockFetchStaffs.mockReturnValue(new Promise(() => {}));

    render(<AdminStaffsPage />, { wrapper: createWrapper(queryClient) });

    expect(screen.getByText('読み込み中...')).toBeInTheDocument();
  });

  it('isError のとき「スタッフ情報の取得に失敗しました」が表示される', async () => {
    mockFetchStaffs.mockRejectedValue(new Error('取得失敗'));

    render(<AdminStaffsPage />, { wrapper: createWrapper(queryClient) });

    expect(await screen.findByText('スタッフ情報の取得に失敗しました')).toBeInTheDocument();
  });

  it('取得成功のとき StaffListTable にスタッフが表示される', async () => {
    mockFetchStaffs.mockResolvedValue(staffs);

    render(<AdminStaffsPage />, { wrapper: createWrapper(queryClient) });

    expect(await screen.findByText('山田太郎')).toBeInTheDocument();
    expect(screen.getByText('ホール')).toBeInTheDocument();
  });

  it('編集ボタンを押すと、押した行のスタッフの値がフォームの初期値に入る', async () => {
    mockFetchStaffs.mockResolvedValue(staffs);
    render(<AdminStaffsPage />, { wrapper: createWrapper(queryClient) });

    fireEvent.click(await screen.findByRole('button', { name: '鈴木花子を編集' }));

    const dialog = await screen.findByRole('dialog');
    expect(within(dialog).getByLabelText(/氏名/)).toHaveValue('鈴木花子');
    expect(within(dialog).getByLabelText('時給（円/h）')).toHaveValue(1500);
    expect(within(dialog).getByRole('checkbox', { name: '高校生' })).toBeChecked();
    expect(within(dialog).getByLabelText('メモ')).toHaveValue('土日のみ');
  });
});
