import Mdx from "@/components/mdx";
import { Button } from "@/components/ui/button";
import { allPosts } from "contentlayer/generated";
import { format } from "date-fns";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getPostFromSlug(slug: string) {
  const post = allPosts.find((post) => {
    return post.slugAsParams === slug;
  });
  return post;
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await props.params;
  const slug = resolvedParams.slug;
  const post = await getPostFromSlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [{ url: post.image || "" }],
    },
  };
}

export default async function PostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await props.params;
  const slug = resolvedParams.slug;
  const post = await getPostFromSlug(slug);

  if (!post) {
    return notFound();
  }

  return (
    <article className="container mx-auto px-4 max-w-3xl py-6 lg:py-10">
      <div>
        {post.date && (
          <time>Published on {format(post.date, "yyyy/MM/dd")}</time>
        )}
      </div>
      <h1 className="mt-2 font-extrabold text-4xl lg:text-5xl leading-tight">
        {post.title}
      </h1>
      {post.image && (
        <Image
          src={post.image}
          alt={post.title}
          width={720}
          height={405}
          className="my-8 border rounded-md bg-muted"
        />
      )}
      <Mdx code={post.body.code} />
      <hr className="mt-12" />
      <div className="py-6 text-center lg:py-10">
        <Button asChild variant="secondary">
          <Link href="/blog">Back to blog</Link>
        </Button>
      </div>
    </article>
  );
}
