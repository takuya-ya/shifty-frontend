import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "../hooks/useRegister";
import {
  registerSchema,
  type RegisterFormValues,
} from "../schemas/registerSchema";
import { EmailVerificationPending } from "./EmailVerificationPending";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export const RegisterForm = ({ onSwitchToLogin }: RegisterFormProps) => {
  // 登録成功後の認証待ち表示に使用するメールアドレスを保持する
  const [registeredEmail, setRegisteredEmail] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({ resolver: zodResolver(registerSchema) });

  const { mutate: registerUser, isPending } = useRegister();

  const onInvalid = () => setServerError(null);

  const onSubmit: SubmitHandler<RegisterFormValues> = (data) => {
    setServerError(null);
    registerUser(data, {
      onSuccess: () => setRegisteredEmail(data.email),
      onError: (error) => setServerError(error.message),
    });
  };

  // 登録成功後に認証待ち画面を表示
  if (registeredEmail !== null) {
    return <EmailVerificationPending email={registeredEmail} />;
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>新規登録</CardTitle>
        <CardDescription>アカウント情報を入力して登録します。</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit, onInvalid)}
          className="space-y-4"
        >
          <div className="space-y-1.5">
            <label
              htmlFor="register-name"
              className="block text-sm font-medium"
            >
              名前
            </label>
            <Input
              id="register-name"
              type="text"
              disabled={isPending}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <label
              htmlFor="register-email"
              className="block text-sm font-medium"
            >
              メールアドレス
            </label>
            <Input
              id="register-email"
              type="email"
              disabled={isPending}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <label
              htmlFor="register-password"
              className="block text-sm font-medium"
            >
              パスワード
            </label>
            <Input
              id="register-password"
              type="password"
              disabled={isPending}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <label
              htmlFor="register-password-confirmation"
              className="block text-sm font-medium"
            >
              パスワード(確認)
            </label>
            <Input
              id="register-password-confirmation"
              type="password"
              disabled={isPending}
              {...register("password_confirmation")}
            />
            {errors.password_confirmation && (
              <p className="text-sm text-destructive">
                {errors.password_confirmation.message}
              </p>
            )}
          </div>
          {serverError && (
            <p className="text-sm text-destructive">{serverError}</p>
          )}
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "送信中..." : "登録する"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="justify-center">
        <Button
          type="button"
          variant="link"
          onClick={onSwitchToLogin}
          className="px-0"
        >
          ログインはこちら
        </Button>
      </CardFooter>
    </Card>
  );
};
