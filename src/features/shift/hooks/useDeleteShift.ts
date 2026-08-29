import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { deleteShift } from '../api/shifts';
import { shiftQueryKeys } from './useShifts';

export const useDeleteShift = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (shiftId: number) => deleteShift(shiftId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: shiftQueryKeys.all });
      toast.success('シフトを削除しました');
    },
    onError: () => {
      toast.error('シフトの削除に失敗しました');
    },
  });
};
