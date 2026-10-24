import Link from "next/link";

const mockReports = [
  {
    id: 1,
    author: "Алексей",
    avatar: "А",
    location: "р. Вятка, Киров",
    date: "2 часа назад",
    fishType: "Судак",
    weight: "1.8 кг",
    lure: "Джиг, виброхвост",
    description: "Отличная рыбалка с утра! Клёв начался в 6:00, поймал трёх судаков. Вода прозрачная, глубина 4 метра.",
    likes: 24,
    comments: 8,
    images: 3,
  },
  {
    id: 2,
    author: "Дмитрий",
    avatar: "Д",
    location: "оз. Орловское, Кировская обл.",
    date: "5 часов назад",
    fishType: "Щука",
    weight: "3.2 кг",
    lure: "Воблер ZipBaits",
    description: "Щука взяла на первом же забросе! Боролись минут 10, но всё-таки вытащил. Отпустил обратно — пусть растёт.",
    likes: 18,
    comments: 5,
    images: 2,
  },
  {
    id: 3,
    author: "Иван",
    avatar: "И",
    location: "р. Чепца, Киров",
    date: "Вчера",
    fishType: "Лещ",
    weight: "1.8 кг",
    lure: "Фидер, опарыш",
    description: "Ночная рыбалка удалась! Поймал леща почти на 2 кг. Прикормка сработала отлично.",
    likes: 31,
    comments: 12,
    images: 4,
  },
  {
    id: 4,
    author: "Сергей",
    avatar: "С",
    location: "Воткинское водохранилище",
    date: "Вчера",
    fishType: "Окунь",
    weight: "0.8 кг",
    lure: "Блесна вращающаяся",
    description: "Мелкий окунь клевал активно, но крупный не попадался. Зато атмосфера на водоёме потрясающая!",
    likes: 12,
    comments: 3,
    images: 1,
  },
  {
    id: 5,
    author: "Михаил",
    avatar: "М",
    location: "р. Кама, Пермский край",
    date: "2 дня назад",
    fishType: "Сом",
    weight: "8.5 кг",
    lure: "Квок, живец",
    description: "Вот это трофей! Сом взял на квок около 23:00. Вываживание заняло 20 минут. Руки до сих пор болят!",
    likes: 67,
    comments: 23,
    images: 5,
  },
  {
    id: 6,
    author: "Андрей",
    avatar: "А",
    location: "оз. Светлое, Кировская обл.",
    date: "3 дня назад",
    fishType: "Карась",
    weight: "0.5 кг",
    lure: "Поплавок, червь",
    description: "Семейная рыбалка с сыном. Он поймал своего первого карася! Счастью не было предела.",
    likes: 45,
    comments: 15,
    images: 3,
  },
];

export default function ReportsPage() {
  return (
    <div className="min-h-screen hero-background">
      <div className="relative z-10 pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          
          {/* ХЛЕБНЫЕ КРОШКИ */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-white transition">Главная</Link>
            <span>→</span>
            <span className="text-white">С водоёма</span>
          </nav>

          {/* ЗАГОЛОВОК */}
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">📍 С водоёма</h1>
                <p className="text-gray-300 text-sm">Отчёты рыбаков с реальных рыбалок</p>
              </div>
              <Link
                href="/add-report"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                + Добавить отчёт
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* ФИЛЬТРЫ СЛЕВА */}
            <aside className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-5 h-fit">
              <h3 className="text-lg font-bold text-white mb-4">Фильтры</h3>
              
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-300 mb-2">Вид рыбы</h4>
                <select className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm">
                  <option>Все виды</option>
                  <option>Судак</option>
                  <option>Щука</option>
                  <option>Окунь</option>
                  <option>Лещ</option>
                  <option>Сом</option>
                  <option>Карась</option>
                </select>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-300 mb-2">Водоём</h4>
                <input
                  type="text"
                  placeholder="Название водоёма"
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder-gray-400"
                />
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-300 mb-2">Период</h4>
                <select className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm">
                  <option>За всё время</option>
                  <option>Сегодня</option>
                  <option>Вчера</option>
                  <option>За неделю</option>
                  <option>За месяц</option>
                </select>
              </div>

              <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-semibold">
                Применить
              </button>
            </aside>

            {/* ЛЕНТА ОТЧЁТОВ */}
            <div className="lg:col-span-3 space-y-4">
              {mockReports.map((report) => (
                <article
                  key={report.id}
                  className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-5 hover:bg-white/15 transition"
                >
                  {/* ШАПКА ОТЧЁТА */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                      {report.avatar}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold text-sm">{report.author}</h4>
                      <p className="text-gray-400 text-xs">📍 {report.location} · {report.date}</p>
                    </div>
                  </div>

                  {/* ФОТО + ОПИСАНИЕ */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                    <div className="md:col-span-1 aspect-square bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg flex items-center justify-center">
                      <span className="text-4xl opacity-30">🐟</span>
                    </div>
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="px-2 py-1 bg-blue-600/30 text-blue-300 text-xs rounded-full border border-blue-500/30">
                          {report.fishType}
                        </span>
                        <span className="text-gray-300 text-xs font-semibold">{report.weight}</span>
                        <span className="text-gray-500 text-xs">·</span>
                        <span className="text-gray-400 text-xs">{report.lure}</span>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">{report.description}</p>
                    </div>
                  </div>

                  {/* ДЕЙСТВИЯ */}
                  <div className="flex items-center gap-4 pt-3 border-t border-white/10">
                    <button className="flex items-center gap-1 text-gray-400 hover:text-red-400 transition text-sm">
                      <span>❤️</span>
                      <span>{report.likes}</span>
                    </button>
                    <button className="flex items-center gap-1 text-gray-400 hover:text-blue-400 transition text-sm">
                      <span>💬</span>
                      <span>{report.comments} комментариев</span>
                    </button>
                    <button className="flex items-center gap-1 text-gray-400 hover:text-green-400 transition text-sm ml-auto">
                      <span>📷</span>
                      <span>{report.images} фото</span>
                    </button>
                  </div>
                </article>
              ))}

              {/* КНОПКА "ПОКАЗАТЬ ЕЩЁ" */}
              <button className="w-full py-3 bg-blue-600/30 text-blue-300 rounded-lg hover:bg-blue-600/50 transition font-semibold border border-blue-500/30">
                Показать ещё отчёты
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}