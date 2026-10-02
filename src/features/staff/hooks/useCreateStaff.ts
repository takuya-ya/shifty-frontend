import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
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
    onError: () => {
      toast.error('スタッフの登録に失敗しました');
    },
  });
};
