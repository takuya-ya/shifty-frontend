import { useMutation } from "@tanstack/react-query";
import { resendVerificationEmail } from "../api/auth";

/**
 * 確認メール再送ミューテーションフック。
 */
export const useResendVerification = () => {
  return useMutation({
    mutationFn: resendVerificationEmail,
  });
};
