import { useMutation } from "@tanstack/react-query";
import { register } from "../api/auth";

/**
 * 管理者登録ミューテーションフック。
 * 登録後はメール認証が必要なため、currentUser キャッシュは更新しない。
 */
export const useRegister = () => {
  return useMutation({
    mutationFn: register,
  });
};
