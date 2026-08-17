import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateShift } from '../api/shifts';
import type { ShiftPayload } from '../utils/toShiftPayload';

export const useUpdateShift = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ shiftId, payload }: { shiftId: number; payload: ShiftPayload }) =>
      updateShift(shiftId, payload),
    onSuccess: () => {
      // TODO: [19.8.2] シフト更新成功時のキャッシュ無効化を実装する（shiftQueryKeys.list を使って、キャッシュを一元化）
      void queryClient.invalidateQueries({ queryKey: ['shifts'] });
    },
  });
};
