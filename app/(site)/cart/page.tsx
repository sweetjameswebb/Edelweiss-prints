"use client";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { t, lang } = useLang();
  const { items, removeItem, totalCount } = useCart();
  const total = items.reduce((acc, i) => acc + i.price * i.qty, 0);

  if (totalCount === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <p className="font-serif text-3xl text-brown-700 mb-4">
          {lang === "en" ? "Your cart is empty" : "კალათა ცარიელია"}
        </p>
        <Link href="/shop" className="inline-block mt-4 bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold px-8 py-3 rounded-full transition-colors">
          {lang === "en" ? "Start Shopping →" : "მაღაზია →"}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
      <h1 className="font-serif text-3xl font-bold text-brown-800 mb-8">
        {lang === "en" ? "Your Cart" : "შენი კალათა"}
      </h1>

      <div className="flex flex-col gap-4 mb-8">
        {items.map((item) => (
          <div key={`${item.id}-${item.size}`} className="flex items-center justify-between bg-white border border-brown-100 rounded-2xl p-4 sm:p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-brown-100 flex items-center justify-center">
                <span className="text-brown-400 text-xs font-semibold">{item.size}</span>
              </div>
              <div>
                <p className="font-semibold text-brown-800 text-sm">{item.name}</p>
                <p className="text-brown-400 text-xs mt-0.5">{item.size} · qty {item.qty}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <p className="font-semibold text-brown-800">₾{item.price * item.qty}</p>
              <button
                onClick={() => removeItem(item.id, item.size)}
                className="text-brown-300 hover:text-terracotta-500 transition-colors"
                aria-label="Remove"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-cream-dark rounded-2xl p-6 border border-brown-100 flex items-center justify-between">
        <div>
          <p className="text-brown-500 text-sm">{lang === "en" ? "Total" : "სულ"}</p>
          <p className="font-serif text-2xl font-bold text-brown-800">₾{total}</p>
        </div>
        <button className="bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold px-8 py-3 rounded-full transition-colors">
          {lang === "en" ? "Checkout" : "შეძენა"}
        </button>
      </div>

      <p className="text-center text-brown-400 text-xs mt-4">{t("delivery_info")}</p>
    </div>
  );
}
