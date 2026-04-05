import { useMutation } from "@tanstack/react-query";
import { verifyEmail } from "../api/auth";

/**
 * メールアドレス認証ミューテーションフック。
 * マウント時に1回だけ呼び出され、URLパラメータの認証トークンを検証する。
 */
export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: verifyEmail,
  });
};
