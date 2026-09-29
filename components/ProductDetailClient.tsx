"use client";
import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { categories, type Product } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import FramedPoster from "@/components/FramedPoster";

const sizes = [
  { label: "A4", price: 0 },
  { label: "A3", price: 10 },
  { label: "A2", price: 20 },
  { label: "A1", price: 35 },
];

const frames = [
  { id: "none",         label: { en: "No Frame",      ge: "ჩარჩო გარეშე" }, price: 0,  swatch: null      },
  { id: "light-linden", label: { en: "Light Linden",  ge: "ღია ლიპა"     }, price: 25, swatch: "#D4B896" },
  { id: "dark-linden",  label: { en: "Dark Linden",   ge: "მუქი ლიპა"    }, price: 25, swatch: "#7A4F30" },
  { id: "black",        label: { en: "Black Frame",   ge: "შავი ჩარჩო"   }, price: 20, swatch: "#1A1A1A" },
];

interface Props {
  product: Product;
  related: Product[];
}

export default function ProductDetailClient({ product, related }: Props) {
  const { t, lang } = useLang();
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState("A4");
  const [selectedFrame, setSelectedFrame] = useState("none");
  const [added, setAdded] = useState(false);

  const size = sizes.find((s) => s.label === selectedSize)!;
  const frame = frames.find((f) => f.id === selectedFrame)!;
  const basePrice = product.salePrice ?? product.price;
  const totalPrice = basePrice + size.price + frame.price;
  const name = lang === "ge" ? product.nameGe : product.name;
  const description = lang === "ge" ? product.descriptionGe : product.description;

  function handleAddToCart() {
    const frameLabel = frame.id === "none" ? "" : ` · ${frame.label[lang === "ge" ? "ge" : "en"]}`;
    addItem({ id: `${product.id}-${selectedFrame}`, name: `${name}${frameLabel}`, price: totalPrice, size: selectedSize });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  const category = categories.find((c) => c.slug === product.category);
  const categoryLabel = lang === "ge" ? category?.nameGe : category?.name;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-xs text-brown-400 mb-6 flex items-center gap-1.5">
        <Link href="/" className="hover:text-brown-600">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-brown-600">{t("nav_prints")}</Link>
        <span>/</span>
        <span className="text-brown-600">{name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Image */}
        <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden">
          <FramedPoster
            title={name}
            placeholderColor={product.color}
            image={product.image}
            className="w-full h-full"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-brown-400 mb-1">
              {product.category === "poster" && product.collection ? product.collection : categoryLabel}
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brown-800 leading-tight">{name}</h1>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-bold text-brown-800">₾{totalPrice}</span>
            {product.salePrice && (
              <span className="text-brown-400 line-through text-lg">₾{product.price + size.price + frame.price}</span>
            )}
          </div>

          {/* Size selector */}
          <div>
            <p className="text-sm font-semibold text-brown-600 mb-3">{t("size")}</p>
            <div className="flex gap-3">
              {sizes.map((s) => (
                <button
                  key={s.label}
                  onClick={() => setSelectedSize(s.label)}
                  className={`flex-1 py-2.5 rounded-xl border text-sm font-semibold transition-colors ${
                    selectedSize === s.label
                      ? "bg-brown-700 text-cream border-brown-700"
                      : "border-brown-300 text-brown-600 hover:border-brown-500"
                  }`}
                >
                  {s.label}
                  {s.price > 0 && (
                    <span className="block text-[10px] mt-0.5 opacity-70">+₾{s.price}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Frame selector */}
          <div>
            <p className="text-sm font-semibold text-brown-600 mb-3">
              {lang === "en" ? "Frame" : "ჩარჩო"}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {frames.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFrame(f.id)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-sm transition-colors ${
                    selectedFrame === f.id
                      ? "border-brown-700 bg-brown-50"
                      : "border-brown-200 text-brown-500 hover:border-brown-400"
                  }`}
                >
                  {f.swatch ? (
                    <span className="w-4 h-4 rounded-full flex-shrink-0 border border-black/10" style={{ backgroundColor: f.swatch }} />
                  ) : (
                    <span className="w-4 h-4 rounded-full flex-shrink-0 border border-dashed border-brown-300" />
                  )}
                  <span className={`text-xs font-medium leading-tight ${selectedFrame === f.id ? "text-brown-800" : ""}`}>
                    {f.label[lang === "ge" ? "ge" : "en"]}
                    {f.price > 0 && <span className="block font-normal text-brown-400">+₾{f.price}</span>}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className={`w-full py-4 rounded-xl font-semibold text-sm transition-colors ${
              added
                ? "bg-sage-500 text-white"
                : "bg-terracotta-500 hover:bg-terracotta-600 text-white"
            }`}
          >
            {added ? (lang === "en" ? "Added to Cart ✓" : "კალათაში დაემატა ✓") : t("add_to_cart")}
          </button>

          {/* Description */}
          <div>
            <p className="text-sm font-semibold text-brown-600 mb-2">{t("description")}</p>
            <p className="text-brown-500 text-sm leading-relaxed">{description}</p>
          </div>

          {/* Delivery */}
          <div className="bg-cream-dark rounded-xl p-4 border border-brown-100">
            <p className="text-sm font-semibold text-brown-700 mb-1">📦 {t("delivery")}</p>
            <p className="text-brown-500 text-sm">{t("delivery_info")}</p>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="font-serif text-xl font-bold text-brown-800 mb-6">
            {product.category === "poster" && product.collection
              ? (lang === "en" ? "From the Same Collection" : "იმავე კოლექციიდან")
              : (lang === "en" ? "You May Also Like" : "ასევე შეიძლება მოგეწონოთ")}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
