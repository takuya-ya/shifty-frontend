import { queryOptions, useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../api/auth";

export const authQueryKeys = {
  currentUser: ["auth", "currentUser"] as const,
};

export const currentUserQueryOptions = queryOptions({
  queryKey: authQueryKeys.currentUser,
  queryFn: getCurrentUser,
});

export const useCurrentUser = () => useQuery(currentUserQueryOptions);
