import Link from "next/link";

const categoryInfo: Record<string, { name: string; icon: string; description: string }> = {
  spinning: { name: "Спиннинг", icon: "🎣", description: "Спиннинговые удилища, катушки и приманки" },
  fider: { name: "Фидер", icon: "🎯", description: "Фидерные удилища и оснастки" },
  poplavok: { name: "Поплавок", icon: "", description: "Поплавочные удочки" },
  snasti: { name: "Снасти и оснастка", icon: "🎣", description: "Спиннинги, катушки, лески, приманки" },
  lodki: { name: "Лодки и моторы", icon: "🚤", description: "ПВХ лодки, моторы, прицепы" },
  odezhda: { name: "Одежда и экипировка", icon: "🧥", description: "Костюмы, вейдерсы, обувь" },
  kemping: { name: "Кемпинг и палатки", icon: "⛺", description: "Палатки, спальники, столы" },
  elektronika: { name: "Электроника", icon: "📟", description: "Эхолоты, GPS, камеры" },
  rashodniki: { name: "Расходники и прочее", icon: "🧲", description: "Прикормка, крючки, лески" },
  all: { name: "Все категории", icon: "🗂️", description: "Полный каталог" },
};

const mockProducts = [
  { id: 1, title: "Major Craft Solpara 5-25г", price: "3 500 ₽", city: "Киров", badge: "Проверенный", seller: "Алексей" },
  { id: 2, title: "Shimano Catana 2500", price: "4 200 ₽", city: "Киров", badge: null, seller: "Дмитрий" },
  { id: 3, title: "Воблер ZipBaits Rigge 58S", price: "850 ₽", city: "Кировская обл.", badge: "Новое", seller: "Иван" },
  { id: 4, title: "Катушка Daiwa Ninja 3000", price: "5 100 ₽", city: "Киров", badge: "Проверенный", seller: "Сергей" },
  { id: 5, title: "Спиннинг Graphiteleader Tiro", price: "12 500 ₽", city: "Киров", badge: null, seller: "Михаил" },
  { id: 6, title: "Плетёнка Sunline Super PE 150м", price: "1 200 ₽", city: "Кировская обл.", badge: "Новое", seller: "Андрей" },
];

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = categoryInfo[params.slug] || { name: "Категория", icon: "🎣", description: "Описание" };

  return (
    <div className="min-h-screen hero-background">
      <div className="relative z-10 pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-white transition">Главная</Link>
            <span>→</span>
            <Link href="/categories/all" className="hover:text-white transition">Категории</Link>
            <span>→</span>
            <span className="text-white">{category.name}</span>
          </nav>

          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="text-5xl">{category.icon}</div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">{category.name}</h1>
                <p className="text-gray-300 text-sm">{category.description}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <aside className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-5 h-fit">
              <h3 className="text-lg font-bold text-white mb-4">Фильтры</h3>
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-300 mb-2">Состояние</h4>
                <label className="flex items-center gap-2 text-gray-400 text-sm mb-1 cursor-pointer">
                  <input type="checkbox" className="accent-blue-500" /> Новое
                </label>
                <label className="flex items-center gap-2 text-gray-400 text-sm cursor-pointer">
                  <input type="checkbox" className="accent-blue-500" /> Б/У
                </label>
              </div>
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-300 mb-2">Цена</h4>
                <div className="flex gap-2">
                  <input type="number" placeholder="от" className="w-full px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-sm" />
                  <input type="number" placeholder="до" className="w-full px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-sm" />
                </div>
              </div>
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-300 mb-2">Город</h4>
                <select className="w-full px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-sm">
                  <option>Все города</option>
                  <option>Киров</option>
                  <option>Кировская обл.</option>
                </select>
              </div>
              <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-semibold">Применить</button>
            </aside>

            <div className="lg:col-span-3">
              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 mb-4 flex items-center justify-between">
                <span className="text-gray-300 text-sm">Найдено: {mockProducts.length} объявлений</span>
                <select className="px-3 py-1 bg-white/10 border border-white/20 rounded text-white text-sm">
                  <option>По дате (новые)</option>
                  <option>По цене (дешевые)</option>
                  <option>По цене (дорогие)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockProducts.map((product) => (
                  <Link key={product.id} href={"/product/" + product.id} className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 hover:bg-white/15 transition cursor-pointer group">
                    <div className="h-32 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg mb-3 flex items-center justify-center group-hover:scale-105 transition">
                      <span className="text-4xl opacity-30">🎣</span>
                    </div>
                    {product.badge && (
                      <span className="inline-block px-2 py-0.5 bg-blue-600/30 text-blue-300 text-xs rounded-full mb-2 border border-blue-500/30">{product.badge}</span>
                    )}
                    <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">{product.title}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-lg font-bold text-white">{product.price}</span>
                      <span className="text-xs text-gray-400">📍 {product.city}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Продавец: {product.seller}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
