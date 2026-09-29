import { notFound } from "next/navigation";
import BlogPostClient from "@/components/BlogPostClient";
import { getPost } from "@/sanity/lib/queries";

export const revalidate = 60;

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) return notFound();

  return <BlogPostClient post={post} />;
}
