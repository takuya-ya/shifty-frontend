import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { QueryClient } from "@tanstack/react-query";
import { useLogout } from "../useLogout";
import { authQueryKeys } from "../useCurrentUser";
import type { User } from "../../types";
import { createWrapper } from "@/test/utils";

vi.mock("../../api/auth", () => ({
  logout: vi.fn(),
  getCurrentUser: vi.fn(),
}));

import { logout } from "../../api/auth";

const mockLogout = vi.mocked(logout);

describe("useLogout", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
    });
    vi.clearAllMocks();
  });

  it("mutationFn として logout が呼び出される", async () => {
    mockLogout.mockResolvedValue(undefined);

    const { result } = renderHook(() => useLogout(), {
      wrapper: createWrapper(queryClient),
    });

    await act(async () => {
      await result.current.mutateAsync();
    });

    expect(mockLogout).toHaveBeenCalledOnce();
  });

  it("成功後に currentUser キャッシュが null にセットされる", async () => {
    mockLogout.mockResolvedValue(undefined);

    const mockUser: User = { id: 1, name: "テスト", email: "test@example.com" };
    queryClient.setQueryData(authQueryKeys.currentUser, mockUser);

    const { result } = renderHook(() => useLogout(), {
      wrapper: createWrapper(queryClient),
    });

    await act(async () => {
      await result.current.mutateAsync();
    });

    const cachedUser = queryClient.getQueryData(authQueryKeys.currentUser);
    expect(cachedUser).toBeNull();
  });

  it("再フェッチは発生しない（invalidateQueries は呼ばれない）", async () => {
    mockLogout.mockResolvedValue(undefined);
    const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");

    const { result } = renderHook(() => useLogout(), {
      wrapper: createWrapper(queryClient),
    });

    await act(async () => {
      await result.current.mutateAsync();
    });

    expect(invalidateSpy).not.toHaveBeenCalled();
  });
});
