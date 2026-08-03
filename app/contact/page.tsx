"use client";
import { useState } from "react";
import { useLang } from "@/context/LanguageContext";

export default function ContactPage() {
  const { t } = useLang();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brown-800 mb-10">{t("contact_title")}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Form */}
        <div>
          {sent ? (
            <div className="bg-sage-50 border border-sage-200 rounded-2xl p-8 text-center">
              <p className="font-serif text-2xl text-sage-700 mb-2">✓</p>
              <p className="font-semibold text-sage-700 mb-1">Message sent!</p>
              <p className="text-sage-600 text-sm">We&apos;ll get back to you soon at magic@edelweiss.ge</p>
              <button onClick={() => setSent(false)} className="mt-4 text-terracotta-500 text-sm font-semibold hover:text-terracotta-600 transition-colors">
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="text-xs uppercase tracking-widest text-brown-400 font-semibold mb-1.5 block">{t("contact_name")}</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-brown-300 rounded-xl px-4 py-3 text-sm text-brown-800 bg-white focus:outline-none focus:border-brown-500 placeholder-brown-300"
                  placeholder={t("contact_name")}
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-brown-400 font-semibold mb-1.5 block">{t("contact_email")}</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-brown-300 rounded-xl px-4 py-3 text-sm text-brown-800 bg-white focus:outline-none focus:border-brown-500 placeholder-brown-300"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-brown-400 font-semibold mb-1.5 block">{t("contact_message")}</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full border border-brown-300 rounded-xl px-4 py-3 text-sm text-brown-800 bg-white focus:outline-none focus:border-brown-500 placeholder-brown-300 resize-none"
                  placeholder={t("contact_message")}
                />
              </div>
              <button
                type="submit"
                className="bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
              >
                {t("contact_send")}
              </button>
            </form>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-6">
          <div className="bg-cream-dark rounded-2xl p-6 border border-brown-100">
            <p className="text-xs uppercase tracking-widest text-brown-400 font-semibold mb-4">
              {t("contact_phone")}
            </p>
            <a href="tel:+995577556596" className="text-brown-700 font-semibold hover:text-terracotta-500 transition-colors text-lg">
              +995 577 556 596
            </a>
          </div>
          <div className="bg-cream-dark rounded-2xl p-6 border border-brown-100">
            <p className="text-xs uppercase tracking-widest text-brown-400 font-semibold mb-4">Email</p>
            <a href="mailto:magic@edelweiss.ge" className="text-brown-700 font-semibold hover:text-terracotta-500 transition-colors">
              magic@edelweiss.ge
            </a>
            <p className="mt-2 text-brown-400 text-sm">@edelweiss.prints</p>
          </div>
          <div className="bg-cream-dark rounded-2xl p-6 border border-brown-100">
            <p className="text-xs uppercase tracking-widest text-brown-400 font-semibold mb-4">{t("contact_address")}</p>
            <p className="text-brown-700 font-semibold">Tbilisi, Georgia</p>
            <p className="text-brown-400 text-sm mt-1">საქართველო, თბილისი</p>
          </div>
          <div className="bg-cream-dark rounded-2xl p-6 border border-brown-100">
            <p className="text-xs uppercase tracking-widest text-brown-400 font-semibold mb-4">{t("contact_hours")}</p>
            <p className="text-brown-700 font-semibold">{t("contact_hours_val")}</p>
          </div>
          <div className="bg-terracotta-50 border border-terracotta-200 rounded-2xl p-6">
            <p className="text-sm text-terracotta-700 leading-relaxed">📦 {t("contact_shipping")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
