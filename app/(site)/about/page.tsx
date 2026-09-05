"use client";
import { useLang } from "@/context/LanguageContext";

export default function AboutPage() {
  const { t, lang } = useLang();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="font-serif text-3xl sm:text-5xl font-bold text-brown-800 mb-10">{t("about_title")}</h1>

      {/* Photo placeholder */}
      <div
        className="w-full h-72 sm:h-96 rounded-2xl mb-10 flex items-center justify-center"
        style={{ backgroundColor: "#C9B49A55" }}
      >
        <div className="w-1/2 h-1/2 rounded-xl" style={{ backgroundColor: "#8B6E4E66" }} />
      </div>

      <div className="prose prose-brown max-w-none">
        <p className="text-brown-600 text-lg leading-relaxed mb-6">{t("about_p1")}</p>
        <p className="text-brown-600 text-lg leading-relaxed mb-8">{t("about_p2")}</p>

        <div className="bg-cream-dark border border-brown-200 rounded-2xl p-6 sm:p-8">
          <p className="font-serif text-xl sm:text-2xl text-brown-700 italic leading-relaxed">
            &ldquo;{t("about_mission")}&rdquo;
          </p>
        </div>
      </div>

      {/* Team placeholder */}
      <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { name: "Nino T.", role: lang === "en" ? "Founder & Curator" : "დამფუძნებელი", color: "#C94B2866" },
          { name: "Giorgi M.", role: lang === "en" ? "Print Production" : "ბეჭდვა", color: "#8B6E4E66" },
          { name: "Tamar L.", role: lang === "en" ? "Frame Craftsperson" : "ჩარჩოს ოსტატი", color: "#5A7D4866" },
        ].map((member) => (
          <div key={member.name} className="text-center">
            <div className="w-24 h-24 rounded-full mx-auto mb-3" style={{ backgroundColor: member.color }} />
            <p className="font-serif font-semibold text-brown-800">{member.name}</p>
            <p className="text-brown-400 text-sm">{member.role}</p>
          </div>
        ))}
      </div>

      {/* Contact CTA */}
      <div className="mt-14 text-center">
        <p className="text-brown-500 mb-4">{lang === "en" ? "Have a question or custom order?" : "გაქვს შეკითხვა ან სპეციალური შეკვეთა?"}</p>
        <a
          href="/contact"
          className="inline-block bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold px-8 py-3 rounded-full transition-colors"
        >
          {t("contact_title")}
        </a>
      </div>
    </div>
  );
}
