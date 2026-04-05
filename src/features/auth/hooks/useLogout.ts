import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../api/auth";
import { authQueryKeys } from "./useCurrentUser";

/**
 * ログアウトミューテーションフック。
 * 成功後に currentUser キャッシュを null にセットし、
 * 再フェッチを発生させずに即時ログアウト状態を反映する。
 */
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(authQueryKeys.currentUser, null);
    },
  });
};
