import { Fish, Ship, Shirt, Tent, Monitor, Magnet } from "lucide-react";

const categories = [
  { slug: "snasti", name: "Снасти и оснастка", icon: Fish, color: "from-blue-500 to-blue-700", count: "2 450" },
  { slug: "lodki", name: "Лодки и моторы", icon: Ship, color: "from-cyan-500 to-cyan-700", count: "186" },
  { slug: "odezhda", name: "Одежда и экипировка", icon: Shirt, color: "from-green-500 to-green-700", count: "523" },
  { slug: "kemping", name: "Кемпинг и палатки", icon: Tent, color: "from-orange-500 to-orange-700", count: "312" },
  { slug: "elektronika", name: "Электроника", icon: Monitor, color: "from-purple-500 to-purple-700", count: "428" },
  { slug: "rashodniki", name: "Расходники и прочее", icon: Magnet, color: "from-red-500 to-red-700", count: "1 847" },
];

export default function CategoriesGrid() {
  return (
    <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">Категории</h3>
        <span className="text-gray-400 text-xs">Всего объявлений: 5 746</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {categories.map((cat) => {
          const IconComponent = cat.icon;
          return (
            <a
              key={cat.slug}
              href={"/categories/" + cat.slug}
              className="group flex flex-col items-center p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/15 transition cursor-pointer"
            >
              <div className={"w-14 h-14 rounded-full bg-gradient-to-br " + cat.color + " flex items-center justify-center mb-2 group-hover:scale-110 transition shadow-lg"}>
                <IconComponent className="w-8 h-8 text-white" />
              </div>
              <span className="text-white text-xs font-semibold text-center mb-1">{cat.name}</span>
              <span className="text-gray-400 text-xs">{cat.count}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}