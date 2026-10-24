import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen hero-background">
      <div className="relative z-10 pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-white transition">Главная</Link>
            <span>→</span>
            <span className="text-white">О проекте</span>
          </nav>

          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-8">
            <h1 className="text-4xl font-bold text-white mb-4">🎣 О проекте "Точка Клёва"</h1>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p><strong className="text-white">"Точка Клёва"</strong> — это маркетплейс и сообщество для рыболовов России. Мы создали место, где можно не только купить и продать снасти, но и поделиться опытом, найти компанию для рыбалки и узнать прогноз клёва.</p>
              <h2 className="text-2xl font-bold text-white mt-6">🎯 Наша миссия</h2>
              <p>Объединить рыболовов в одном месте, где каждый — от новичка до профи — найдёт всё необходимое для любимого хобби.</p>
              <h2 className="text-2xl font-bold text-white mt-6">✨ Что мы предлагаем</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Маркетплейс рыболовных снастей</li>
                <li>Лента отчётов с реальных рыбалок</li>
                <li>Интерактивная карта водоёмов</li>
                <li>Прогноз клёва на основе погоды</li>
                <li>Общий чат рыбаков</li>
                <li>Система достижений и рейтингов</li>
              </ul>
              <h2 className="text-2xl font-bold text-white mt-6"> Для кого</h2>
              <p>Для всех, кто любит рыбалку: спиннингистов, фидеристов, поплавочников, зимних рыбаков и любителей кемпинга.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}