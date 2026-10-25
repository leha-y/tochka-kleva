"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { supabase } from "@/lib/supabase";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(() => import("react-leaflet").then((m) => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((m) => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((m) => m.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((m) => m.Popup), { ssr: false });

export default function MapPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [selectedReport, setSelectedReport] = useState<any | null>(null);
  const [filterType, setFilterType] = useState("all");
  const [L, setL] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import("leaflet").then((mod) => setL(mod));
  }, []);

  useEffect(() => {
    fetchReports();
    const interval = setInterval(fetchReports, 30000); // Обновляем каждые 30 сек
    return () => clearInterval(interval);
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("reports")
      .select('id, location, fish_type, weight, lure, description, image_url, lat, lng, expires_at, created_at, profiles:user_id (username, avatar_url)')
      .not("lat", "is", null)
      .not("lng", "is", null)
      .gte("expires_at", new Date().toISOString())
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Ошибка загрузки отчётов:", error);
    } else {
      setReports(data || []);
    }
    setLoading(false);
  };

  const filteredReports = filterType === "all" 
    ? reports 
    : reports.filter(r => {
        const type = r.location?.toLowerCase() || "";
        if (filterType === "река") return type.includes("р.") || type.includes("река");
        if (filterType === "озеро") return type.includes("оз.") || type.includes("озеро");
        if (filterType === "водохранилище") return type.includes("водохранилище");
        return true;
      });

  if (!L) {
    return (
      <div className="min-h-screen hero-background flex items-center justify-center pt-24">
        <div className="text-white text-xl">Загрузка карты...</div>
      </div>
    );
  }

  const defaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  const getLocationType = (location: string) => {
    const loc = location?.toLowerCase() || "";
    if (loc.includes("р.") || loc.includes("река")) return "Река";
    if (loc.includes("оз.") || loc.includes("озеро")) return "Озеро";
    if (loc.includes("водохранилище")) return "Водохранилище";
    return "Другое";
  };

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
                <p className="text-gray-300 text-sm">Реальные отчёты рыбаков за последние 7 дней</p>
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
              <h3 className="text-lg font-bold text-white mb-3">
                Отчёты ({filteredReports.length})
                {loading && <span className="text-gray-400 text-sm ml-2"></span>}
              </h3>
              {filteredReports.length === 0 ? (
                <div className="text-gray-400 text-center py-8">
                  <p>Пока нет отчётов</p>
                  <Link href="/add-report" className="text-blue-400 hover:text-blue-300 mt-2 inline-block">
                    Будь первым!
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredReports.map((report) => (
                    <button
                      key={report.id}
                      onClick={() => setSelectedReport(report)}
                      className={
                        "w-full text-left p-3 rounded-lg transition " +
                        (selectedReport?.id === report.id
                          ? "bg-blue-600/30 border border-blue-500/30"
                          : "bg-white/5 border border-white/10 hover:bg-white/10")
                      }
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-white font-semibold text-sm">{report.location}</h4>
                        <span className="text-yellow-400 text-xs"> {report.fish_type}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span>{getLocationType(report.location)}</span>
                        <span>·</span>
                        <span>{report.weight ? report.weight + " кг" : ""}</span>
                      </div>
                      {report.profiles && (
                        <div className="flex items-center gap-2 mt-2">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs">
                            {report.profiles.username?.[0]?.toUpperCase() || "U"}
                          </div>
                          <span className="text-gray-400 text-xs">{report.profiles.username || "Аноним"}</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </aside>

            <div className="lg:col-span-3 h-[600px] rounded-xl overflow-hidden border border-white/20 backdrop-blur-md relative z-0">
              <MapContainer 
                center={[58.6, 49.7]} 
                zoom={9} 
                scrollWheelZoom={true} 
                className="h-full w-full"
              >
                <TileLayer
                  attribution="&copy; OpenStreetMap"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {filteredReports.map((report) => (
                  report.lat && report.lng && (
                    <Marker 
                      key={report.id} 
                      position={[report.lat, report.lng]} 
                      icon={defaultIcon}
                      eventHandlers={{
                        click: () => setSelectedReport(report),
                      }}
                    >
                      <Popup>
                        <div className="text-gray-800 font-sans max-w-xs">
                          <strong className="text-lg block mb-1">{report.location}</strong>
                          <span className="text-sm block">🐟 {report.fish_type}{report.weight && " — " + report.weight + " кг"}</span>
                          <span className="text-sm block text-gray-600">🎣 {report.lure || "Не указано"}</span>
                          {report.profiles && (
                            <span className="text-xs text-gray-500 mt-1 block">
                              👤 {report.profiles.username || "Аноним"}
                            </span>
                          )}
                          {report.description && (
                            <p className="text-xs text-gray-600 mt-2 line-clamp-2">{report.description}</p>
                          )}
                        </div>
                      </Popup>
                    </Marker>
                  )
                ))}
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
