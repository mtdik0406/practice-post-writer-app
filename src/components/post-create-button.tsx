"use client";

import { useState } from "react";
import { buttonVariants } from "./ui/button";
import { Icons } from "./icon";
import { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

interface PostCreateButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export default function PostCreateButton({
  className,
  variant,
  ...props
}: PostCreateButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    setIsLoading(true);

    const response = await fetch("api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Untitled Post",
      }),
    });

    setIsLoading(false);

    if (!response.ok) {
      return toast.error("問題が発生しました", {
        description: "投稿が作成されませんでした。もう一度お試しください。",
        closeButton: true,
      });
    }

    const post = await response.json();

    router.refresh();
    router.push(`editor/${post.id}`);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        className,
        { "cursor-not-allowed opacity-60": isLoading },
        buttonVariants({ variant })
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Icons.spinner className="animate-spin mr-2 h-4 w-4" />
      ) : (
        <Icons.add className="mr-2 h-4 w-4" />
      )}
      新しい投稿
    </button>
  );
}
