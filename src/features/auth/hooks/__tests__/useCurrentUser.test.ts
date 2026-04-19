import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createElement } from "react";
import {
  useCurrentUser,
  authQueryKeys,
  currentUserQueryOptions,
} from "../useCurrentUser";
import type { User } from "../../types";

vi.mock("../../api/auth", () => ({
  getCurrentUser: vi.fn(),
}));

import { getCurrentUser } from "../../api/auth";

const mockGetCurrentUser = vi.mocked(getCurrentUser);

const createWrapper = (queryClient: QueryClient) => {
  return ({ children }: { children: React.ReactNode }) =>
    createElement(QueryClientProvider, { client: queryClient }, children);
};

describe("authQueryKeys", () => {
  it('currentUser キーが ["auth", "currentUser"] である', () => {
    expect(authQueryKeys.currentUser).toEqual(["auth", "currentUser"]);
  });
});

describe("currentUserQueryOptions", () => {
  it("queryKey が authQueryKeys.currentUser と一致する", () => {
    expect(currentUserQueryOptions.queryKey).toEqual(
      authQueryKeys.currentUser
    );
  });

  it("queryFn が getCurrentUser を参照している", () => {
    expect(currentUserQueryOptions.queryFn).toBe(getCurrentUser);
  });
});

describe("useCurrentUser", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    // staleTime: Infinity を含む認証用デフォルト設定を再現
    queryClient.setQueryDefaults(["auth"], {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    });
    vi.clearAllMocks();
  });

  it("staleTime が Infinity に設定されている", () => {
    const defaults = queryClient.getQueryDefaults(authQueryKeys.currentUser);
    expect(defaults.staleTime).toBe(Infinity);
  });

  it("ユーザー情報を取得して返す", async () => {
    const mockUser: User = {
      id: 1,
      name: "テストユーザー",
      email: "test@example.com",
    };
    mockGetCurrentUser.mockResolvedValue(mockUser);

    const { result } = renderHook(() => useCurrentUser(), {
      wrapper: createWrapper(queryClient),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockUser);
  });

  it("API が null を返した場合 data が null になる", async () => {
    mockGetCurrentUser.mockResolvedValue(null);

    const { result } = renderHook(() => useCurrentUser(), {
      wrapper: createWrapper(queryClient),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeNull();
  });

  it("API エラー時に isError が true になる", async () => {
    mockGetCurrentUser.mockRejectedValue(new Error("API Error"));

    const { result } = renderHook(() => useCurrentUser(), {
      wrapper: createWrapper(queryClient),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
