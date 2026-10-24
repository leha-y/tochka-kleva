"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FishingRod, MapPin } from "lucide-react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) {
      setLoading(false);
      return;
    }

    fetch("/api/search?q=" + encodeURIComponent(query))
      .then(res => res.json())
      .then(data => {
        setProducts(data.products || []);
        setLoading(false);
      });
  }, [query]);

  if (loading) {
    return (
      <div className="min-h-screen hero-background flex items-center justify-center">
        <div className="text-white text-xl">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen hero-background">
      <div className="relative z-10 pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-white transition">Главная</Link>
            <span>→</span>
            <span className="text-white">Поиск</span>
          </nav>

          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">
              {query ? "Результаты поиска: " + query : "Поиск объявлений"}
            </h1>
            <p className="text-gray-300 text-sm">
              {query ? "Найдено: " + products.length + " объявлений" : "Введите запрос в поле поиска выше"}
            </p>
          </div>

          {!query ? (
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-12 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-2xl font-bold text-white mb-2">Начните поиск</h2>
              <p className="text-gray-400">Введите название товара или описание в поле поиска в шапке сайта</p>
            </div>
          ) : products.length === 0 ? (
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-12 text-center">
              <div className="text-6xl mb-4">😕</div>
              <h2 className="text-2xl font-bold text-white mb-2">Ничего не найдено</h2>
              <p className="text-gray-400 mb-4">Попробуйте изменить запрос или посмотрите все объявления</p>
              <Link href="/categories/all" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                Все объявления
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <div key={product.id} className="relative">
                  <Link
                    href={"/product/" + product.id}
                    className="block backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 hover:bg-white/15 transition group"
                  >
                    <div className="h-40 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg mb-3 flex items-center justify-center group-hover:scale-105 transition">
                      <FishingRod className="w-16 h-16 text-white/30" />
                    </div>
                    <h3 className="text-white font-semibold mb-1 line-clamp-1">{product.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-white">{product.price} ₽</span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {product.city}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{product.condition === "new" ? "Новое" : "Б/У"}</p>
                    {product.description && (
                      <p className="text-xs text-gray-500 mt-2 line-clamp-2">{product.description}</p>
                    )}
                  </Link>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}