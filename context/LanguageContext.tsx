"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "en" | "ge";

type T = Record<string, string>;

const translations: Record<Lang, T> = {
  en: {
    // Nav
    nav_prints: "Prints",
    nav_lanterns: "Lanterns",
    nav_decor: "Decor",
    nav_stickers: "Stickers",
    nav_frames: "Frames",
    nav_filter_sale: "Sale",
    nav_filter_popular: "Popular",
    nav_filter_new: "New",
    nav_filter_picks: "Our Picks",
    nav_col_georgian: "Georgian Retro",
    nav_col_cinema: "Cinema & Theatre",
    nav_col_japanese: "Japanese Ukiyo-e",
    nav_col_nouveau: "Art Nouveau",
    nav_col_art: "Art",
    nav_col_modern: "Modern",
    nav_col_american: "American Retro",
    nav_col_european: "European Retro",
    nav_col_magazine: "Magazine Covers",
    nav_col_nostalgia: "Nostalgia",
    nav_col_propaganda: "Propaganda",
    nav_col_nature: "Nature",
    nav_col_kids: "Kids",
    nav_col_fun: "Fun & What Not",
    // Hero
    hero1_title: "Art for Every Wall",
    hero1_sub: "Discover unique prints curated for your space",
    hero2_title: "Made with Love in Tbilisi",
    hero2_sub: "Handcrafted wooden frames & premium art prints",
    hero3_title: "New Arrivals This Week",
    hero3_sub: "Fresh posters from Georgian and world artists",
    hero_cta: "Browse",
    // Sections
    hot_posters: "This Week's Hottest Posters 🔥",
    find_love: "Find What You Love 🌟",
    on_sale: "On Sale 🔥",
    full_collection: "Full Collection",
    customer_gallery: "Customer Gallery",
    gallery_cta: "Send us your photos and join our gallery",
    trust_shipping: "Worldwide Shipping",
    trust_frames: "Highest Quality Wooden Frames",
    trust_artists: "Support Local Artists",
    trust_payment: "Safe Online Payment",
    blog_preview: "From Our Blog",
    read: "Read",
    view: "View",
    quick_view: "Quick View",
    add_to_cart: "Add to Cart",
    // Shop
    shop_title: "All Prints",
    filter_by: "Filter by Collection",
    sort_by: "Sort by",
    all: "All",
    popular: "Popular",
    newest: "Newest",
    sale: "Sale",
    // Product
    size: "Size",
    description: "Description",
    delivery: "Delivery",
    delivery_info: "Free local pickup in Tbilisi. Shipping available across all of Georgia.",
    // About
    about_title: "Our Story",
    about_p1: "Edelweiss Prints was born from a simple belief: that beautiful art belongs in every Georgian home. We are a small studio based in the heart of Tbilisi, passionate about curating and printing unique posters that bring warmth, culture, and personality to any space.",
    about_p2: "From iconic Georgian retro posters to timeless Japanese woodblock prints and avant-garde propaganda art — our collection spans eras and continents. Every print is produced on premium archival paper, and many of our frames are handcrafted right here in Tbilisi.",
    about_mission: "Our mission is to make art accessible, celebrate Georgian creativity, and support local artists — one print at a time.",
    // Blog
    blog_title: "Our Blog",
    read_article: "Read Article",
    // Contact
    contact_title: "Get in Touch",
    contact_name: "Your Name",
    contact_email: "Your Email",
    contact_message: "Your Message",
    contact_send: "Send Message",
    contact_phone: "Phone",
    contact_address: "Address",
    contact_hours: "Pickup Hours",
    contact_hours_val: "Mon–Sat, 10:00–19:00",
    contact_shipping: "We ship across all of Georgia. Orders usually arrive within 2–3 business days.",
    // Footer
    footer_links: "Useful Links",
    footer_social: "Follow Us",
    footer_newsletter: "Newsletter",
    footer_newsletter_placeholder: "Your email address",
    footer_subscribe: "Subscribe",
    footer_copyright: "© Edelweiss 2025. All rights reserved.",
    footer_blog: "Blog",
    footer_about: "About",
    footer_terms: "Terms",
    footer_privacy: "Privacy Policy",
    sale_badge: "SALE",
  },
  ge: {
    nav_prints: "პოსტერები",
    nav_lanterns: "ფანარები",
    nav_decor: "დეკორი",
    nav_stickers: "სტიკერები",
    nav_frames: "ჩარჩოები",
    nav_filter_sale: "ფასდაკლება",
    nav_filter_popular: "პოპულარული",
    nav_filter_new: "სიახლე",
    nav_filter_picks: "ჩვენი არჩევანი",
    nav_col_georgian: "ქართული რეტრო",
    nav_col_cinema: "კინო და თეატრი",
    nav_col_japanese: "იაპონური უკიო-ე",
    nav_col_nouveau: "არ ნუვო",
    nav_col_art: "ხელოვნება",
    nav_col_modern: "მოდერნი",
    nav_col_american: "ამერიკული რეტრო",
    nav_col_european: "ევროპული რეტრო",
    nav_col_magazine: "ჟურნალის გარეკანები",
    nav_col_nostalgia: "ნოსტალგია",
    nav_col_propaganda: "პროპაგანდა",
    nav_col_nature: "ბუნება",
    nav_col_kids: "ბავშვებისთვის",
    nav_col_fun: "სახალისო",
    hero1_title: "ხელოვნება ყოველ კედელზე",
    hero1_sub: "აღმოაჩინე უნიკალური პრინტები შენი სივრცისთვის",
    hero2_title: "სიყვარულით გაკეთებული თბილისში",
    hero2_sub: "ხელნაკეთი ხის ჩარჩოები და პრემიუმ პოსტერები",
    hero3_title: "ახალი ჩამოსვლები ამ კვირაში",
    hero3_sub: "ახალი პოსტერები ქართველი და მსოფლიო მხატვრებისგან",
    hero_cta: "დათვალიერება",
    hot_posters: "ამ კვირის ყველაზე ცხელი პოსტერები 🔥",
    find_love: "იპოვე რაც გიყვარს 🌟",
    on_sale: "ფასდაკლებაზე 🔥",
    full_collection: "სრული კოლექცია",
    customer_gallery: "მყიდველთა გალერეა",
    gallery_cta: "გამოგვიგზავნე ფოტო და შემოგვიერთდი გალერეაში",
    trust_shipping: "მსოფლიო მიტანა",
    trust_frames: "უმაღლეს ხარისხის ხის ჩარჩოები",
    trust_artists: "მხარი დაუჭირე ადგილობრივ მხატვრებს",
    trust_payment: "უსაფრთხო ონლაინ გადახდა",
    blog_preview: "ჩვენი ბლოგი",
    read: "წაკითხვა",
    view: "ნახვა",
    quick_view: "სწრაფი ხედი",
    add_to_cart: "კალათაში დამატება",
    shop_title: "ყველა პრინტი",
    filter_by: "კოლექციით ფილტრი",
    sort_by: "დალაგება",
    all: "ყველა",
    popular: "პოპულარული",
    newest: "უახლესი",
    sale: "ფასდაკლება",
    size: "ზომა",
    description: "აღწერა",
    delivery: "მიტანა",
    delivery_info: "უფასო ადგილობრივი პიკაპი თბილისში. მიტანა საქართველოს მასშტაბით.",
    about_title: "ჩვენი ისტორია",
    about_p1: "Edelweiss Prints შეიქმნა მარტივი რწმენით: ლამაზი ხელოვნება ყოველ ქართულ სახლს ეკუთვნის. ჩვენ პატარა სტუდია ვართ თბილისის გულში, ვნებით გვიყვარს უნიკალური პოსტერების შერჩევა და ბეჭდვა.",
    about_p2: "ქართული რეტრო პოსტერებიდან იაპონურ გრავიურებამდე — ჩვენი კოლექცია მოიცავს ეპოქებს და კონტინენტებს. ყველა პრინტი იბეჭდება პრემიუმ ქაღალდზე, ხოლო ჩარჩოები ხელნაკეთია თბილისში.",
    about_mission: "ჩვენი მისიაა ხელოვნება ყველასთვის ხელმისაწვდომი გავხადოთ, ქართული შემოქმედება ვიდიდოთ — ერთი პრინტი ერთდროულად.",
    blog_title: "ბლოგი",
    read_article: "სტატიის წაკითხვა",
    contact_title: "დაგვიკავშირდი",
    contact_name: "სახელი",
    contact_email: "ელ. ფოსტა",
    contact_message: "შეტყობინება",
    contact_send: "გაგზავნა",
    contact_phone: "ტელეფონი",
    contact_address: "მისამართი",
    contact_hours: "პიკაპის საათები",
    contact_hours_val: "ორშ–შაბ, 10:00–19:00",
    contact_shipping: "ვაგზავნით საქართველოს მასშტაბით. შეკვეთა ჩვეულებრივ 2–3 სამუშაო დღეში ჩამოდის.",
    footer_links: "სასარგებლო ბმულები",
    footer_social: "გამოგვყევი",
    footer_newsletter: "სიახლეები",
    footer_newsletter_placeholder: "შენი ელ. ფოსტა",
    footer_subscribe: "გამოწერა",
    footer_copyright: "© Edelweiss 2025. ყველა უფლება დაცულია.",
    footer_blog: "ბლოგი",
    footer_about: "ჩვენ შესახებ",
    footer_terms: "პირობები",
    footer_privacy: "კონფიდენციალურობა",
    sale_badge: "ფასდ.",
  },
};

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LangCtx>({
  lang: "en",
  setLang: () => {},
  t: (k) => k,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const t = (key: string) => translations[lang][key] ?? key;
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
