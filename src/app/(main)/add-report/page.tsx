"use client";

import { useState } from "react";
import Link from "next/link";

export default function AddReportPage() {
  const [formData, setFormData] = useState({
    location: "",
    fishType: "",
    weight: "",
    lure: "",
    description: "",
  });
  const [images, setImages] = useState<File[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImages(Array.from(e.target.files));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Отчёт отправлен на модерацию! (пока демо)");
  };

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
            <h1 className="text-3xl font-bold text-white mb-2">📍 Добавить отчёт</h1>
            <p className="text-gray-300 text-sm">Расскажи сообществу о своей рыбалке</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6">
              <label className="block text-white font-semibold mb-2">Водоём *</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="р. Вятка, Киров" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6">
                <label className="block text-white font-semibold mb-2">Вид рыбы *</label>
                <select name="fishType" value={formData.fishType} onChange={handleChange} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500 transition" required>
                  <option value="">Выберите</option>
                  <option>Судак</option><option>Щука</option><option>Окунь</option>
                  <option>Лещ</option><option>Сом</option><option>Карась</option>
                  <option>Другой</option>
                </select>
              </div>
              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6">
                <label className="block text-white font-semibold mb-2">Вес (кг)</label>
                <input type="number" step="0.1" name="weight" value={formData.weight} onChange={handleChange} placeholder="1.8" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition" />
              </div>
              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6">
                <label className="block text-white font-semibold mb-2">Приманка</label>
                <input type="text" name="lure" value={formData.lure} onChange={handleChange} placeholder="Джиг, виброхвост" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition" />
              </div>
            </div>

            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6">
              <label className="block text-white font-semibold mb-2">Расскажи о рыбалке *</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows={6} placeholder="Где ловил, какая погода, как клевало..." className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition resize-none" required />
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
                    <div key={idx} className="aspect-square bg-white/10 rounded-lg flex items-center justify-center text-xs text-gray-400">{img.name}</div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <button type="submit" className="flex-1 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-lg">Опубликовать отчёт</button>
              <Link href="/reports" className="px-8 py-4 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition font-semibold text-lg text-center">Отмена</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}