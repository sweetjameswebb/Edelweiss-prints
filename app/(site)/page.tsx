import HomeClient from "@/components/HomeClient";
import { getProducts, getCollections, getPosts } from "@/sanity/lib/queries";

export const revalidate = 60;

export default async function HomePage() {
  const [products, collections, blogPosts] = await Promise.all([
    getProducts(),
    getCollections(),
    getPosts(),
  ]);

  return <HomeClient products={products} collections={collections} blogPosts={blogPosts} />;
}
