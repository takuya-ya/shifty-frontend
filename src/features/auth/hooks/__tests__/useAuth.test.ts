import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient } from "@tanstack/react-query";
import { useAuth } from "../useAuth";
import type { User } from "../../types";
import { createWrapper } from "@/test/utils";

vi.mock("../../api/auth", () => ({
  getCurrentUser: vi.fn(),
}));

import { getCurrentUser } from "../../api/auth";

const mockGetCurrentUser = vi.mocked(getCurrentUser);

describe("useAuth", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    vi.clearAllMocks();
  });

  it("ユーザーが存在する場合 isAuthenticated が true になる", async () => {
    const mockUser: User = {
      id: 1,
      name: "テストユーザー",
      email: "test@example.com",
    };
    mockGetCurrentUser.mockResolvedValue(mockUser);

    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(queryClient),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user).toEqual(mockUser);
  });

  it("API が null を返した場合 isAuthenticated が false になる", async () => {
    mockGetCurrentUser.mockResolvedValue(null);

    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(queryClient),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
  });

  it("フェッチ中は isLoading が true になる", () => {
    mockGetCurrentUser.mockReturnValue(new Promise<User | null>(() => {}));

    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(queryClient),
    });

    expect(result.current.isLoading).toBe(true);
  });

  it("API エラー時に isError が true になる", async () => {
    mockGetCurrentUser.mockRejectedValue(new Error("API Error"));

    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(queryClient),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
  });
});
