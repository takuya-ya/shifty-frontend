import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const isReactQueryDevtoolsEnabled =
  import.meta.env.DEV && import.meta.env.VITE_DEBUG === 'true';

export function AppReactQueryDevtools() {
  if (!isReactQueryDevtoolsEnabled) {
    return null;
  }

  return <ReactQueryDevtools initialIsOpen={false} />;
}