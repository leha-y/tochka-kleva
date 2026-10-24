import { Flame, TrendingUp, ExternalLink } from "lucide-react";
import Link from "next/link";

const topLures = [
  {
    id: 1,
    name: "ZipBaits Rigge 58S",
    category: "Воблер",
    rating: 4.9,
    reviews: 127,
    description: "Легендарный воблер на щуку",
    trend: "up"
  },
  {
    id: 2,
    name: "Keitech Swing Impact",
    category: "Силикон",
    rating: 4.8,
    reviews: 94,
    description: "Топ силикон на судака",
    trend: "up"
  },
  {
    id: 3,
    name: "Duo Realis Jerkbait",
    category: "Воблер",
    rating: 4.7,
    reviews: 83,
    description: "Уловистый джеркбейт",
    trend: "stable"
  },
  {
    id: 4,
    name: "Megabass Vision 110",
    category: "Воблер",
    rating: 4.9,
    reviews: 156,
    description: "Премиум воблер на щуку",
    trend: "up"
  },
  {
    id: 5,
    name: "Rapala X-Rap",
    category: "Воблер",
    rating: 4.6,
    reviews: 201,
    description: "Классика среди воблеров",
    trend: "down"
  }
];

export default function TopLureWidget() {
  return (
    <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Flame className="w-5 h-5 text-orange-400" /> Топ приманок
        </h3>
        <TrendingUp className="w-4 h-4 text-green-400" />
      </div>
      <div className="space-y-2">
        {topLures.map((lure, idx) => (
          <Link
            key={lure.id}
            href={"/search?q=" + encodeURIComponent(lure.name)}
            className="block bg-white/5 border border-white/10 rounded-lg p-2 hover:bg-white/10 transition group"
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {idx + 1}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-white text-xs font-semibold truncate group-hover:text-orange-300 transition">
                  {lure.name}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span>{lure.category}</span>
                  <span>★ {lure.rating}</span>
                  <span>({lure.reviews})</span>
                </div>
              </div>
              <ExternalLink className="w-3 h-3 text-gray-500 group-hover:text-orange-400 transition" />
            </div>
          </Link>
        ))}
      </div>
      <Link
        href="/lure-news"
        className="block w-full mt-3 py-2 bg-orange-600/30 text-orange-300 rounded-lg hover:bg-orange-600/50 transition text-center text-xs font-semibold border border-orange-500/30"
      >
        Все обзоры приманок →
      </Link>
    </div>
  );
}
