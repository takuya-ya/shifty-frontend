import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { createShift } from '../api/shifts';
import type { ShiftPayload } from '../utils/toShiftPayload';
import { shiftQueryKeys } from './useShifts';

export const useCreateShift = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ staffId, payload }: { staffId: number; payload: ShiftPayload }) =>
      createShift(staffId, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: shiftQueryKeys.all });
      toast.success('シフトを登録しました');
    },
    onError: () => {
      toast.error('シフトの登録に失敗しました');
    },
  });
};
