import type { Metadata } from "next";
import "./globals.css";
import ScrollToTop from "@/components/layout/ScrollToTop";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Точка Клёва — маркетплейс рыболовных снастей",
  description: "Твоё место силы и честных снастей. Покупай и продавай рыболовные снасти по всей России.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="antialiased">
        <ScrollToTop />
        <Header />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
