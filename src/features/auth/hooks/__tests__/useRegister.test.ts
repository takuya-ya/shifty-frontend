import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient } from "@tanstack/react-query";
import { useRegister } from "../useRegister";
import { ApiError, isApiError } from "@/shared/api/error";
import { createWrapper } from "@/test/utils";

vi.mock("../../api/auth", () => ({
  register: vi.fn(),
  getCurrentUser: vi.fn(),
}));

import { register } from "../../api/auth";

const mockRegister = vi.mocked(register);

const validPayload = {
  name: "テストユーザー",
  email: "test@example.com",
  password: "password123",
  password_confirmation: "password123",
};

describe("useRegister", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
    });
    vi.clearAllMocks();
  });

  it("mutationFn として register が呼び出される", async () => {
    mockRegister.mockResolvedValue(undefined);

    const { result } = renderHook(() => useRegister(), {
      wrapper: createWrapper(queryClient),
    });

    await act(async () => {
      await result.current.mutateAsync(validPayload);
    });

    expect(mockRegister.mock.calls[0][0]).toEqual(validPayload);
  });

  it("登録成功後に isSuccess が true になる", async () => {
    mockRegister.mockResolvedValue(undefined);

    const { result } = renderHook(() => useRegister(), {
      wrapper: createWrapper(queryClient),
    });

    await act(async () => {
      await result.current.mutateAsync(validPayload);
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  it("バリデーションエラー時に error が ApiError になる", async () => {
    const apiError = new ApiError(422, "入力内容に誤りがあります", {
      email: ["このメールアドレスは既に使用されています。"],
    });
    mockRegister.mockRejectedValue(apiError);

    const { result } = renderHook(() => useRegister(), {
      wrapper: createWrapper(queryClient),
    });

    await act(async () => {
      result.current.mutate(validPayload);
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(isApiError(result.current.error) && result.current.error.status).toBe(422);
  });

  it("登録成功後に currentUser キャッシュは更新されない", async () => {
    mockRegister.mockResolvedValue(undefined);
    const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");
    const setQueryDataSpy = vi.spyOn(queryClient, "setQueryData");

    const { result } = renderHook(() => useRegister(), {
      wrapper: createWrapper(queryClient),
    });

    await act(async () => {
      await result.current.mutateAsync(validPayload);
    });

    expect(invalidateSpy).not.toHaveBeenCalled();
    expect(setQueryDataSpy).not.toHaveBeenCalled();
  });
});
