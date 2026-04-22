import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient } from "@tanstack/react-query";
import { useLogin } from "../useLogin";
import { authQueryKeys } from "../useCurrentUser";
import { ApiError } from "@/shared/api/error";
import { createWrapper } from "@/test/utils";

vi.mock("../../api/auth", () => ({
  login: vi.fn(),
  getCurrentUser: vi.fn(),
}));

import { login } from "../../api/auth";

const mockLogin = vi.mocked(login);

describe("useLogin", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
    });
    vi.clearAllMocks();
  });

  it("mutationFn として login が呼び出される", async () => {
    mockLogin.mockResolvedValue(undefined);

    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(queryClient),
    });

    await act(async () => {
      await result.current.mutateAsync({
        email: "test@example.com",
        password: "password",
      });
    });

    expect(mockLogin.mock.calls[0][0]).toEqual({
      email: "test@example.com",
      password: "password",
    });
  });

  it("成功後に currentUser クエリが invalidate される", async () => {
    mockLogin.mockResolvedValue(undefined);
    const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");

    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(queryClient),
    });

    await act(async () => {
      await result.current.mutateAsync({
        email: "test@example.com",
        password: "password",
      });
    });

    expect(invalidateSpy).toHaveBeenCalledWith({
      queryKey: authQueryKeys.currentUser,
    });
  });

  it("ログイン失敗時に isError が true になる", async () => {
    mockLogin.mockRejectedValue(
      new ApiError(422, "認証情報が正しくありません")
    );

    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(queryClient),
    });

    await act(async () => {
      result.current.mutate({
        email: "test@example.com",
        password: "wrong",
      });
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
