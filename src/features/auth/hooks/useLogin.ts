import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../api/auth";
import { authQueryKeys } from "./useCurrentUser";

/**
 * ログインミューテーションフック。
 * CSRF取得とPOST /api/v1/loginを1操作に統合し、
 * 成功後に currentUser キャッシュを無効化して最新状態を取得させる。
 */
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: authQueryKeys.currentUser,
      });
    },
  });
};
