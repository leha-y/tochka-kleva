import Link from "next/link";

export default function MiniProductsWidget() {
  const products = [
    { id: 1, title: "Major Craft Solpara 5-25г", price: "3 500 ₽", city: "Киров", badge: "Проверенный" },
    { id: 2, title: "Shimano Catana 2500", price: "4 200 ₽", city: "Киров", badge: null },
    { id: 3, title: "Воблер ZipBaits Rigge 58S", price: "850 ₽", city: "Кировская обл.", badge: "Новое" },
    { id: 4, title: "Катушка Daiwa Ninja 3000", price: "5 100 ₽", city: "Киров", badge: "Проверенный" },
    { id: 5, title: "Спиннинг Graphiteleader Tiro", price: "12 500 ₽", city: "Киров", badge: null },
    { id: 6, title: "Плетёнка Sunline Super PE 150м", price: "1 200 ₽", city: "Кировская обл.", badge: "Новое" },
  ];

  return (
    <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-white">Свежие предложения</h3>
        <a href="/categories/all" className="text-blue-400 hover:text-blue-300 text-xs font-semibold">
          Все →
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((item) => (
          <Link
            key={item.id}
            href={"/product/" + item.id}
            className="bg-white/5 border border-white/10 rounded-lg p-3 hover:bg-white/10 transition cursor-pointer group"
          >
            <div className="h-24 bg-gradient-to-br from-gray-700 to-gray-900 rounded mb-2 flex items-center justify-center group-hover:scale-105 transition">
              <span className="text-3xl opacity-30"></span>
            </div>
            {item.badge && (
              <span className="inline-block px-2 py-0.5 bg-blue-600/30 text-blue-300 text-xs rounded-full mb-1 border border-blue-500/30">
                {item.badge}
              </span>
            )}
            <h4 className="text-white font-semibold text-xs mb-1 truncate">{item.title}</h4>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white">{item.price}</span>
              <span className="text-xs text-gray-400">📍 {item.city}</span>
            </div>
          </Link>
        ))}
      </div>
      <a href="/categories/all" className="mt-3 w-full py-2 bg-blue-600/30 text-blue-300 rounded-lg text-xs hover:bg-blue-600/50 transition text-center border border-blue-500/30 block">
        Показать ещё
      </a>
    </div>
  );
}