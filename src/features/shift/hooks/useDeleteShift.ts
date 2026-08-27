import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { isApiError } from '@/shared/api/error';
import { deleteShift } from '../api/shifts';

export const useDeleteShift = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (shiftId: number) => deleteShift(shiftId),
    onSuccess: () => {
      // TODO: [19.8.2] queryKey を shiftQueryKeys.list に一元化する
      void queryClient.invalidateQueries({ queryKey: ['shifts'] });
      toast.success('シフトを削除しました');
    },
    onError: (error) => {
      toast.error(isApiError(error) ? error.message : 'シフトの削除に失敗しました');
    },
  });
};
