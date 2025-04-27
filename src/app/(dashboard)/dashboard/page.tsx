import DashBoardHeader from "@/components/dashboard-header";
import DashboardShell from "@/components/dashboard-shell";
import PostCreateButton from "@/components/post-create-button";

export default function Dashboard() {
  return (
    <DashboardShell>
      <DashBoardHeader heading="記事投稿" text="記事の投稿と管理">
        <PostCreateButton />
      </DashBoardHeader>
    </DashboardShell>
  );
}
