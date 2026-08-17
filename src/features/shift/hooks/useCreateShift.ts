import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createShift } from '../api/shifts';
import type { ShiftPayload } from '../utils/toShiftPayload';

export const useCreateShift = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ staffId, payload }: { staffId: number; payload: ShiftPayload }) =>
      createShift(staffId, payload),
    onSuccess: () => {
      // TODO: [19.8.2] queryKey を shiftQueryKeys.list に一元化する
      void queryClient.invalidateQueries({ queryKey: ['shifts'] });
    },
  });
};
