"use client";

import { useState } from "react";
import Link from "next/link";

const mockSpots = [
  { id: 1, name: "р. Вятка", type: "Река", fish: ["Судак", "Щука", "Окунь"], lat: 58.6035, lng: 49.6680, reports: 24, rating: 4.8 },
  { id: 2, name: "оз. Орловское", type: "Озеро", fish: ["Щука", "Карась", "Лещ"], lat: 58.5500, lng: 49.7000, reports: 18, rating: 4.5 },
  { id: 3, name: "р. Чепца", type: "Река", fish: ["Лещ", "Плотва", "Голавль"], lat: 58.7000, lng: 49.6500, reports: 12, rating: 4.2 },
  { id: 4, name: "Воткинское водохранилище", type: "Водохранилище", fish: ["Судак", "Сом", "Лещ"], lat: 58.8000, lng: 49.8000, reports: 31, rating: 4.9 },
  { id: 5, name: "оз. Светлое", type: "Озеро", fish: ["Карась", "Окунь", "Щука"], lat: 58.5000, lng: 49.7500, reports: 9, rating: 4.0 },
  { id: 6, name: "р. Кама", type: "Река", fish: ["Сом", "Судак", "Жерех"], lat: 58.6500, lng: 49.9000, reports: 45, rating: 4.7 },
];

export default function MapPage() {
  const [selectedSpot, setSelectedSpot] = useState<typeof mockSpots[0] | null>(null);
  const [filterType, setFilterType] = useState("all");

  const filteredSpots = filterType === "all" 
    ? mockSpots 
    : mockSpots.filter(s => s.type.toLowerCase() === filterType);

  return (
    <div className="min-h-screen hero-background">
      <div className="relative z-10 pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          
          {/* ХЛЕБНЫЕ КРОШКИ */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-white transition">Главная</Link>
            <span>→</span>
            <span className="text-white">Карта водоёмов</span>
          </nav>

          {/* ЗАГОЛОВОК */}
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">🗺️ Карта водоёмов</h1>
                <p className="text-gray-300 text-sm">Найди лучшее место для рыбалки рядом с тобой</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setFilterType("all")}
                  className={"px-4 py-2 rounded-lg text-sm font-semibold transition " + (filterType === "all" ? "bg-blue-600 text-white" : "bg-white/10 text-gray-300 hover:bg-white/20")}
                >
                  Все
                </button>
                <button
                  onClick={() => setFilterType("река")}
                  className={"px-4 py-2 rounded-lg text-sm font-semibold transition " + (filterType === "река" ? "bg-blue-600 text-white" : "bg-white/10 text-gray-300 hover:bg-white/20")}
                >
                  Реки
                </button>
                <button
                  onClick={() => setFilterType("озеро")}
                  className={"px-4 py-2 rounded-lg text-sm font-semibold transition " + (filterType === "озеро" ? "bg-blue-600 text-white" : "bg-white/10 text-gray-300 hover:bg-white/20")}
                >
                  Озёра
                </button>
                <button
                  onClick={() => setFilterType("водохранилище")}
                  className={"px-4 py-2 rounded-lg text-sm font-semibold transition " + (filterType === "водохранилище" ? "bg-blue-600 text-white" : "bg-white/10 text-gray-300 hover:bg-white/20")}
                >
                  Водохранилища
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* СПИСОК ВОДОЁМОВ СЛЕВА */}
            <aside className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 h-fit max-h-[600px] overflow-y-auto custom-scrollbar">
              <h3 className="text-lg font-bold text-white mb-3">Водоёмы ({filteredSpots.length})</h3>
              <div className="space-y-2">
                {filteredSpots.map((spot) => (
                  <button
                    key={spot.id}
                    onClick={() => setSelectedSpot(spot)}
                    className={
                      "w-full text-left p-3 rounded-lg transition " +
                      (selectedSpot?.id === spot.id
                        ? "bg-blue-600/30 border border-blue-500/30"
                        : "bg-white/5 border border-white/10 hover:bg-white/10")
                    }
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-white font-semibold text-sm">{spot.name}</h4>
                      <span className="text-yellow-400 text-xs">★ {spot.rating}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span>{spot.type}</span>
                      <span>·</span>
                      <span>{spot.reports} отчётов</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {spot.fish.map((f, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-blue-600/20 text-blue-300 text-xs rounded-full">
                          {f}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </aside>

            {/* КАРТА СПРАВА */}
            <div className="lg:col-span-3">
              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 h-[600px] relative overflow-hidden">
                {/* ЗАГЛУШКА КАРТЫ */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-green-900/30 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🗺️</div>
                    <p className="text-gray-300 text-sm">Интерактивная карта</p>
                    <p className="text-gray-500 text-xs mt-1">(Подключим Leaflet/2GIS позже)</p>
                  </div>
                </div>

                {/* ТОЧКИ НА КАРТЕ */}
                {filteredSpots.map((spot, idx) => {
                  const positions = [
                    { top: "20%", left: "30%" },
                    { top: "35%", left: "50%" },
                    { top: "50%", left: "25%" },
                    { top: "25%", left: "70%" },
                    { top: "60%", left: "60%" },
                    { top: "45%", left: "80%" },
                  ];
                  const pos = positions[idx % positions.length];
                  return (
                    <button
                      key={spot.id}
                      onClick={() => setSelectedSpot(spot)}
                      className={
                        "absolute transform -translate-x-1/2 -translate-y-1/2 transition " +
                        (selectedSpot?.id === spot.id ? "scale-125 z-10" : "hover:scale-110")
                      }
                      style={{ top: pos.top, left: pos.left }}
                    >
                      <div className={
                        "w-8 h-8 rounded-full flex items-center justify-center shadow-lg " +
                        (selectedSpot?.id === spot.id ? "bg-blue-500" : "bg-red-500")
                      }>
                        <span className="text-white text-xs font-bold"></span>
                      </div>
                      <div className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                        <span className="px-2 py-1 bg-black/70 text-white text-xs rounded backdrop-blur">
                          {spot.name}
                        </span>
                      </div>
                    </button>
                  );
                })}

                {/* ИНФО О ВЫБРАННОМ ВОДОЁМЕ */}
                {selectedSpot && (
                  <div className="absolute bottom-4 left-4 right-4 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-bold text-lg">{selectedSpot.name}</h3>
                        <p className="text-gray-400 text-sm">{selectedSpot.type} · ★ {selectedSpot.rating} · {selectedSpot.reports} отчётов</p>
                        <div className="flex gap-1 mt-2">
                          {selectedSpot.fish.map((f, idx) => (
                            <span key={idx} className="px-2 py-0.5 bg-blue-600/30 text-blue-300 text-xs rounded-full border border-blue-500/30">
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Link
                          href={"/reports?spot=" + selectedSpot.id}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-semibold"
                        >
                          Отчёты
                        </Link>
                        <button className="px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition text-sm">
                          Подробнее
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}