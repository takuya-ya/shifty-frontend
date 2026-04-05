import { useMutation } from "@tanstack/react-query";
import { sendPasswordResetLink } from "../api/auth";

/**
 * パスワード再設定リンク送信ミューテーションフック。
 * 成功後にキャッシュ操作は不要なため、onSuccess コールバックは持たない。
 */
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: sendPasswordResetLink,
  });
};
