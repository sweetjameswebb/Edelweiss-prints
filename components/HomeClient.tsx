"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import ProductCard from "@/components/ProductCard";
import type { Product, Collection, BlogPost } from "@/lib/data";

const heroSlides = [
  { titleKey: "hero1_title", subKey: "hero1_sub", bg: "#C9B49A" },
  { titleKey: "hero2_title", subKey: "hero2_sub", bg: "#8B6E4E" },
  { titleKey: "hero3_title", subKey: "hero3_sub", bg: "#5A7D48" },
];

const trustItems: [string, string][] = [
  ["trust_shipping", "🌍"],
  ["trust_frames", "🪵"],
  ["trust_artists", "🎨"],
  ["trust_payment", "🔒"],
];

interface Props {
  products: Product[];
  collections: Collection[];
  blogPosts: BlogPost[];
}

export default function HomeClient({ products, collections, blogPosts }: Props) {
  const { t, lang } = useLang();
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setSlide((s) => (s + 1) % 3), 4500);
    return () => clearInterval(timer);
  }, []);

  const hotPosters = products.filter((p) => p.tags.includes("popular")).slice(0, 6);
  const onSale = products.filter((p) => p.salePrice).slice(0, 4);
  const fullCollection = products.slice(0, 8);

  return (
    <div>
      {/* Hero Slider */}
      <section className="relative w-full h-[70vh] min-h-[420px] overflow-hidden">
        {heroSlides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 flex items-center justify-center ${i === slide ? "opacity-100" : "opacity-0"}`}
            style={{ backgroundColor: s.bg }}
          >
            <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
              <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white drop-shadow-lg mb-4">
                {t(s.titleKey)}
              </h1>
              <p className="text-white/90 text-lg sm:text-xl mb-8 drop-shadow">
                {t(s.subKey)}
              </p>
              <Link
                href="/shop"
                className="inline-block bg-white text-brown-800 hover:bg-cream font-semibold px-8 py-3 rounded-full text-sm transition-colors shadow-lg"
              >
                {t("hero_cta")}
              </Link>
            </div>
            <div className="absolute inset-0 bg-black/20" />
          </div>
        ))}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${i === slide ? "bg-white" : "bg-white/40"}`}
            />
          ))}
        </div>
      </section>

      {/* Hottest Posters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brown-800 mb-6">{t("hot_posters")}</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {hotPosters.map((p) => (
            <div key={p.id} className="min-w-[200px] max-w-[200px] sm:min-w-[220px] sm:max-w-[220px]">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* Find What You Love */}
      <section className="bg-cream-dark py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brown-800 mb-8">{t("find_love")}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {collections.map((col) => (
              <Link
                key={col.slug}
                href={`/shop?collection=${col.slug}`}
                className="group relative rounded-2xl overflow-hidden aspect-square flex items-end p-4 hover:scale-[1.02] transition-transform shadow-sm"
                style={{ backgroundColor: col.color + "55" }}
              >
                <div className="absolute inset-0 opacity-60" style={{ background: `linear-gradient(to top, ${col.color}cc 0%, transparent 60%)` }} />
                <p className="relative z-10 font-serif font-semibold text-white text-sm leading-tight drop-shadow">
                  {lang === "ge" ? col.nameGe : col.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* On Sale */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brown-800 mb-6">{t("on_sale")}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {onSale.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Full Collection */}
      <section className="bg-cream-dark py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brown-800">{t("full_collection")}</h2>
            <Link href="/shop" className="text-terracotta-500 hover:text-terracotta-600 text-sm font-semibold transition-colors">
              {lang === "en" ? "View all →" : "ყველა →"}
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {fullCollection.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Customer Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brown-800 mb-2">{t("customer_gallery")}</h2>
          <p className="text-brown-500 text-sm">{t("gallery_cta")}</p>
          <a href="https://instagram.com/edelweiss.prints" target="_blank" rel="noopener noreferrer"
            className="inline-block mt-2 text-terracotta-500 hover:text-terracotta-600 font-semibold text-sm transition-colors">
            @edelweiss.prints
          </a>
        </div>
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
          {(["#C9B49A","#8B6E4E","#5A7D48","#C94B28","#B59878","#99B18A","#E56744","#6B5039"] as string[]).map((color, i) => (
            <div key={i} className={`w-full rounded-xl break-inside-avoid ${[48,64,52,40,60,44,56,48][i] ? "" : ""}`}
              style={{ backgroundColor: color + "88", height: `${[192,256,208,160,240,176,224,192][i]}px` }} />
          ))}
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-brown-700 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {trustItems.map(([key, emoji]) => (
              <div key={key} className="flex flex-col items-center gap-2">
                <span className="text-3xl">{emoji}</span>
                <p className="text-cream text-sm font-medium">{t(key)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brown-800 mb-8">{t("blog_preview")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-brown-100 hover:shadow-md transition-shadow">
              <div className="w-full h-40" style={{ backgroundColor: post.color + "66" }} />
              <div className="p-5">
                <h3 className="font-serif font-semibold text-brown-800 mb-2 leading-snug">
                  {lang === "ge" ? post.titleGe : post.title}
                </h3>
                <p className="text-brown-500 text-sm line-clamp-2 mb-4">
                  {lang === "ge" ? post.excerptGe : post.excerpt}
                </p>
                <Link href={`/blog/${post.slug}`} className="text-terracotta-500 hover:text-terracotta-600 text-sm font-semibold transition-colors">
                  {t("read")} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
