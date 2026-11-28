import { afterEach, describe, expect, it } from "vitest";
import { act, cleanup, render, screen } from "@testing-library/react";
import { toast } from "sonner";
import { AppToaster } from "../AppToaster";

describe("AppToaster", () => {
  afterEach(() => {
    act(() => toast.dismiss());
    cleanup();
  });

  // ヘッダー右端の操作ボタンにトーストが重なってクリックを塞がないよう、画面下部に表示されることを検証する
  it("トーストを画面の右下に表示する", async () => {
    const { container } = render(<AppToaster />);

    act(() => {
      toast.success("スタッフを削除しました");
    });

    await screen.findByText("スタッフを削除しました");
    const toaster = container.querySelector("[data-sonner-toaster]");
    expect(toaster).toHaveAttribute("data-y-position", "bottom");
    expect(toaster).toHaveAttribute("data-x-position", "right");
  });
});
