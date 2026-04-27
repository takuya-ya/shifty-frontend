import { useMutation, useQueryClient } from "@tanstack/react-query";
import { verifyEmail } from "../api/auth";
import { authQueryKeys } from "./useCurrentUser";

export const useVerifyEmail = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: verifyEmail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authQueryKeys.currentUser });
    },
  });
};
