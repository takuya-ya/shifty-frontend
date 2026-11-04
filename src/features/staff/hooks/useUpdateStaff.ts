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
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: staffQueryKeys.all });
      toast.success('スタッフ情報を更新しました');
    },
    onError: (error) => {
      const message =
        isApiError(error) && error.type === 'validation' ? error.message : 'スタッフの更新に失敗しました';
      toast.error(message);
    },
  });
};
