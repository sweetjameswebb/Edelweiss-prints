"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";

const collections = [
  ["nav_col_georgian", "georgian-retro"],
  ["nav_col_cinema", "cinema-theatre"],
  ["nav_col_japanese", "japanese"],
  ["nav_col_nouveau", "art-nouveau"],
  ["nav_col_art", "art"],
  ["nav_col_modern", "modern"],
  ["nav_col_american", "american-retro"],
  ["nav_col_european", "european-retro"],
  ["nav_col_magazine", "magazine-covers"],
  ["nav_col_nostalgia", "nostalgia"],
  ["nav_col_propaganda", "propaganda"],
  ["nav_col_nature", "nature"],
  ["nav_col_kids", "kids"],
  ["nav_col_fun", "fun"],
];

const filters = [
  ["nav_filter_sale", "sale"],
  ["nav_filter_popular", "popular"],
  ["nav_filter_new", "new"],
  ["nav_filter_picks", "picks"],
];

export default function Navbar() {
  const { t, lang, setLang } = useLang();
  const { totalCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [printsOpen, setPrintsOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setPrintsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-cream border-b border-brown-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-serif font-bold text-brown-700 tracking-tight group-hover:text-terracotta-500 transition-colors">
            Edelweiss
          </span>
          <span className="text-xs uppercase tracking-widest text-brown-400 mt-1 hidden sm:block">Prints</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-brown-600">
          {/* Prints mega dropdown */}
          <div className="relative" ref={dropRef}>
            <button
              className="flex items-center gap-1 hover:text-terracotta-500 transition-colors py-2"
              onClick={() => setPrintsOpen((v) => !v)}
            >
              {t("nav_prints")}
              <svg className={`w-3.5 h-3.5 transition-transform ${printsOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {printsOpen && (
              <div className="absolute left-0 top-full mt-1 w-[600px] bg-white border border-brown-200 rounded-xl shadow-xl p-6 grid grid-cols-2 gap-6 z-50">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-brown-400 mb-3">{t("filter_by")}</p>
                  <div className="flex flex-col gap-2">
                    {filters.map(([key, val]) => (
                      <Link
                        key={val}
                        href={`/shop?sort=${val}`}
                        className="text-brown-700 hover:text-terracotta-500 transition-colors"
                        onClick={() => setPrintsOpen(false)}
                      >
                        {t(key)}
                      </Link>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-brown-400 mb-3">{lang === "en" ? "Collections" : "კოლექციები"}</p>
                  <div className="grid grid-cols-2 gap-1">
                    {collections.map(([key, val]) => (
                      <Link
                        key={val}
                        href={`/shop?collection=${val}`}
                        className="text-brown-700 hover:text-terracotta-500 transition-colors text-sm"
                        onClick={() => setPrintsOpen(false)}
                      >
                        {t(key)}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          <Link href="/shop?category=lantern" className="hover:text-terracotta-500 transition-colors">{t("nav_lanterns")}</Link>
          <Link href="/shop?category=decor" className="hover:text-terracotta-500 transition-colors">{t("nav_decor")}</Link>
          <Link href="/shop?category=sticker" className="hover:text-terracotta-500 transition-colors">{t("nav_stickers")}</Link>
          <Link href="/shop?category=frame" className="hover:text-terracotta-500 transition-colors">{t("nav_frames")}</Link>
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          {/* Language switcher */}
          <div className="flex items-center border border-brown-300 rounded-full overflow-hidden text-xs font-semibold">
            <button
              className={`px-2.5 py-1 transition-colors ${lang === "en" ? "bg-brown-700 text-cream" : "text-brown-500 hover:text-brown-700"}`}
              onClick={() => setLang("en")}
            >
              EN
            </button>
            <button
              className={`px-2.5 py-1 transition-colors ${lang === "ge" ? "bg-brown-700 text-cream" : "text-brown-500 hover:text-brown-700"}`}
              onClick={() => setLang("ge")}
            >
              GE
            </button>
          </div>

          {/* Cart */}
          <Link href="/cart" className="relative p-1.5 text-brown-600 hover:text-terracotta-500 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {totalCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-terracotta-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {totalCount}
              </span>
            )}
          </Link>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-1.5 text-brown-600"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-brown-200 px-4 py-4 flex flex-col gap-3 text-sm font-medium text-brown-700">
          <Link href="/shop" onClick={() => setMenuOpen(false)} className="hover:text-terracotta-500">{t("nav_prints")}</Link>
          <Link href="/shop?category=lantern" onClick={() => setMenuOpen(false)} className="hover:text-terracotta-500">{t("nav_lanterns")}</Link>
          <Link href="/shop?category=decor" onClick={() => setMenuOpen(false)} className="hover:text-terracotta-500">{t("nav_decor")}</Link>
          <Link href="/shop?category=sticker" onClick={() => setMenuOpen(false)} className="hover:text-terracotta-500">{t("nav_stickers")}</Link>
          <Link href="/shop?category=frame" onClick={() => setMenuOpen(false)} className="hover:text-terracotta-500">{t("nav_frames")}</Link>
          <hr className="border-brown-200" />
          <p className="text-xs uppercase tracking-widest text-brown-400">{lang === "en" ? "Collections" : "კოლექციები"}</p>
          {collections.map(([key, val]) => (
            <Link key={val} href={`/shop?collection=${val}`} onClick={() => setMenuOpen(false)} className="pl-2 hover:text-terracotta-500">
              {t(key)}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
