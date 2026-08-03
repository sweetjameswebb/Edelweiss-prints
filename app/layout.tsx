import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/context/LanguageContext";
import { CartProvider } from "@/context/CartContext";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Edelweiss Prints — Art Posters from Tbilisi",
  description:
    "Unique art prints, posters, and handmade wooden frames from Tbilisi, Georgia. Georgian Retro, Cinema, Japanese, Propaganda and more.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} font-sans antialiased bg-cream`}>
        <LanguageProvider>
          <CartProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
