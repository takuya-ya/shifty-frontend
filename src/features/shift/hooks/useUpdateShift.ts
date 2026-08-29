import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { updateShift } from '../api/shifts';
import type { ShiftPayload } from '../utils/toShiftPayload';
import { shiftQueryKeys } from './useShifts';

export const useUpdateShift = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ shiftId, payload }: { shiftId: number; payload: ShiftPayload }) =>
      updateShift(shiftId, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: shiftQueryKeys.all });
      toast.success('シフトを更新しました');
    },
    onError: () => {
      toast.error('シフトの更新に失敗しました');
    },
  });
};
