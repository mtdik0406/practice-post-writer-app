"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import TextareaAutosize from "react-textarea-autosize";
import { useEffect, useRef } from "react";
import type EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import CodeTool from "@editorjs/code";
import { Post } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postPatchSchema, postPatchSchemaType } from "@/lib/validations/post";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface EditorProps {
  post: Pick<Post, "id" | "title" | "content" | "published">;
}

export default function Editor({ post }: EditorProps) {
  const editorRef = useRef<EditorJS | null>(null);
  const router = useRouter();

  useEffect(() => {
    const initEditor = async () => {
      const EditorJS = (await import("@editorjs/editorjs")).default;
      const LinkTool = (await import("@editorjs/link")).default;

      if (!editorRef.current) {
        const editor = new EditorJS({
          holder: "editor",
          placeholder: "ここに記事を書く",
          inlineToolbar: true,
          tools: {
            header: Header,
            linkTool: LinkTool,
            list: List,
            code: CodeTool,
          },
          data: post.content as any,
        });
        editorRef.current = editor;
      }
    };

    if (typeof window !== "undefined") {
      initEditor();
    }

    return () => {
      if (editorRef.current) {
        editorRef.current?.destroy();
        editorRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { register, handleSubmit } = useForm<postPatchSchemaType>({
    resolver: zodResolver(postPatchSchema),
  });

  const onSubmit = async (data: postPatchSchemaType) => {
    const blocks = await editorRef.current?.save();

    const response = await fetch(`/api/posts/${post.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: data.title,
        content: blocks,
      }),
    });

    if (!response.ok) {
      return toast.error("問題が発生しました", {
        description: "投稿が保存されませんでした。もう一度お試しください。",
        closeButton: true,
      });
    }

    router.refresh();

    return toast.success("正常に保存されました。", {
      closeButton: true,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-10">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-10">
            <Button variant="ghost" className="border">
              <Link href={"/dashboard"}>戻る</Link>
            </Button>
            <p className="text-sm text-muted-foreground">公開</p>
          </div>
          <Button type="submit">
            <span>保存</span>
          </Button>
        </div>
        <div className="w-[800px] mx-auto">
          <TextareaAutosize
            id="title"
            autoFocus
            placeholder="Post Title"
            defaultValue={post.title}
            className="w-full resize-none overflow-hidden bg-transparent text-5xl focus:outline-none font-bold"
            {...register("title")}
          />
        </div>
        <div id="editor" className="min-h-[500px]"></div>
        <p className="text-sm text-gray-500">
          Use
          <kbd className="rounded-b-md border bg-muted px-1 text-xs uppercase">
            Tab
          </kbd>
          to open the command menu
        </p>
      </div>
    </form>
  );
}
