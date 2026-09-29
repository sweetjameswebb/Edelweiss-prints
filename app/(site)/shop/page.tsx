import { Suspense } from "react";
import ShopClient from "@/components/ShopClient";
import { getProducts, getCollections } from "@/sanity/lib/queries";

export const revalidate = 60;

export default async function ShopPage() {
  const [products, collections] = await Promise.all([getProducts(), getCollections()]);

  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-20 text-center text-brown-400">Loading…</div>}>
      <ShopClient products={products} collections={collections} />
    </Suspense>
  );
}
