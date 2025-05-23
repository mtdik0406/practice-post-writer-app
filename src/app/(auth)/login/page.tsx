import UserAuthForm from "@/components/user-auth-form";
import Link from "next/link";

export default function Login() {
  return (
    <div className="container mx-auto px-4 flex flex-col justify-center h-screen items-center">
      <div className="w-full sm:w-[350px] flex flex-col items-center space-y-6">
        {/* ヘッダー */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome Back
          </h1>
          <p className="text-muted-foreground text-sm">
            メールアドレスを入力してログインできます。
          </p>
        </div>

        {/* フォーム */}
        <UserAuthForm />

        {/* 登録リンク */}
        <p className="text-muted-foreground px-8 text-center text-sm">
          <Link href="/register" className="underline underline-offset-4">
            アカウントを持っていませんか？
          </Link>
        </p>
      </div>
    </div>
  );
}
