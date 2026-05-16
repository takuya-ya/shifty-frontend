import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../hooks/useLogin";
import { loginSchema, type LoginFormValues } from "../schemas/loginSchema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PATHS } from "@/routes/paths";

const SAVED_EMAIL_KEY = "shifty_saved_email";

interface LoginFormProps {
  onLoginSuccess: () => void;
}

export const LoginForm = ({ onLoginSuccess }: LoginFormProps) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [rememberEmail, setRememberEmail] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });
  const { mutate: login, isPending } = useLogin();

  useEffect(() => {
    const saved = localStorage.getItem(SAVED_EMAIL_KEY);
    if (saved) {
      setValue("email", saved);
      setRememberEmail(true);
    }
  }, [setValue]);

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    setServerError(null);
    if (rememberEmail) {
      localStorage.setItem(SAVED_EMAIL_KEY, data.email);
    } else {
      localStorage.removeItem(SAVED_EMAIL_KEY);
    }
    login(data, {
      onSuccess: onLoginSuccess,
      onError: (error) => setServerError(error.message),
    });
  };

  return (
    <Card className="w-full py-0 shadow-lg bg-gray-50">
      <CardContent className="p-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <label
              htmlFor="login-email"
              className="block text-base font-medium text-gray-600"
            >
              メールアドレス
            </label>
            <Input
              id="login-email"
              type="email"
              placeholder="メールアドレスを入力"
              className="h-11 bg-white placeholder:text-gray-400 md:text-base"
              disabled={isPending}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="login-password"
              className="block text-base font-medium text-gray-600"
            >
              パスワード
            </label>
            <Input
              id="login-password"
              type="password"
              placeholder="パスワードを入力"
              className="h-11 bg-white placeholder:text-gray-400 md:text-base"
              disabled={isPending}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <input
              id="remember-email"
              type="checkbox"
              checked={rememberEmail}
              onChange={(e) => setRememberEmail(e.target.checked)}
              className="w-4 h-4 accent-primary cursor-pointer"
            />
            <label
              htmlFor="remember-email"
              className="text-sm text-gray-500 cursor-pointer select-none"
            >
              次回からメールアドレスの入力を省略
            </label>
          </div>
          {serverError && (
            <p className="text-sm text-destructive">{serverError}</p>
          )}
          <Button
            type="submit"
            disabled={isPending}
            className="w-full h-11 text-base font-semibold text-white"
          >
            {isPending ? "送信中..." : "ログイン"}
          </Button>
          <div className="text-center">
            <Link
              to={PATHS.RESET_PASSWORD}
              className="text-sm text-gray-500 hover:text-primary hover:underline"
            >
              パスワードをお忘れですか？
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
