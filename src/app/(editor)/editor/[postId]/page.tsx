import Editor from "@/components/editor";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { Post, User } from "@prisma/client";
import { notFound, redirect } from "next/navigation";

interface EditorProps {
  params: Promise<{ postId: string }>;
}

async function getPostForUser(postId: Post["id"], userId: User["id"]) {
  const post = await db.post.findFirst({
    where: {
      id: postId,
      authorId: userId,
    },
  });

  return post;
}

export default async function EditorPage({ params }: EditorProps) {
  const { postId } = await params;

  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const post = await getPostForUser(postId, user?.id);
  if (!post) {
    notFound();
  }

  return (
    <Editor
      post={{
        id: post?.id,
        title: post?.title,
        content: post?.content,
        published: post?.published,
      }}
    />
  );
}
