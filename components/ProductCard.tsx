"use client";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import { Product } from "@/lib/data";

interface Props {
  product: Product;
  showSaleBadge?: boolean;
}

export default function ProductCard({ product, showSaleBadge = true }: Props) {
  const { t, lang } = useLang();
  const displayPrice = product.salePrice ?? product.price;
  const name = lang === "ge" ? product.nameGe : product.name;

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-brown-100">
      <Link href={`/shop/${product.slug}`}>
        <div
          className="w-full aspect-[3/4] flex items-center justify-center relative"
          style={{ backgroundColor: product.color + "33" }}
        >
          <div
            className="w-3/4 h-3/4 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: product.color + "66" }}
          >
            <span className="text-white font-serif text-sm text-center px-2 leading-snug opacity-70">{name}</span>
          </div>
          {showSaleBadge && product.salePrice && (
            <span className="absolute top-3 left-3 bg-terracotta-500 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-full">
              {t("sale_badge")}
            </span>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <span className="bg-white/90 text-brown-700 text-xs font-semibold px-3 py-1.5 rounded-full">
              {t("quick_view")}
            </span>
          </div>
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/shop/${product.slug}`}>
          <h3 className="font-serif font-semibold text-brown-800 text-sm leading-snug group-hover:text-terracotta-500 transition-colors line-clamp-2">
            {name}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-brown-800 font-semibold text-sm">₾{displayPrice}</span>
          {product.salePrice && (
            <span className="text-brown-400 line-through text-xs">₾{product.price}</span>
          )}
        </div>
        <Link
          href={`/shop/${product.slug}`}
          className="mt-3 block w-full text-center bg-brown-100 hover:bg-terracotta-500 hover:text-white text-brown-700 text-xs font-semibold py-1.5 rounded-lg transition-colors"
        >
          {t("view")}
        </Link>
      </div>
    </div>
  );
}
