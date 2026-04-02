import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../api/auth";

/**
 * パスワード再設定ミューテーションフック。
 * 成功後にキャッシュ操作は不要なため、onSuccess コールバックは持たない。
 */
export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
  });
};
