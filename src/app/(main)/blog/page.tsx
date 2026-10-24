import Link from "next/link";
import { BookOpen, Compass, Snowflake, Clock } from "lucide-react";

const articles = [
  {
    id: 1,
    title: "Как выбрать спиннинг новичку",
    excerpt: "Полный гид по выбору удилища: длина, тест, строй. Разбираем популярные модели до 5000 Р.",
    readTime: "7 мин",
    icon: BookOpen,
    color: "from-blue-500 to-blue-600"
  },
  {
    id: 2,
    title: "Топ-5 мест для рыбалки в Кирове",
    excerpt: "Подборка лучших водоёмов региона с координатами, описанием подъездов и видом рыбы.",
    readTime: "5 мин",
    icon: Compass,
    color: "from-green-500 to-green-600"
  },
  {
    id: 3,
    title: "Зимняя рыбалка: секреты успеха",
    excerpt: "Как ловить со льда: выбор места, снасти, прикормка. Советы опытных зимников.",
    readTime: "10 мин",
    icon: Snowflake,
    color: "from-purple-500 to-purple-600"
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen hero-background">
      <div className="relative z-10 pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-white transition">Главная</Link>
            <span>→</span>
            <span className="text-white">Блог</span>
          </nav>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Полезные статьи</h1>
            <p className="text-gray-300 text-lg">Советы от опытных рыбаков</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => {
              const Icon = article.icon;
              return (
                <div key={article.id} className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 hover:bg-white/15 transition group">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${article.color}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-gray-400 text-sm flex items-center gap-1">
                      <Clock className="w-4 h-4" /> {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition">{article.title}</h3>
                  
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">{article.excerpt}</p>

                  <Link href={`/blog/${article.id}`} className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition">
                    Читать →
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link href="/blog" className="inline-block px-8 py-4 bg-blue-600/30 border border-blue-500/30 text-white rounded-lg hover:bg-blue-600/50 transition font-semibold">
              Все статьи блога
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}