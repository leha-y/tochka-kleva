"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";

export default function ReportsPage() {
  const { user } = useAuth();
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterFish, setFilterFish] = useState("");
  const [filterLocation, setFilterLocation] = useState("");

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("reports")
      .select("id, user_id, location, fish_type, weight, lure, description, image_url, lat, lng, created_at, profiles:user_id (username)")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Ошибка загрузки отчётов:", error);
    } else {
      setReports(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (reportId: string, reportUserId: string) => {
    if (!user) return;
    if (user.id !== reportUserId) {
      alert("Можно удалять только свои отчёты!");
      return;
    }
    if (!confirm("Удалить этот отчёт?")) return;

    const { error } = await supabase.from("reports").delete().eq("id", reportId);
    if (error) {
      alert("Ошибка удаления: " + error.message);
    } else {
      setReports(reports.filter(r => r.id !== reportId));
    }
  };

  const filteredReports = reports.filter(r => {
    if (filterFish && r.fish_type !== filterFish) return false;
    if (filterLocation && !r.location?.toLowerCase().includes(filterLocation.toLowerCase())) return false;
    return true;
  });

  const uniqueFishTypes = [...new Set(reports.map(r => r.fish_type).filter(Boolean))];

  return (
    <div className="min-h-screen hero-background">
      <div className="relative z-10 pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <nav className="flex items-center gap-2 text-gray-400 text-sm mb-6">
            <Link href="/" className="hover:text-white transition">Главная</Link>
            <span>→</span>
            <span className="text-white">С водоёма</span>
          </nav>

          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">🎣 С водоёма</h1>
                <p className="text-gray-300 text-sm">Отчёты рыбаков с реальных рыбалок</p>
              </div>
              <Link href="/add-report" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                + Добавить отчёт
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <aside className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 h-fit">
              <h3 className="text-lg font-bold text-white mb-4">Фильтры</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-white text-sm mb-2">Вид рыбы</label>
                  <select value={filterFish} onChange={(e) => setFilterFish(e.target.value)} className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white">
                    <option value="">Все виды</option>
                    {uniqueFishTypes.map(fish => <option key={fish} value={fish}>{fish}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-white text-sm mb-2">Водоём</label>
                  <input type="text" value={filterLocation} onChange={(e) => setFilterLocation(e.target.value)} placeholder="Название водоёма" className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400" />
                </div>
              </div>
            </aside>

            <div className="lg:col-span-3 space-y-4">
              {loading ? (
                <div className="text-center text-white py-12">Загрузка отчётов...</div>
              ) : filteredReports.length === 0 ? (
                <div className="text-center text-gray-400 py-12">
                  <p className="text-xl mb-2">Пока нет отчётов</p>
                  <Link href="/add-report" className="text-blue-400 hover:text-blue-300">Будь первым!</Link>
                </div>
              ) : (
                filteredReports.map((report) => (
                  <div key={report.id} className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      {report.image_url ? (
                        <img src={report.image_url} alt="Улов" className="w-48 h-48 object-cover rounded-lg flex-shrink-0" />
                      ) : (
                        <div className="w-48 h-48 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-4xl">🐟</span>
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                            {report.profiles?.username?.[0]?.toUpperCase() || "U"}
                          </div>
                          <div>
                            <div className="text-white font-semibold">{report.profiles?.username || "Аноним"}</div>
                            <div className="text-gray-400 text-xs">📍 {report.location} · {new Date(report.created_at).toLocaleDateString("ru-RU")}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-3 py-1 bg-blue-600/30 text-blue-300 rounded-full text-sm">{report.fish_type}</span>
                          {report.weight && <span className="text-gray-300 text-sm">{report.weight} кг</span>}
                          {report.lure && <span className="text-gray-400 text-sm">· {report.lure}</span>}
                        </div>
                        {report.description && <p className="text-gray-300 text-sm mb-3">{report.description}</p>}
                        {report.lat && report.lng && (
                          <a href={"https://www.openstreetmap.org/?mlat=" + report.lat + "&mlon=" + report.lng + "#map=16/" + report.lat + "/" + report.lng} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">
                            📍 Посмотреть на карте
                          </a>
                        )}
                        {user && user.id === report.user_id && (
                          <div className="flex gap-2 mt-3 pt-3 border-t border-white/10">
                            <button onClick={() => handleDelete(report.id, report.user_id)} className="px-4 py-2 bg-red-600/20 text-red-300 rounded-lg hover:bg-red-600/30 transition text-sm">
                              🗑 Удалить
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}