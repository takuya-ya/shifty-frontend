import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { isApiError } from '@/shared/api/error';
import { updateShift } from '../api/shifts';
import type { ShiftPayload } from '../utils/toShiftPayload';

export const useUpdateShift = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ shiftId, payload }: { shiftId: number; payload: ShiftPayload }) =>
      updateShift(shiftId, payload),
    onSuccess: () => {
      // TODO: [19.8.2] queryKey を shiftQueryKeys.list に一元化する
      void queryClient.invalidateQueries({ queryKey: ['shifts'] });
      toast.success('シフトを更新しました');
    },
    onError: (error) => {
      toast.error(isApiError(error) ? error.message : 'シフトの更新に失敗しました');
    },
  });
};
