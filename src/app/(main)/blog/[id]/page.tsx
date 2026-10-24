"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { BookOpen, Compass, Snowflake, Clock, ArrowLeft } from "lucide-react";

const articles = [
  { id: 1, title: "Как выбрать спиннинг новичку", excerpt: "Полный гид по выбору удилища: длина, тест, строй. Разбираем популярные модели до 5000 Р.", readTime: "7 мин", icon: BookOpen, color: "from-blue-500 to-blue-600", content: "Выбор первого спиннинга — ответственное дело. Основные параметры: длина (2.1-2.7 м для берега), тест (5-25 г универсальный), строй (быстрый для джига, средний для воблеров). Популярные бренды: Shimano, Daiwa, Major Craft. Бюджет до 5000 Р — реальный выбор для новичка." },
  { id: 2, title: "Топ-5 мест для рыбалки в Кирове", excerpt: "Подборка лучших водоёмов региона с координатами, описанием подъездов и видом рыбы.", readTime: "5 мин", icon: Compass, color: "from-green-500 to-green-600", content: "1. р. Вятка — щука, судак, окунь. 2. оз. Орловское — карась, линь. 3. Воткинское водохранилище — судак, лещ. 4. р. Чепца — хариус, голавль. 5. пруды у д. Бахта — карп, карась. Координаты и подъезды уточняйте на карте сайта." },
  { id: 3, title: "Зимняя рыбалка: секреты успеха", excerpt: "Как ловить со льда: выбор места, снасти, прикормка. Советы опытных зимников.", readTime: "10 мин", icon: Snowflake, color: "from-purple-500 to-purple-600", content: "Зимняя рыбалка требует особой подготовки. Снасти: мормышка, блесна, балансир. Прикормка: мотыль, опарыш, сухие смеси. Безопасность: толщина льда от 10 см. Лучшие часы: рассвет и закат. Не забывайте про термос и тёплую одежду!" },
];

export default function ArticleDetailPage() {
  const params = useParams();
  const article = articles.find(a => a.id === Number(params.id));

  if (!article) {
    return (
      <div className="min-h-screen hero-background flex items-center justify-center">
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-8 text-center">
          <div className="text-5xl mb-4">🤔</div>
          <h2 className="text-2xl font-bold text-white mb-2">Статья не найдена</h2>
          <Link href="/blog" className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
            ← Вернуться к блогу
          </Link>
        </div>
      </div>
    );
  }

  const Icon = article.icon;

  return (
    <div className="min-h-screen hero-background">
      <div className="relative z-10 pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-white transition">Главная</Link>
            <span>→</span>
            <Link href="/blog" className="hover:text-white transition">Блог</Link>
            <span>→</span>
            <span className="text-white">{article.title}</span>
          </nav>

          <Link href="/blog" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6 transition">
            <ArrowLeft className="w-4 h-4" /> Назад к блогу
          </Link>

          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className={`p-4 rounded-lg bg-gradient-to-br ${article.color}`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{article.title}</h1>
                <span className="text-gray-400 flex items-center gap-1"><Clock className="w-4 h-4" /> {article.readTime}</span>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <p className="text-gray-300 leading-relaxed text-lg">{article.content}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}