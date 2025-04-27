"use client";

import { useState } from "react";
import { buttonVariants } from "./ui/button";
import { Icons } from "./icon";
import { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

interface PostCreateButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export default function PostCreateButton({
  className,
  variant,
  ...props
}: PostCreateButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {};

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
