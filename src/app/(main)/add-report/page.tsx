"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import ClickHandler from "@/components/ClickHandler";
import "leaflet/dist/leaflet.css";

// Функция для получения названия места по координатам (Reverse Geocoding)
async function getLocationName(lat: number, lng: number): Promise<string> {
  try {
    const response = await fetch(
      \https://nominatim.openstreetmap.org/reverse?format=json&lat=\&lon=\&zoom=18&addressdetails=1    );
    const data = await response.json();
    
    // Пробуем получить название водоёма или реки
    const address = data.address;
    if (address.waterway) {
      return \р. \;
    }
    if (address.river) {
      return \р. \;
    }
    if (address.lake) {
      return \оз. \;
    }
    if (address.reservoir) {
      return \водохранилище \;
    }
    if (address.town || address.city || address.village) {
      const place = address.town || address.city || address.village;
      return \, \;
    }
    return data.display_name?.split(',').slice(0, 2).join(', ') || '';
  } catch (error) {
    console.error('Ошибка получения места:', error);
    return '';
  }
}

const MapContainer = dynamic(() => import("react-leaflet").then((m) => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((m) => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((m) => m.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((m) => m.Popup), { ssr: false });

export default function AddReportPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [L, setL] = useState<any>(null);
  const [isMounted, setIsMounted] = useState(false);

  const [formData, setFormData] = useState({
    location: "",
    fishType: "",
    weight: "",
    lure: "",
    description: "",
  });
  const [images, setImages] = useState<File[]>([]);
  const [lat, setLat] = useState<number | null>(58.6035);
  const [lng, setLng] = useState<number | null>(49.6680);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    import("leaflet").then((mod) => setL(mod));
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !isMounted || !L) {
    return (
      <div className="min-h-screen hero-background flex items-center justify-center pt-24">
        <div className="text-white text-xl">Загрузка...</div>
      </div>
    );
  }

  if (!user) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImages(Array.from(e.target.files));
  };

  const handleMapClick = async (lat: number, lng: number) => {
    console.log("Клик по карте:", lat, lng);
    setLat(lat);
    setLng(lng);
    
    // Автоматически заполняем поле места
    const locationName = await getLocationName(lat, lng);
    if (locationName) {
      setFormData({ ...formData, location: locationName });
    }
  };

  const handleMarkerDrag = (e: any) => {
    const { lat, lng } = e.target.getLatLng();
    setLat(lat);
    setLng(lng);
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split(".").pop();
    const fileName = user.id + "/" + Date.now() + "." + fileExt;
    const { data, error } = await supabase.storage
      .from("report-images")
      .upload(fileName, file, { cacheControl: "3600", upsert: false });

    if (error) {
      console.error("Upload error:", error);
      return null;
    }

    const { data: publicData } = supabase.storage.from("report-images").getPublicUrl(fileName);
    return publicData.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      let imageUrl = null;
      if (images.length > 0) {
        imageUrl = await uploadImage(images[0]);
      }

      const { error } = await supabase.from("reports").insert({
        user_id: user.id,
        location: formData.location,
        fish_type: formData.fishType,
        weight: formData.weight ? parseFloat(formData.weight) : null,
        lure: formData.lure,
        description: formData.description,
        image_url: imageUrl,
        lat: lat,
        lng: lng,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      });

      if (error) throw error;

      setSuccess(true);
      setTimeout(() => router.push("/reports"), 2000);
    } catch (err: any) {
      setError(err.message || "Ошибка отправки отчёта");
    } finally {
      setIsLoading(false);
    }
  };

  const defaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <div className="min-h-screen hero-background">
      <div className="relative z-10 pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-white transition">Главная</Link>
            <span>→</span>
            <Link href="/reports" className="hover:text-white transition">С водоёма</Link>
            <span>→</span>
            <span className="text-white">Добавить отчёт</span>
          </nav>

          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 mb-6">
            <h1 className="text-3xl font-bold text-white mb-2"> Добавить отчёт</h1>
            <p className="text-gray-300 text-sm">Расскажи сообществу о своей рыбалке. Отметьте место на карте!</p>
          </div>

          {success && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
              <span className="text-green-300">✅ Отчёт опубликован! Перенаправление...</span>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
              <span className="text-red-300">❌ {error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6">
              <label className="block text-white font-semibold mb-2">📍 Место ловли (кликни по карте)</label>
              <div className="h-80 rounded-lg overflow-hidden border border-white/20 mb-3">
                <MapContainer
                  center={[lat || 58.6035, lng || 49.6680]}
                  zoom={10}
                  scrollWheelZoom={true}
                  className="h-full w-full"
                >
                  <TileLayer
                    attribution="&copy; OpenStreetMap"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <ClickHandler onMapClick={handleMapClick} />
                  {lat && lng && (
                    <Marker
                      position={[lat, lng]}
                      icon={defaultIcon}
                      draggable={true}
                      eventHandlers={{ dragend: handleMarkerDrag }}
                    >
                      <Popup>Точка ловли</Popup>
                    </Marker>
                  )}
                </MapContainer>
              </div>
              <p className="text-gray-400 text-sm">
                Координаты: <span className="text-blue-400">{lat?.toFixed(5)}, {lng?.toFixed(5)}</span>
              </p>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Например: р. Вятка, Киров"
                className="mt-3 w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6">
                <label className="block text-white font-semibold mb-2">Вид рыбы *</label>
                <select
                  name="fishType"
                  value={formData.fishType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500 transition"
                  required
                >
                  <option value="" style={{backgroundColor: "#1f2937", color: "white"}}>Выберите</option>
                  <option style={{backgroundColor: "#1f2937", color: "white"}}>Судак</option>
                  <option style={{backgroundColor: "#1f2937", color: "white"}}>Щука</option>
                  <option style={{backgroundColor: "#1f2937", color: "white"}}>Окунь</option>
                  <option style={{backgroundColor: "#1f2937", color: "white"}}>Лещ</option>
                  <option style={{backgroundColor: "#1f2937", color: "white"}}>Сом</option>
                  <option style={{backgroundColor: "#1f2937", color: "white"}}>Карась</option>
                  <option style={{backgroundColor: "#1f2937", color: "white"}}>Другой</option>
                </select>
              </div>
              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6">
                <label className="block text-white font-semibold mb-2">Вес (кг)</label>
                <input
                  type="number"
                  step="0.1"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="1.8"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition"
                />
              </div>
              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6">
                <label className="block text-white font-semibold mb-2">Приманка</label>
                <input
                  type="text"
                  name="lure"
                  value={formData.lure}
                  onChange={handleChange}
                  placeholder="Джиг, виброхвост"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition"
                />
              </div>
            </div>

            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6">
              <label className="block text-white font-semibold mb-2">Расскажи о рыбалке *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={6}
                placeholder="Где ловил, какая погода, как клевало..."
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition resize-none"
                required
              />
            </div>

            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6">
              <label className="block text-white font-semibold mb-2">Фото улова</label>
              <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-blue-500 transition cursor-pointer">
                <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" id="report-upload" />
                <label htmlFor="report-upload" className="cursor-pointer">
                  <div className="text-4xl mb-2">📷</div>
                  <p className="text-gray-300 text-sm">Нажмите для загрузки фото</p>
                </label>
              </div>
              {images.length > 0 && (
                <div className="mt-4 grid grid-cols-4 gap-2">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative aspect-square bg-white/10 rounded-lg overflow-hidden group">
                      <img
                        src={URL.createObjectURL(img)}
                        alt={img.name}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setImages(images.filter((_, i) => i !== idx))}
                        className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 opacity-0 group-hover:opacity-100 transition"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-lg disabled:opacity-50"
              >
                {isLoading ? "Публикация..." : "Опубликовать отчёт"}
              </button>
              <Link href="/reports" className="px-8 py-4 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition font-semibold text-lg text-center">
                Отмена
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
