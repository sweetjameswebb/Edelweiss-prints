"use client";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import type { BlogPost } from "@/lib/data";

interface Props {
  post: BlogPost;
}

export default function BlogPostClient({ post }: Props) {
  const { t, lang } = useLang();

  const title = lang === "ge" ? post.titleGe : post.title;
  const excerpt = lang === "ge" ? post.excerptGe : post.excerpt;
  const body = (lang === "ge" ? post.bodyGe : post.body).length
    ? (lang === "ge" ? post.bodyGe : post.body)
    : [excerpt];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
      <Link href="/blog" className="text-terracotta-500 hover:text-terracotta-600 text-sm font-semibold transition-colors mb-8 inline-block">
        ← {t("blog_title")}
      </Link>

      <div className="w-full h-64 sm:h-80 rounded-2xl mb-8" style={{ backgroundColor: post.color + "66" }} />

      <time className="text-xs text-brown-400 uppercase tracking-widest">
        {new Date(post.date).toLocaleDateString(lang === "ge" ? "ka-GE" : "en-GB", {
          year: "numeric", month: "long", day: "numeric",
        })}
      </time>
      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brown-800 mt-3 mb-6 leading-tight">{title}</h1>
      <p className="text-brown-600 text-lg leading-relaxed mb-6 italic">{excerpt}</p>
      {body.map((paragraph, i) => (
        <p key={i} className="text-brown-600 leading-relaxed mb-4">{paragraph}</p>
      ))}

      <div className="mt-12 pt-8 border-t border-brown-200">
        <p className="text-brown-500 text-sm">{lang === "en" ? "Enjoyed this? Share it or explore our collection." : "მოგეწონა? გააზიარე ან ნახე კოლექცია."}</p>
        <Link href="/shop" className="mt-3 inline-block bg-terracotta-500 hover:bg-terracotta-600 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-colors">
          {lang === "en" ? "Browse Prints →" : "პრინტების ნახვა →"}
        </Link>
      </div>
    </div>
  );
}
