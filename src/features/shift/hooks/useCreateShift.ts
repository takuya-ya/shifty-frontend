import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createShift } from '../api/shifts';
import type { ShiftPayload } from '../utils/toShiftPayload';

export const useCreateShift = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ staffId, payload }: { staffId: number; payload: ShiftPayload }) =>
      createShift(staffId, payload),
    onSuccess: () => {
      // TODO: [19.8.2] シフト作成成功時のキャッシュ無効化を実装する（shiftQueryKeys.list を使って、キャッシュを一元化）
      void queryClient.invalidateQueries({ queryKey: ['shifts'] });
    },
  });
};
