"use client";
import Link from "next/link";
import { useState } from "react";
import { useLang } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLang();
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-brown-800 text-brown-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <p className="text-2xl font-serif font-bold text-cream mb-1">Edelweiss</p>
          <p className="text-xs uppercase tracking-widest text-brown-400 mb-4">Prints</p>
          <p className="text-sm text-brown-300 leading-relaxed">
            Art prints & handmade wooden frames from Tbilisi, Georgia.
          </p>
          <div className="flex gap-3 mt-5">
            <a href="https://instagram.com/edelweiss.prints" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
              className="w-9 h-9 rounded-full bg-brown-700 flex items-center justify-center hover:bg-terracotta-500 transition-colors">
              <svg className="w-4 h-4 text-cream" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
              className="w-9 h-9 rounded-full bg-brown-700 flex items-center justify-center hover:bg-terracotta-500 transition-colors">
              <svg className="w-4 h-4 text-cream" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-brown-400 mb-4">{t("footer_links")}</p>
          <ul className="flex flex-col gap-2 text-sm">
            {[
              [t("footer_blog"), "/blog"],
              [t("footer_about"), "/about"],
              [t("nav_prints"), "/shop"],
              [t("footer_terms"), "/terms"],
              [t("footer_privacy"), "/privacy"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="hover:text-cream transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-brown-400 mb-4">{t("contact_title")}</p>
          <ul className="flex flex-col gap-2 text-sm text-brown-300">
            <li>
              <a href="tel:+995577556596" className="hover:text-cream transition-colors">+995 577 556 596</a>
            </li>
            <li>
              <a href="mailto:magic@edelweiss.ge" className="hover:text-cream transition-colors">magic@edelweiss.ge</a>
            </li>
            <li>
              <a href="https://instagram.com/edelweiss.prints" target="_blank" rel="noopener noreferrer" className="hover:text-cream transition-colors">@edelweiss.prints</a>
            </li>
            <li className="mt-2 text-brown-400 text-xs">Tbilisi, Georgia</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-brown-400 mb-4">{t("footer_newsletter")}</p>
          <p className="text-sm text-brown-300 mb-3">New prints, sales & stories — right in your inbox.</p>
          <form
            onSubmit={(e) => { e.preventDefault(); setEmail(""); }}
            className="flex gap-2"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("footer_newsletter_placeholder")}
              className="flex-1 bg-brown-700 border border-brown-600 rounded-lg px-3 py-2 text-sm text-cream placeholder-brown-400 focus:outline-none focus:border-terracotta-400"
            />
            <button
              type="submit"
              className="bg-terracotta-500 hover:bg-terracotta-600 text-white text-sm font-medium px-3 py-2 rounded-lg transition-colors"
            >
              {t("footer_subscribe")}
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-brown-700 py-4 px-4 sm:px-6 max-w-7xl mx-auto">
        <p className="text-xs text-brown-500 text-center">{t("footer_copyright")}</p>
      </div>
    </footer>
  );
}
