import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { QueryClient } from '@tanstack/react-query';
import { AdminStaffsPage } from '../AdminStaffsPage';
import { createWrapper } from '@/test/utils';
import type { StaffProfile } from '@/features/staff/types';
import { fetchStaffs, updateStaff } from '@/features/staff/api/staffs';

// useStaffs / useUpdateStaff / TanStack Query は本物を動かし、通信する API 関数だけを差し替える
vi.mock('@/features/staff/api/staffs');
// 保存成功時のトーストは確認対象外で、通知の副作用を起こさないため差し替える
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

const mockFetchStaffs = vi.mocked(fetchStaffs);
const mockUpdateStaff = vi.mocked(updateStaff);

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

  // vitest の globals が false で自動クリーンアップが働かず、前のテストで開いたダイアログが残り、同じ id の入力欄が重複するため明示的に行う
  afterEach(() => {
    cleanup();
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

  it('値を変えて保存すると、押した行のスタッフの ID と変更後の値で updateStaff が呼ばれる', async () => {
    mockFetchStaffs.mockResolvedValue(staffs);
    mockUpdateStaff.mockResolvedValue(undefined);
    render(<AdminStaffsPage />, { wrapper: createWrapper(queryClient) });
    fireEvent.click(await screen.findByRole('button', { name: '鈴木花子を編集' }));
    const dialog = await screen.findByRole('dialog');

    fireEvent.change(within(dialog).getByLabelText('時給（円/h）'), { target: { value: '1800' } });
    fireEvent.click(within(dialog).getByRole('button', { name: '保存' }));

    // フォームの検証が非同期のため、クリック直後ではなく呼ばれるまで待つ
    await waitFor(() => {
      expect(mockUpdateStaff).toHaveBeenCalledWith(2, {
        name: '鈴木花子',
        positionIds: [2],
        hourlyWage: 1800,
        isStudent: true,
        memo: '土日のみ',
      });
    });
  });
});
