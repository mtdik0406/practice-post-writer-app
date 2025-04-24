import { Button } from "@/components/ui/button";
import UserAuthForm from "@/components/user-auth-form";
import Link from "next/link";

export default function Register() {
  return (
    <div className="container mx-auto grid flex-col lg:grid-cols-2 h-screen w-screen items-center justify-center lg:max-w-none lg:px-0">
      <Button asChild variant="ghost" className="absolute left-8 top-8">
        <Link href="/login">ログイン</Link>
      </Button>

      <div className="h-full bg-muted lg:block hidden" />

      <div className="mx-auto w-full sm:w-[350px] flex flex-col items-center space-y-6">
        {/* ヘッダー */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            アカウントの作成
          </h1>
          <p className="text-muted-foreground text-sm">
            メールアドレスを入力してアカウント作成してください。
          </p>
        </div>

        {/* フォーム */}
        <UserAuthForm />

        {/* 登録リンク */}
        <p className="text-muted-foreground px-8 text-center text-sm">
          続けてクリックすれば私たちの
          <Link href="/terms" className="underline underline-offset-4">
            利用規約
          </Link>
          と
          <Link href="/privacy" className="underline underline-offset-4">
            プライバシーポリシー
          </Link>
          に同意したことになります。
        </p>
      </div>
    </div>
  );
}
