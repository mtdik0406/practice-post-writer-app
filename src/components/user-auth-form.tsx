"use client";

import { useState } from "react";
import { Icons } from "./icon";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { signIn } from "next-auth/react";

export default function UserAuthForm() {
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  return (
    <div className="grid gap-6">
      <form>
        <div className="grid gap-2">
          <div className="grid gap-1.5">
            <Label htmlFor="email">メールアドレス</Label>
            <Input type="email" id="email" placeholder="メールアドレスを入力" />
          </div>
          <Button>メールアドレスでログイン</Button>
        </div>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-background px-2 text-muted-foreground">
            または
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Button
          onClick={() => {
            setIsGithubLoading(true);
            signIn("github");
          }}
        >
          {isGithubLoading ? (
            <Icons.spinner className="animate-spin" />
          ) : (
            <Icons.github />
          )}
          Githubでログイン
        </Button>
        <Button
          onClick={() => {
            setIsGoogleLoading(true);
            signIn("google");
          }}
        >
          {isGoogleLoading ? (
            <Icons.spinner className="animate-spin" />
          ) : (
            <Icons.google />
          )}
          Googleでログイン
        </Button>
      </div>
    </div>
  );
}
