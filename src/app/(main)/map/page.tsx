"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { icon } from "leaflet";
import "leaflet/dist/leaflet.css";

// Фикс для иконок маркеров в Next.js
const defaultIcon = icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const filteredSpots = filterType === "all" 
    ? mockSpots 
    : mockSpots.filter(s => s.type.toLowerCase() === filterType);

  if (!isMounted) return null;

  return (
    <div className="min-h-screen hero-background">
      <div className="relative z-10 pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          
          <nav className="flex items-center gap-2 text-gray-400 text-sm mb-6">
            <Link href="/" className="hover:text-white transition">Главная</Link>
            <span>→</span>
            <span className="text-white">Карта водоёмов</span>
          </nav>

          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">🗺️ Карта водоёмов</h1>
                <p className="text-gray-300 text-sm">Найди лучшее место для рыбалки рядом с тобой</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                {["all", "река", "озеро", "водохранилище"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={"px-4 py-2 rounded-lg text-sm font-semibold transition " + (filterType === type ? "bg-blue-600 text-white" : "bg-white/10 text-gray-300 hover:bg-white/20")}
                  >
                    {type === "all" ? "Все" : type === "река" ? "Реки" : type === "озеро" ? "Озёра" : "Водохранилища"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
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

            <div className="lg:col-span-3 h-[600px] rounded-xl overflow-hidden border border-white/20 backdrop-blur-md relative z-0">
              <MapContainer 
                center={[58.6, 49.7]} 
                zoom={9} 
                scrollWheelZoom={true} 
                className="h-full w-full"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {filteredSpots.map((spot) => (
                  <Marker 
                    key={spot.id} 
                    position={[spot.lat, spot.lng]} 
                    icon={defaultIcon}
                    eventHandlers={{
                      click: () => setSelectedSpot(spot),
                    }}
                  >
                    <Popup>
                      <div className="text-gray-800 font-sans">
                        <strong className="text-lg block mb-1">{spot.name}</strong>
                        <span className="text-sm">{spot.type} • Рейтинг: {spot.rating}</span><br/>
                        <span className="text-sm text-blue-600">Рыба: {spot.fish.join(", ")}</span>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
