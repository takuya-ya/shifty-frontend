import { createElement } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const createWrapper = (queryClient: QueryClient) =>
  ({ children }: { children: React.ReactNode }) =>
    createElement(QueryClientProvider, { client: queryClient }, children);
