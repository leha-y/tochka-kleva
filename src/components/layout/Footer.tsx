import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 py-12 px-4 bg-black/40 backdrop-blur-md border-t border-white/10">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-2xl">🎣</span>
          <span className="text-xl font-bold text-white">Точка Клёва</span>
        </div>
        <p className="text-gray-400 mb-6">Твоё место силы и честных снастей</p>
        <div className="flex justify-center gap-6 text-sm text-gray-400 mb-6">
          <Link href="/about" className="hover:text-white transition">О проекте</Link>
          <Link href="/rules" className="hover:text-white transition">Правила</Link>
          <Link href="/contacts" className="hover:text-white transition">Контакты</Link>
        </div>
        <p className="text-gray-500 text-sm">© 2026 Точка Клёва. Все права защищены.</p>
      </div>
    </footer>
  );
}