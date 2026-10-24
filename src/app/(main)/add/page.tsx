"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    condition: "used",
    city: "",
    phone: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!user) {
      setError("Сначала войдите в аккаунт");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("products").insert({
      user_id: user.id,
      title: formData.title,
      category: formData.category,
      price: parseFloat(formData.price),
      condition: formData.condition,
      city: formData.city,
      phone: formData.phone,
      description: formData.description,
      status: "active",
    });

    if (error) {
      setError("Ошибка при создании объявления: " + error.message);
    } else {
      alert("Объявление успешно создано!");
      router.push("/profile");
    }

    setLoading(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen hero-background flex items-center justify-center">
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-8 text-center">
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-white mb-2">Нужна авторизация</h2>
          <p className="text-gray-400 mb-4">Войдите, чтобы подать объявление</p>
          <Link href="/login" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
            Войти
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen hero-background">
      <div className="relative z-10 pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-white transition">Главная</Link>
            <span>→</span>
            <span className="text-white">Подать объявление</span>
          </nav>

          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">Подать объявление</h1>
            <p className="text-gray-300 text-sm">Заполните форму, чтобы добавить товар на продажу</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-600/30 border border-red-500/30 rounded-xl text-red-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6">
              <label className="block text-white font-semibold mb-2">Название товара *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Например: Спиннинг Major Craft Solpara"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6">
                <label className="block text-white font-semibold mb-2">Категория *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white [&>option]:text-black [&>option]:bg-white focus:outline-none focus:border-blue-500 transition"
                  required
                >
                  <option value="">Выберите категорию</option>
                  <option value="snasti">Снасти и оснастка</option>
                  <option value="lodki">Лодки и моторы</option>
                  <option value="odezhda">Одежда и экипировка</option>
                  <option value="kemping">Кемпинг и палатки</option>
                  <option value="elektronika">Электроника</option>
                  <option value="rashodniki">Расходники и прочее</option>
                </select>
              </div>

              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6">
                <label className="block text-white font-semibold mb-2">Состояние *</label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white [&>option]:text-black [&>option]:bg-white focus:outline-none focus:border-blue-500 transition"
                  required
                >
                  <option value="new">Новое</option>
                  <option value="used">Б/У</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6">
                <label className="block text-white font-semibold mb-2">Цена (₽) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="3500"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition"
                  required
                />
              </div>

              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6">
                <label className="block text-white font-semibold mb-2">Город *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Киров"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition"
                  required
                />
              </div>
            </div>

            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6">
              <label className="block text-white font-semibold mb-2">Телефон для связи *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+7 (912) 345-67-89"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition"
                required
              />
            </div>

            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6">
              <label className="block text-white font-semibold mb-2">Описание *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Опишите товар: состояние, комплектация, причина продажи..."
                rows={6}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition resize-none"
                required
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Публикация..." : "Опубликовать объявление"}
              </button>
              <Link
                href="/"
                className="px-8 py-4 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition font-semibold text-lg text-center"
              >
                Отмена
              </Link>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}