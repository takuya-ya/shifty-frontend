import { QueryClient } from '@tanstack/react-query';

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

// 認証状態はフォーカス復帰ごとに再取得せず、明示的な無効化や再訪時に更新する。
queryClient.setQueryDefaults(['auth'], {
  retry: false,
  refetchOnWindowFocus: false,
  refetchOnMount: false,
});