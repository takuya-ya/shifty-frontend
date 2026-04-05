import { QueryClient } from "@tanstack/react-query";

const ONE_MINUTE = 60 * 1000;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: ONE_MINUTE,
      gcTime: 5 * ONE_MINUTE,
      refetchOnReconnect: true,
    },
  },
});

// 認証状態は invalidateQueries / setQueryData で明示的に管理するため、
// 自動再取得をすべて無効にし staleTime を Infinity にする。
queryClient.setQueryDefaults(["auth"], {
  retry: false,
  staleTime: Infinity,
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  refetchOnReconnect: false,
});
