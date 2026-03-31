import { StrictMode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css"; // 全体に適用するスタイルシート
import { router } from "./routes/config";
import { AppReactQueryDevtools } from "./shared/api/ReactQueryDevtools";
import { queryClient } from "./shared/api/queryClient";

// 1. HTML内の id="root" を持つ要素を探し、Reactの「起点」を作成
const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

// 2. Reactアプリを画面に映し出す
root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <AppReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>,
);
