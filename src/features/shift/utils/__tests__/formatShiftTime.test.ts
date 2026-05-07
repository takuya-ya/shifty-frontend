import { describe, it, expect } from "vitest";
import { formatShiftTime } from "../formatShiftTime";

describe("formatShiftTime", () => {
  it("開始・終了が揃っている場合は 'HH:MM〜HH:MM' 形式を返す", () => {
    expect(formatShiftTime("09:00", "18:00")).toBe("09:00〜18:00");
  });

  it("midnight 跨ぎ（終了 < 開始）はそのまま表示する", () => {
    expect(formatShiftTime("22:00", "02:00")).toBe("22:00〜02:00");
  });

  it("startTime が null のとき null を返す", () => {
    expect(formatShiftTime(null, "18:00")).toBeNull();
  });

  it("endTime が null のとき null を返す", () => {
    expect(formatShiftTime("09:00", null)).toBeNull();
  });

  it("startTime が undefined のとき null を返す", () => {
    expect(formatShiftTime(undefined, "18:00")).toBeNull();
  });

  it("endTime が undefined のとき null を返す", () => {
    expect(formatShiftTime("09:00", undefined)).toBeNull();
  });

  it("startTime が空文字のとき null を返す", () => {
    expect(formatShiftTime("", "18:00")).toBeNull();
  });

  it("endTime が空文字のとき null を返す", () => {
    expect(formatShiftTime("09:00", "")).toBeNull();
  });

  it("両方が null のとき null を返す", () => {
    expect(formatShiftTime(null, null)).toBeNull();
  });

  it("両方が undefined のとき null を返す", () => {
    expect(formatShiftTime(undefined, undefined)).toBeNull();
  });
});
