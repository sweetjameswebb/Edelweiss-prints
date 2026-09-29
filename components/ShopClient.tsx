"use client";
import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useLang } from "@/context/LanguageContext";
import ProductCard from "@/components/ProductCard";
import { categories, type Product, type Collection } from "@/lib/data";

const ITEMS_PER_PAGE = 12;

interface Props {
  products: Product[];
  collections: Collection[];
}

export default function ShopClient({ products, collections }: Props) {
  const { t, lang } = useLang();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") ?? "all";
  const initialCollection = searchParams.get("collection") ?? "all";
  const initialSort = searchParams.get("sort") ?? "popular";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedCollection, setSelectedCollection] = useState(initialCollection);
  const [sort, setSort] = useState(initialSort);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let list = [...products];
    if (selectedCategory !== "all") {
      list = list.filter((p) => p.category === selectedCategory);
    }
    if (selectedCollection !== "all") {
      list = list.filter((p) => p.collectionSlug === selectedCollection);
    }
    if (sort === "sale") return list.filter((p) => p.salePrice);
    if (sort === "new") return list.filter((p) => p.tags.includes("new"));
    if (sort === "picks") return list.filter((p) => p.tags.includes("picks"));
    if (sort === "popular") return list.sort((a, b) => (b.tags.includes("popular") ? 1 : 0) - (a.tags.includes("popular") ? 1 : 0));
    return list;
  }, [products, selectedCategory, selectedCollection, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const sortOptions: [string, string][] = [
    ["popular", t("popular")],
    ["new", t("newest")],
    ["sale", t("sale")],
    ["picks", t("nav_filter_picks")],
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brown-800 mb-8">{t("shop_title")}</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex-1">
          <label className="text-xs uppercase tracking-widest text-brown-400 font-semibold mb-2 block">{lang === "en" ? "Category" : "კატეგორია"}</label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => { setSelectedCategory("all"); setSelectedCollection("all"); setPage(1); }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${selectedCategory === "all" ? "bg-brown-700 text-cream border-brown-700" : "border-brown-300 text-brown-600 hover:border-brown-500"}`}
            >
              {t("all")}
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => { setSelectedCategory(cat.slug); setSelectedCollection("all"); setPage(1); }}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${selectedCategory === cat.slug ? "bg-brown-700 text-cream border-brown-700" : "border-brown-300 text-brown-600 hover:border-brown-500"}`}
              >
                {lang === "ge" ? cat.nameGe : cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {(selectedCategory === "all" || selectedCategory === "poster") && (
        <div className="mb-8">
          <label className="text-xs uppercase tracking-widest text-brown-400 font-semibold mb-2 block">{t("filter_by")}</label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => { setSelectedCollection("all"); setPage(1); }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${selectedCollection === "all" ? "bg-brown-700 text-cream border-brown-700" : "border-brown-300 text-brown-600 hover:border-brown-500"}`}
            >
              {t("all")}
            </button>
            {collections.map((col) => (
              <button
                key={col.slug}
                onClick={() => { setSelectedCollection(col.slug); setPage(1); }}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${selectedCollection === col.slug ? "bg-brown-700 text-cream border-brown-700" : "border-brown-300 text-brown-600 hover:border-brown-500"}`}
              >
                {lang === "ge" ? col.nameGe : col.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="sm:w-48">
          <label className="text-xs uppercase tracking-widest text-brown-400 font-semibold mb-2 block">{t("sort_by")}</label>
          <select
            value={sort}
            onChange={(e) => { setSort(e.target.value); setPage(1); }}
            className="w-full border border-brown-300 rounded-lg px-3 py-2 text-sm text-brown-700 bg-white focus:outline-none focus:border-brown-500"
          >
            {sortOptions.map(([val, label]) => (
              <option key={val} value={val}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid */}
      {paginated.length === 0 ? (
        <p className="text-brown-400 text-center py-20">{lang === "en" ? "No products found." : "პროდუქტი ვერ მოიძებნა."}</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {paginated.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`w-9 h-9 rounded-full text-sm font-semibold transition-colors ${n === page ? "bg-brown-700 text-cream" : "border border-brown-300 text-brown-600 hover:bg-brown-100"}`}
            >
              {n}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
