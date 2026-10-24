"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [seller, setSeller] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params.id) return;

    supabase
      .from("products")
      .select("*")
      .eq("id", params.id)
      .single()
      .then(({ data, error }) => {
        if (data && !error) {
          setProduct(data);
          // Загружаем профиль продавца
          supabase
            .from("profiles")
            .select("*")
            .eq("id", data.user_id)
            .single()
            .then(({ data: sellerData }) => {
              if (sellerData) setSeller(sellerData);
            });
        }
        setLoading(false);
      });
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen hero-background flex items-center justify-center">
        <div className="text-white text-xl">Загрузка...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen hero-background flex items-center justify-center">
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-8 text-center">
          <div className="text-5xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-white mb-2">Товар не найден</h2>
          <p className="text-gray-400 mb-4">Возможно, он был удалён или не существует</p>
          <Link href="/" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
            На главную
          </Link>
        </div>
      </div>
    );
  }

  const categoryNames: Record<string, string> = {
    snasti: "Снасти и оснастка",
    lodki: "Лодки и моторы",
    odezhda: "Одежда и экипировка",
    kemping: "Кемпинг и палатки",
    elektronika: "Электроника",
    rashodniki: "Расходники и прочее",
  };

  return (
    <div className="min-h-screen hero-background">
      <div className="relative z-10 pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-white transition">Главная</Link>
            <span>→</span>
            <Link href={"/categories/" + product.category} className="hover:text-white transition">
              {categoryNames[product.category] || product.category}
            </Link>
            <span>→</span>
            <span className="text-white truncate max-w-xs">{product.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl overflow-hidden">
              <div className="aspect-square bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                <span className="text-9xl opacity-30">🎣</span>
              </div>
            </div>

            <div className="space-y-6">
              
              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <h1 className="text-3xl font-bold text-white flex-1">{product.title}</h1>
                  <span className={
                    "px-3 py-1 rounded-full text-xs font-semibold ml-4 " +
                    (product.status === "active" ? "bg-green-600/30 text-green-300 border border-green-500/30" : "bg-gray-600/30 text-gray-300 border border-gray-500/30")
                  }>
                    {product.status === "active" ? "Активно" : "Продано"}
                  </span>
                </div>

                <div className="text-4xl font-bold text-white mb-4">{product.price} ₽</div>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-blue-600/30 text-blue-300 rounded-full text-sm border border-blue-500/30">
                    {categoryNames[product.category] || product.category}
                  </span>
                  <span className="px-3 py-1 bg-purple-600/30 text-purple-300 rounded-full text-sm border border-purple-500/30">
                    {product.condition === "new" ? "Новое" : "Б/У"}
                  </span>
                  <span className="px-3 py-1 bg-orange-600/30 text-orange-300 rounded-full text-sm border border-orange-500/30">
                     {product.city}
                  </span>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <h3 className="text-lg font-bold text-white mb-2">Описание</h3>
                  <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{product.description}</p>
                </div>
              </div>

              {seller && (
                <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Продавец</h3>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
                      {(seller.username || "?")[0].toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-semibold text-lg">{seller.username || "Пользователь"}</div>
                      <div className="text-gray-400 text-sm">📍 {seller.city || "Не указан"}</div>
                      <div className="text-gray-400 text-sm">На сайте с {new Date(seller.created_at).toLocaleDateString("ru-RU", { year: "numeric", month: "long" })}</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Связаться с продавцом</h3>
                {product.phone && (
                  <a
                    href={"tel:" + product.phone}
                    className="block w-full py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold text-center text-lg mb-3"
                  >
                     Позвонить: {product.phone}
                  </a>
                )}
                <Link
                  href="/"
                  className="block w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-center text-lg"
                >
                   Написать сообщение
                </Link>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}