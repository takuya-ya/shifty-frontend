import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { isApiError } from '@/shared/api/error';
import { createStaff } from '../api/staffs';
import type { StaffFormValues } from '../schemas/staffFormSchema';
import { staffQueryKeys } from './useStaffs';

export const useCreateStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: StaffFormValues) => createStaff(values),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: staffQueryKeys.all });
      toast.success('スタッフを登録しました');
    },
    onError: (error) => {
      const message =
        isApiError(error) && error.type === 'validation' ? error.message : 'スタッフの登録に失敗しました';
      toast.error(message);
    },
  });
};
