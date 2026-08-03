"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import { blogPosts } from "@/lib/data";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t, lang } = useLang();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-brown-400">Post not found.</p>
        <Link href="/blog" className="mt-4 inline-block text-terracotta-500">← {t("blog_title")}</Link>
      </div>
    );
  }

  const title = lang === "ge" ? post.titleGe : post.title;
  const excerpt = lang === "ge" ? post.excerptGe : post.excerpt;

  const articleBodies: Record<string, string> = {
    "posters-in-interior-design": "Art prints are one of the most powerful ways to personalise a living space. Whether you prefer minimalist line drawings or bold graphic prints, the right poster can anchor a room, create a focal point, and express your personality without a single word. When hanging posters, consider grouping them in clusters of three or five for a gallery wall effect, or let a single large print stand alone as a statement piece. Pair warm-toned prints (terracotta, ochre, rust) with natural wood frames for a cosy, artisanal feel.",
    "propaganda-posters": "Propaganda posters are among the most visually compelling artefacts of the 20th century. Governments and movements from the Soviet Union to the United States commissioned the greatest graphic designers of their day to produce images capable of moving millions. Their secret? Bold colour contrasts, simple symbolic imagery, and an emotional directness that bypasses the rational mind. Today, vintage propaganda prints occupy a curious cultural space — simultaneously historical documents, graphic design masterclasses, and provocations to think about how images shape belief.",
    "history-of-the-poster": "The modern poster was born in 19th-century Paris, where Jules Chéret and later Henri de Toulouse-Lautrec used the newly perfected chromolithograph press to paste colour and movement across the walls of the city. For the first time, art came to the street — democratic, ephemeral, and powerful. The 20th century brought new printing technologies, new political urgencies, and new aesthetic movements: Art Nouveau, Constructivism, Bauhaus, Psychedelia. Today, digital printing has democratised poster production again, allowing small studios like ours to bring the world's visual heritage into homes across Georgia.",
  };

  const body = articleBodies[post.slug] ?? excerpt;

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
      <p className="text-brown-600 leading-relaxed">{body}</p>

      <div className="mt-12 pt-8 border-t border-brown-200">
        <p className="text-brown-500 text-sm">{lang === "en" ? "Enjoyed this? Share it or explore our collection." : "მოგეწონა? გააზიარე ან ნახე კოლექცია."}</p>
        <Link href="/shop" className="mt-3 inline-block bg-terracotta-500 hover:bg-terracotta-600 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-colors">
          {lang === "en" ? "Browse Prints →" : "პრინტების ნახვა →"}
        </Link>
      </div>
    </div>
  );
}
