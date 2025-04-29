import DashBoardHeader from "@/components/dashboard-header";
import DashboardShell from "@/components/dashboard-shell";
import PostCreateButton from "@/components/post-create-button";
import PostItem from "@/components/post-item";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }
  const posts = await db.post.findMany({
    where: {
      authorId: user.id,
    },
    select: {
      id: true,
      title: true,
      published: true,
      createdAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <DashboardShell>
      <DashBoardHeader heading="記事投稿" text="記事の投稿と管理">
        <PostCreateButton />
      </DashBoardHeader>
      <div>
        <div className="divide-y border rounded-md">
          {posts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
