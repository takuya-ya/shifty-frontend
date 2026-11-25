import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { isApiError } from '@/shared/api/error';
import { deleteStaff } from '../api/staffs';
import { staffQueryKeys } from './useStaffs';

const HTTP_STATUS_NOT_FOUND = 404;

export const useDeleteStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (staffId: number) => deleteStaff(staffId),
    // 再取得前にダイアログが閉じると、削除済みのスタッフが一覧に残って見えてしまうため完了を待つ
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: staffQueryKeys.all });
      toast.success('スタッフを削除しました');
    },
    onError: async (error) => {
      if (isApiError(error) && error.status === HTTP_STATUS_NOT_FOUND) {
        // 他の画面で削除済みの場合、一覧が古いままなので最新の状態に更新する
        await queryClient.invalidateQueries({ queryKey: staffQueryKeys.all });
        toast.error('スタッフはすでに削除されています');
        return;
      }
      toast.error('スタッフの削除に失敗しました');
    },
  });
};
