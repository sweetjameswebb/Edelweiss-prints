"use client";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import type { BlogPost } from "@/lib/data";

interface Props {
  posts: BlogPost[];
}

export default function BlogListClient({ posts }: Props) {
  const { t, lang } = useLang();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brown-800 mb-10">{t("blog_title")}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article key={post.id} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-brown-100 hover:shadow-md transition-shadow flex flex-col">
            <div className="w-full h-52" style={{ backgroundColor: post.color + "66" }} />
            <div className="p-6 flex flex-col flex-1">
              <time className="text-xs text-brown-400 uppercase tracking-widest mb-2">
                {new Date(post.date).toLocaleDateString(lang === "ge" ? "ka-GE" : "en-GB", {
                  year: "numeric", month: "long", day: "numeric",
                })}
              </time>
              <h2 className="font-serif text-xl font-bold text-brown-800 mb-3 leading-snug">
                {lang === "ge" ? post.titleGe : post.title}
              </h2>
              <p className="text-brown-500 text-sm leading-relaxed flex-1 mb-5">
                {lang === "ge" ? post.excerptGe : post.excerpt}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="self-start bg-brown-100 hover:bg-terracotta-500 hover:text-white text-brown-700 text-xs font-semibold px-4 py-2 rounded-full transition-colors"
              >
                {t("read_article")} →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
