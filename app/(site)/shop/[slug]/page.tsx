import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/ProductDetailClient";
import { getProduct, getProducts } from "@/sanity/lib/queries";

export const revalidate = 60;

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);
  if (!product) return notFound();

  const allProducts = await getProducts();
  const related = (
    product.category === "poster" && product.collection
      ? allProducts.filter((p) => p.collectionSlug === product.collectionSlug && p.id !== product.id)
      : allProducts.filter((p) => p.category === product.category && p.id !== product.id)
  ).slice(0, 4);

  return <ProductDetailClient product={product} related={related} />;
}
