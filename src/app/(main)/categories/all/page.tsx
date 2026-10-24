import Link from "next/link";

const allCategories = [
  { slug: "snasti", name: "Снасти и оснастка", icon: "🎣", color: "from-blue-500 to-blue-700", count: "2 450", desc: "Спиннинги, удилища, катушки, лески, приманки" },
  { slug: "lodki", name: "Лодки и моторы", icon: "🚤", color: "from-cyan-500 to-cyan-700", count: "186", desc: "ПВХ лодки, килевые, лодочные моторы, прицепы" },
  { slug: "odezhda", name: "Одежда и экипировка", icon: "🧥", color: "from-green-500 to-green-700", count: "523", desc: "Вейдерсы, костюмы, перчатки, обувь, термобельё" },
  { slug: "kemping", name: "Кемпинг и палатки", icon: "⛺", color: "from-orange-500 to-orange-700", count: "312", desc: "Палатки, спальники, столы, стулья, ящики" },
  { slug: "elektronika", name: "Электроника", icon: "📟", color: "from-purple-500 to-purple-700", count: "428", desc: "Эхолоты, GPS-навигаторы, подводные камеры" },
  { slug: "rashodniki", name: "Расходники и прочее", icon: "", color: "from-red-500 to-red-700", count: "1 847", desc: "Прикормка, крючки, лески, грузила" },
];

export default function AllCategoriesPage() {
  return (
    <div className="min-h-screen hero-background">
      <div className="relative z-10 pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-white transition">Главная</Link>
            <span>→</span>
            <span className="text-white">Все категории</span>
          </nav>

          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 mb-6">
            <h1 className="text-3xl font-bold text-white mb-1">🗂️ Все категории</h1>
            <p className="text-gray-300 text-sm">Всего объявлений: 5 746</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={"/categories/" + cat.slug}
                className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 hover:bg-white/15 transition group"
              >
                <div className={"w-16 h-16 rounded-full bg-gradient-to-br " + cat.color + " flex items-center justify-center text-4xl mb-3 group-hover:scale-110 transition shadow-lg"}>
                  {cat.icon}
                </div>
                <h3 className="text-white font-bold text-lg mb-1">{cat.name}</h3>
                <p className="text-gray-400 text-sm mb-3">{cat.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-blue-400 text-sm font-semibold">{cat.count} объявлений</span>
                  <span className="text-blue-400">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}