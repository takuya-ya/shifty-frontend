import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "パスワードは8文字以上で入力してください"),
    password_confirmation: z
      .string()
      .min(1, "パスワード(確認)を入力してください"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "パスワードが一致しません",
    path: ["password_confirmation"],
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
