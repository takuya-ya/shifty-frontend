import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { isApiError } from '@/shared/api/error';
import { updateStaff } from '../api/staffs';
import type { StaffFormValues } from '../schemas/staffFormSchema';
import { staffQueryKeys } from './useStaffs';

export const useUpdateStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, values }: { id: number; values: StaffFormValues }) =>
      updateStaff(id, values),
    // 再取得前にモーダルが閉じると、古い一覧が編集フォームの初期値になり、更新済みの値を上書きしてしまうため完了を待つ
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: staffQueryKeys.all });
      toast.success('スタッフ情報を更新しました');
    },
    onError: (error) => {
      const message =
        isApiError(error) && error.type === 'validation' ? error.message : 'スタッフの更新に失敗しました';
      toast.error(message);
    },
  });
};
