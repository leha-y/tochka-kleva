import Link from "next/link";
import { Flame, Star, MessageSquare, ArrowLeft, TrendingUp, Eye, ThumbsUp } from "lucide-react";

const lureReviews = [
  {
    id: 1,
    name: "ZipBaits Rigge 58S",
    category: "Воблер",
    rating: 4.9,
    reviews: 127,
    views: 3420,
    likes: 89,
    description: "Легендарный воблер-суспендер японского производства. Идеален для ловли щуки на мелководье. Работает как на твичинге, так и на равномерной проводке.",
    pros: ["Отличная игра", "Держит струю", "Уловистый"],
    cons: ["Высокая цена", "Хрупкий"],
    bestFor: "Щука, окунь",
    season: "Весна, Осень",
    price: "1 200 ₽"
  },
  {
    id: 2,
    name: "Keitech Swing Impact",
    category: "Силикон",
    rating: 4.8,
    reviews: 94,
    views: 2890,
    likes: 76,
    description: "Уникальный виброхвост с плоским хвостом. Создаёт мощные колебания в воде, привлекая хищника с большого расстояния. Отлично работает по пассивной рыбе.",
    pros: ["Реалистичная игра", "Долговечный", "Много цветов"],
    cons: ["Нужен правильный монтаж"],
    bestFor: "Судак, щука, окунь",
    season: "Круглый год",
    price: "350 ₽"
  },
  {
    id: 3,
    name: "Duo Realis Jerkbait",
    category: "Воблер",
    rating: 4.7,
    reviews: 83,
    views: 2150,
    likes: 62,
    description: "Минноу с заглублением до 1 метра. Отлично работает на твичинге. Привлекает щуку агрессивной игрой. Проверен на многих водоёмах России.",
    pros: ["Стабильная игра", "Хорошие крючки", "Далеко летит"],
    cons: ["Не любит сильное течение"],
    bestFor: "Щука, жерех",
    season: "Лето, Осень",
    price: "980 ₽"
  },
  {
    id: 4,
    name: "Megabass Vision 110",
    category: "Воблер",
    rating: 4.9,
    reviews: 156,
    views: 5240,
    likes: 134,
    description: "Премиальный воблер-суспендер. Считается одним из лучших воблеров в мире для ловли щуки. Идеальный баланс и игра.",
    pros: ["Премиум качество", "Уловистость", "Дизайн"],
    cons: ["Очень дорогой", "Много подделок"],
    bestFor: "Щука",
    season: "Весна, Осень",
    price: "2 100 ₽"
  },
  {
    id: 5,
    name: "Rapala X-Rap",
    category: "Воблер",
    rating: 4.6,
    reviews: 201,
    views: 4120,
    likes: 98,
    description: "Классический воблер от финского производителя. Проверен временем и тысячами рыбаков. Отличное соотношение цены и качества.",
    pros: ["Доступная цена", "Надёжность", "Универсальность"],
    cons: ["Не всегда работает по пассивной рыбе"],
    bestFor: "Щука, окунь, судак",
    season: "Круглый год",
    price: "750 ₽"
  },
  {
    id: 6,
    name: "Yo-Zuri Crystal Minnow",
    category: "Воблер",
    rating: 4.5,
    reviews: 67,
    views: 1890,
    likes: 45,
    description: "Прозрачный воблер с голографическим эффектом. Отлично работает в прозрачной воде. Привлекает рыбу визуальным эффектом.",
    pros: ["Голография", "Дальний заброс", "Разные размеры"],
    cons: ["Слабые крючки"],
    bestFor: "Жерех, голавль",
    season: "Лето",
    price: "680 ₽"
  }
];

export default function LureNewsPage() {
  return (
    <div className="min-h-screen hero-background">
      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-24 pb-12">
        
        {/* Хлебные крошки */}
        <div className="flex items-center gap-2 text-gray-400 text-sm mb-6">
          <Link href="/" className="hover:text-white transition flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Главная
          </Link>
          <span>→</span>
          <span className="text-white">Обзоры приманок</span>
        </div>

        {/* Заголовок */}
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 mb-6">
          <h1 className="text-4xl font-bold text-white flex items-center gap-3 mb-2">
            <Flame className="w-10 h-10 text-orange-400" /> Обзоры приманок
          </h1>
          <p className="text-gray-300">Рейтинг лучших приманок по отзывам рыбаков</p>
          <div className="flex items-center gap-4 mt-4 text-sm text-gray-400">
            <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> 19 710 просмотров</span>
            <span className="flex items-center gap-1"><MessageSquare className="w-4 h-4" /> 728 отзывов</span>
            <span className="flex items-center gap-1"><ThumbsUp className="w-4 h-4" /> 504 лайка</span>
          </div>
        </div>

        {/* Сетка обзоров */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lureReviews.map((lure) => (
            <div
              key={lure.id}
              className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-5 hover:bg-white/15 transition group"
            >
              {/* Шапка карточки */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold">
                    {lure.id}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg leading-tight group-hover:text-orange-300 transition">
                      {lure.name}
                    </h3>
                    <span className="text-xs text-gray-400">{lure.category}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-yellow-500/20 px-2 py-1 rounded-lg">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-yellow-400 text-sm font-bold">{lure.rating}</span>
                </div>
              </div>

              {/* Описание */}
              <p className="text-gray-300 text-sm mb-3 line-clamp-3">
                {lure.description}
              </p>

              {/* Характеристики */}
              <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                <div className="bg-white/5 rounded-lg p-2">
                  <div className="text-gray-400">Для рыбы</div>
                  <div className="text-white font-semibold">{lure.bestFor}</div>
                </div>
                <div className="bg-white/5 rounded-lg p-2">
                  <div className="text-gray-400">Сезон</div>
                  <div className="text-white font-semibold">{lure.season}</div>
                </div>
              </div>

              {/* Плюсы и минусы */}
              <div className="mb-3">
                <div className="text-xs text-green-400 mb-1">✓ Плюсы:</div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {lure.pros.map((pro, i) => (
                    <span key={i} className="text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded">
                      {pro}
                    </span>
                  ))}
                </div>
                <div className="text-xs text-red-400 mb-1">✗ Минусы:</div>
                <div className="flex flex-wrap gap-1">
                  {lure.cons.map((con, i) => (
                    <span key={i} className="text-xs bg-red-500/20 text-red-300 px-2 py-0.5 rounded">
                      {con}
                    </span>
                  ))}
                </div>
              </div>

              {/* Статистика */}
              <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-white/10 mb-3">
                <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {lure.views}</span>
                <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> {lure.reviews}</span>
                <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" /> {lure.likes}</span>
                <span className="text-orange-400 font-bold">{lure.price}</span>
              </div>

              {/* Кнопка */}
              <Link
                href={"/search?q=" + encodeURIComponent(lure.name)}
                className="block w-full py-2 bg-orange-600/30 text-orange-300 rounded-lg hover:bg-orange-600/50 transition text-center text-sm font-semibold border border-orange-500/30"
              >
                Найти в продаже →
              </Link>
            </div>
          ))}
        </div>

        {/* Кнопка назад */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600/30 text-blue-300 rounded-lg hover:bg-blue-600/50 transition font-semibold border border-blue-500/30"
          >
            <ArrowLeft className="w-4 h-4" /> Вернуться на главную
          </Link>
        </div>

      </div>
    </div>
  );
}
