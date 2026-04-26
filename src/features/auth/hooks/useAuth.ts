import { useCurrentUser } from "./useCurrentUser";

/**
 * 認証状態の参照窓口。
 * isAuthenticated と user を一本化し、各コンポーネントが
 * useCurrentUser の詳細を知らずに認証状態を参照できるようにする。
 */
export const useAuth = () => {
  const { data: user, isLoading, isError } = useCurrentUser();

  return {
    user: user ?? null,
    isAuthenticated: !!user,
    isEmailVerified: !!user?.email_verified_at,
    isLoading,
    isError,
  };
};
