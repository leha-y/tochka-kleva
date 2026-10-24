import Link from "next/link";
import TopLureWidget from "@/components/TopLureWidget";
import AdBlock from "@/components/AdBlock";
import { supabase } from "@/lib/supabase";
import { Shield, Zap, Users, Target, Fish, Map, Star, MapPin, MessageCircle, Anchor, Shirt, Tent, Monitor, Magnet, FishingRod, Calendar, Trophy, MapPinned, BookOpen, Compass, Snowflake, Clock, ShoppingBag, Award } from "lucide-react";

async function getLatestProducts() {
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(6);
  return data || [];
}

const categories = [
  { slug: "snasti", name: "Снасти и оснастка", icon: FishingRod, color: "from-blue-500 to-blue-700", count: "2 450" },
  { slug: "lodki", name: "Лодки и моторы", icon: Anchor, color: "from-cyan-500 to-cyan-700", count: "186" },
  { slug: "odezhda", name: "Одежда и экипировка", icon: Shirt, color: "from-green-500 to-green-700", count: "523" },
  { slug: "kemping", name: "Кемпинг и палатки", icon: Tent, color: "from-orange-500 to-orange-700", count: "312" },
  { slug: "elektronika", name: "Электроника", icon: Monitor, color: "from-purple-500 to-purple-700", count: "428" },
  { slug: "rashodniki", name: "Расходники и прочее", icon: Magnet, color: "from-red-500 to-red-700", count: "1 847" },
];

const mockReports = [
  { id: 1, author: "Алексей", location: "р. Вятка", time: "2ч назад", text: "Судак 1.8 кг на джиг", likes: 24 },
  { id: 2, author: "Дмитрий", location: "оз. Орловское", time: "5ч назад", text: "Щука 3.2 кг на воблер", likes: 18 },
];

const mockChat = [
  { id: 1, user: "Рыбак_Киров", time: "14:32", text: "Всем привет! Кто сегодня на Вятку?" },
  { id: 2, user: "Спиннингист", time: "14:35", text: "Я планирую к 17:00" },
  { id: 3, user: "Рыбак_Киров", time: "14:36", text: "Отлично, встретимся у моста" },
];

const advantages = [
  { icon: Shield, title: "Безопасность сделок", text: "Проверенные продавцы и защита покупателей. Модерация каждого объявления.", color: "text-red-400" },
  { icon: Zap, title: "Быстрая продажа", text: "Подайте объявление за 2 минуты. Тысячи рыбаков увидят ваш товар.", color: "text-yellow-400" },
  { icon: Users, title: "Живое сообщество", text: "Тысячи рыбаков делятся опытом, отчётами и советами каждый день.", color: "text-blue-400" },
  { icon: Target, title: "Поддержка 24/7", text: "Всегда поможем с любым вопросом. Ответим в течение часа.", color: "text-green-400" },
];

const popularWaterbodies = [
  { name: "р. Вятка", type: "Река", rating: 4.8, reports: 1247, fish: "Судак, Щука, Окунь" },
  { name: "оз. Орловское", type: "Озеро", rating: 4.6, reports: 856, fish: "Щука, Карась, Лещ" },
  { name: "Воткинское водохранилище", type: "Водохранилище", rating: 4.9, reports: 2134, fish: "Судак, Сом, Лещ" },
  { name: "р. Чепца", type: "Река", rating: 4.4, reports: 643, fish: "Лещ, Плотва, Голавль" },
  { name: "оз. Светлое", type: "Озеро", rating: 4.3, reports: 421, fish: "Карась, Окунь, Щука" },
];

const upcomingEvents = [
  { 
    id: 1, 
    title: "Кубок Вятки по спиннингу", 
    date: "15 ноября 2026", 
    location: "р. Вятка, Киров", 
    description: "Ежегодный турнир по ловле хищника. Призовой фонд 50 000 ₽.",
    participants: 124,
    icon: Trophy
  },
  { 
    id: 2, 
    title: "Фестиваль зимней рыбалки", 
    date: "20 декабря 2026", 
    location: "оз. Орловское", 
    description: "Семейный праздник с конкурсами, мастер-классами и горячим чаем.",
    participants: 256,
    icon: Calendar
  },
  { 
    id: 3, 
    title: "Турнир 'Хищник'", 
    date: "5 января 2027", 
    location: "Воткинское водохранилище", 
    description: "Соревнование по ловле судака и щуки. Регистрация открыта.",
    participants: 89,
    icon: Trophy
  },
];

const blogPosts = [
  {
    id: 1,
    title: "Как выбрать спиннинг новичку",
    excerpt: "Полный гид по выбору удилища: длина, тест, строй. Разбираем популярные модели до 5000 ₽.",
    readTime: "7 мин",
    icon: BookOpen,
    color: "from-blue-500 to-cyan-600"
  },
  {
    id: 2,
    title: "Топ-5 мест для рыбалки в Кирове",
    excerpt: "Подборка лучших водоёмов региона с координатами, описанием подъездов и видом рыбы.",
    readTime: "5 мин",
    icon: Compass,
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 3,
    title: "Зимняя рыбалка: секреты успеха",
    excerpt: "Как ловить со льда: выбор места, снасти, прикормка. Советы опытных зимников.",
    readTime: "10 мин",
    icon: Snowflake,
    color: "from-indigo-500 to-purple-600"
  },
];

const stats = [
  { value: "1 247", label: "рыбаков в сообществе", icon: Users, color: "text-blue-400", bg: "from-blue-500/20 to-blue-600/20" },
  { value: "5 746", label: "объявлений на площадке", icon: ShoppingBag, color: "text-green-400", bg: "from-green-500/20 to-green-600/20" },
  { value: "8 432", label: "улова в отчётах", icon: Fish, color: "text-cyan-400", bg: "from-cyan-500/20 to-cyan-600/20" },
  { value: "156", label: "проведённых турниров", icon: Award, color: "text-yellow-400", bg: "from-yellow-500/20 to-yellow-600/20" },
];

export default async function HomePage() {
  const products = await getLatestProducts();

  return (
    <div className="min-h-screen hero-background">
      <div className="relative z-10">
        
        {/* ВЕРХНИЙ РЯД: Топ приманка | Отчёты | Hero | Чат | Реклама */}
        <section className="max-w-[1400px] mx-auto px-4 pt-24 pb-12 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4">
          
          {/* LEFT COLUMN */}
          <div className="md:col-span-1 xl:col-span-1 order-2 md:order-1">
            <TopLureWidget />
          </div>

          {/* REPORTS */}
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 order-1 md:order-2 xl:col-span-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Последние отчёты</h2>
              <Link href="/reports" className="text-blue-400 hover:text-blue-300 transition text-sm">Все →</Link>
            </div>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {mockReports.map((report) => (
                <div key={report.id} className="bg-white/5 border border-white/10 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                        {report.author[0]}
                      </div>
                      <div>
                        <div className="text-white text-sm font-semibold">{report.author}</div>
                        <div className="text-gray-400 text-xs">📍 {report.location} · {report.time}</div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">{report.text}</p>
                  <div className="text-xs text-gray-400 mt-1">❤️ {report.likes}</div>
                </div>
              ))}
            </div>
            <Link href="/reports" className="block w-full mt-4 py-3 bg-blue-600/30 text-blue-300 rounded-lg hover:bg-blue-600/50 transition text-center text-sm font-semibold border border-blue-500/30">
              Открыть все отчёты
            </Link>
          </div>

          {/* CENTER */}
          <div className="flex flex-col items-center justify-center text-center px-4 order-3 xl:col-span-1">
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold text-white mb-4">Точка Клёва</h1>
            <p className="text-lg text-gray-300 mb-6">Твоё место силы и честных снастей</p>
            <div className="flex justify-center gap-3 flex-wrap">
              <Link href="/categories/all" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold shadow-lg">
                Найти снасть
              </Link>
              <Link href="/add" className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-lg hover:bg-white/20 transition font-semibold">
                Продать снасть
              </Link>
            </div>
          </div>

          {/* CHAT */}
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 order-4 xl:col-span-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <MessageCircle className="w-5 h-5" /> Общий чат
              </h2>
              <span className="text-green-400 text-sm flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                127 онлайн
              </span>
            </div>
            <div className="space-y-3 max-h-80 overflow-y-auto mb-4">
              {mockChat.map((msg) => (
                <div key={msg.id} className="bg-white/5 border border-white/10 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-blue-400 text-sm font-semibold">{msg.user}</span>
                    <span className="text-gray-500 text-xs">{msg.time}</span>
                  </div>
                  <p className="text-gray-300 text-sm">{msg.text}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Написать..."
                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition text-sm"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm">
                →
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="md:col-span-1 xl:col-span-1 order-5">
            <AdBlock />
          </div>

        </section>

        {/* CATEGORIES */}
        <section className="max-w-7xl mx-auto px-4 pb-12">
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">Категории</h2>
              <Link href="/categories/all" className="text-blue-400 hover:text-blue-300 transition text-sm">Все →</Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <Link
                    key={cat.slug}
                    href={"/categories/" + cat.slug}
                    className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 hover:bg-white/15 transition text-center group"
                  >
                    <div className={"w-14 h-14 rounded-full bg-gradient-to-br " + cat.color + " flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition shadow-lg"}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-white font-semibold text-sm mb-1">{cat.name}</h3>
                    <p className="text-gray-400 text-xs">{cat.count}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* FRESH OFFERS */}
        <section className="max-w-7xl mx-auto px-4 pb-12">
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">Свежие предложения</h2>
              <Link href="/categories/all" className="text-blue-400 hover:text-blue-300 transition text-sm">Все →</Link>
            </div>
            {products.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4"></div>
                <p className="text-gray-400 mb-4">Пока нет объявлений. Будь первым!</p>
                <Link href="/add" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                  + Подать объявление
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product: any) => (
                  <div key={product.id}>
                    <Link
                      href={"/product/" + product.id}
                      className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 hover:bg-white/15 transition group block"
                    >
                      <div className="h-40 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg mb-3 flex items-center justify-center group-hover:scale-105 transition">
                        <FishingRod className="w-16 h-16 text-white/30" />
                      </div>
                      <h3 className="text-white font-semibold mb-1 line-clamp-1">{product.title}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-white">{product.price} ₽</span>
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {product.city}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{product.condition === "new" ? "Новое" : "Б/У"}</p>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ADVANTAGES */}
        <section className="max-w-7xl mx-auto px-4 pb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Почему Точка Клёва?</h2>
            <p className="text-gray-400">Мы создали лучшее место для рыболовов России</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {advantages.map((adv, idx) => {
              const Icon = adv.icon;
              return (
                <div
                  key={idx}
                  className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 hover:bg-white/15 transition group"
                >
                  <Icon className={"w-12 h-12 mb-4 " + adv.color + " group-hover:scale-110 transition"} />
                  <h3 className="text-white font-bold text-lg mb-2">{adv.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{adv.text}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* WATERBODIES */}
        <section className="max-w-7xl mx-auto px-4 pb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Популярные водоёмы</h2>
            <p className="text-gray-400">Топ мест для рыбалки по отзывам наших пользователей</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularWaterbodies.map((wb, idx) => (
              <Link
                key={idx}
                href="/map"
                className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 hover:bg-white/15 transition group"
              >
                <div className="flex items-start justify-between mb-3">
                  <Fish className="w-10 h-10 text-blue-400" />
                  <div className="flex items-center gap-1 bg-yellow-500/20 px-2 py-1 rounded-lg">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-yellow-400 text-sm font-bold">{wb.rating}</span>
                  </div>
                </div>
                <h3 className="text-white font-bold text-lg mb-1 group-hover:text-blue-300 transition">{wb.name}</h3>
                <p className="text-gray-400 text-sm mb-3">{wb.type}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {wb.reports} отчётов
                  </span>
                  <span className="text-blue-400 flex items-center gap-1">
                    <Fish className="w-3 h-3" /> {wb.fish}
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/map" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600/30 text-blue-300 rounded-lg hover:bg-blue-600/50 transition font-semibold border border-blue-500/30">
              <Map className="w-4 h-4" /> Смотреть все водоёмы на карте
            </Link>
          </div>
        </section>

        {/* EVENTS */}
        <section className="max-w-7xl mx-auto px-4 pb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Ближайшие события</h2>
            <p className="text-gray-400">Турниры, фестивали и встречи рыбаков</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingEvents.map((event) => {
              const Icon = event.icon;
              return (
                <div
                  key={event.id}
                  className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 hover:bg-white/15 transition group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {event.date}
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2 group-hover:text-blue-300 transition">{event.title}</h3>
                  <p className="text-gray-400 text-sm mb-3 flex items-center gap-1">
                    <MapPinned className="w-4 h-4 flex-shrink-0" /> {event.location}
                  </p>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">{event.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-xs text-gray-400">
                       {event.participants} участников
                    </span>
                    <Link 
                      href="/events" 
                      className="text-sm text-blue-400 hover:text-blue-300 transition font-semibold"
                    >
                      Подробнее →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-6">
            <Link href="/events" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600/30 text-blue-300 rounded-lg hover:bg-blue-600/50 transition font-semibold border border-blue-500/30">
              <Calendar className="w-4 h-4" /> Смотреть все события
            </Link>
          </div>
        </section>

        {/* BLOG */}
        <section className="max-w-7xl mx-auto px-4 pb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Советы бывалых</h2>
            <p className="text-gray-400">Полезные статьи от опытных рыбаков</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {blogPosts.map((post) => {
              const Icon = post.icon;
              return (
                <Link
                  key={post.id}
                  href="/blog"
                  className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 hover:bg-white/15 transition group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={"p-3 bg-gradient-to-br " + post.color + " rounded-lg"}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2 group-hover:text-blue-300 transition">{post.title}</h3>
                  <p className="text-gray-300 text-sm line-clamp-3">{post.excerpt}</p>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <span className="text-sm text-blue-400 hover:text-blue-300 transition font-semibold">
                      Читать →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-6">
            <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600/30 text-blue-300 rounded-lg hover:bg-blue-600/50 transition font-semibold border border-blue-500/30">
              <BookOpen className="w-4 h-4" /> Все статьи блога
            </Link>
          </div>
        </section>

        {/* STATS */}
        <section className="max-w-7xl mx-auto px-4 pb-12">
          <div className="backdrop-blur-md bg-gradient-to-br from-blue-900/40 to-purple-900/40 border border-white/20 rounded-2xl p-8 md:p-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white mb-2">Точка Клёва в цифрах</h2>
              <p className="text-gray-300">Нам доверяют тысячи рыбаков по всей России</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={idx}
                    className="text-center group"
                  >
                    <div className={"inline-flex p-4 rounded-2xl bg-gradient-to-br " + stat.bg + " mb-4 group-hover:scale-110 transition"}>
                      <Icon className={"w-8 h-8 " + stat.color} />
                    </div>
                    <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-gray-300 text-sm">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}