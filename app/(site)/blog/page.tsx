import BlogListClient from "@/components/BlogListClient";
import { getPosts } from "@/sanity/lib/queries";

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getPosts();
  return <BlogListClient posts={posts} />;
}
