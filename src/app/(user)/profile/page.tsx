"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type Tab = "products" | "reports" | "favorites" | "achievements" | "notifications" | "settings";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<Tab>("products");
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [myProducts, setMyProducts] = useState<any[]>([]);

  useEffect(() => {
    if (loading) return;
    
    if (!user) {
      router.push("/login");
      return;
    }

    supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single()
      .then(({ data, error }) => {
        if (data) {
          setProfile(data);
        } else {
          supabase
            .from("profiles")
            .insert({
              id: user.id,
              username: user.email?.split("@")[0] || "Рыбак",
              city: "Не указан",
            })
            .then(() => {
              setProfile({
                id: user.id,
                username: user.email?.split("@")[0] || "Рыбак",
                city: "Не указан",
                created_at: new Date().toISOString(),
              });
            });
        }
        setProfileLoading(false);
      });

    supabase
      .from("products")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) setMyProducts(data);
      });
  }, [user, loading]);

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("Удалить это объявление?")) return;
    const { error } = await supabase.from("products").delete().eq("id", productId);
    if (!error) {
      setMyProducts(myProducts.filter(p => p.id !== productId));
    }
  };

  if (loading || profileLoading) {
    return (
      <div className="min-h-screen hero-background flex items-center justify-center">
        <div className="text-white text-xl">Загрузка...</div>
      </div>
    );
  }

  if (!user) return null;

  const tabs = [
    { id: "products" as Tab, name: "Мои объявления", icon: "", count: myProducts.length },
    { id: "reports" as Tab, name: "Мои отчёты", icon: "", count: 0 },
    { id: "favorites" as Tab, name: "Избранное", icon: "❤️", count: 0 },
    { id: "achievements" as Tab, name: "Достижения", icon: "🏆", count: 0 },
    { id: "notifications" as Tab, name: "Уведомления", icon: "", count: 0 },
    { id: "settings" as Tab, name: "Настройки", icon: "⚙️", count: 0 },
  ];

  const displayName = profile?.username || user.email?.split("@")[0] || "Рыбак";
  const displayCity = profile?.city || "Не указан";

  return (
    <div className="min-h-screen hero-background">
      <div className="relative z-10 pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-white transition">Главная</Link>
            <span>→</span>
            <span className="text-white">Личный кабинет</span>
          </nav>

          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-3xl flex-shrink-0">
                {displayName[0].toUpperCase()}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-white mb-1">{displayName}</h1>
                <div className="flex items-center gap-3 text-sm text-gray-400 flex-wrap">
                  <span> {user.email}</span>
                  <span>·</span>
                  <span>📍 {displayCity}</span>
                </div>
                <div className="text-gray-400 text-sm mt-2">
                  На сайте с {new Date().toLocaleDateString("ru-RU", { year: "numeric", month: "long" })}
                </div>
              </div>
              <Link
                href="/add"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                + Подать объявление
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            <aside className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-3 h-fit">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={
                    "w-full flex items-center justify-between px-4 py-3 rounded-lg mb-1 transition text-left " +
                    (activeTab === tab.id
                      ? "bg-blue-600/30 border border-blue-500/30 text-white"
                      : "text-gray-300 hover:bg-white/10 border border-transparent")
                  }
                >
                  <span className="flex items-center gap-2 text-sm">
                    <span>{tab.icon}</span>
                    <span>{tab.name}</span>
                  </span>
                  {tab.count > 0 && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-600 text-white">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-3 rounded-lg mt-2 text-red-400 hover:bg-red-600/10 transition text-left text-sm border border-transparent"
              >
                <span>🚪</span>
                <span>Выйти из аккаунта</span>
              </button>
            </aside>

            <div className="lg:col-span-3">
              
              {activeTab === "products" && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-white mb-4">Мои объявления</h2>
                  {myProducts.length === 0 ? (
                    <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-8 text-center">
                      <div className="text-5xl mb-4">📦</div>
                      <h2 className="text-xl font-bold text-white mb-2">У тебя пока нет объявлений</h2>
                      <p className="text-gray-400 mb-4">Подай первое объявление и оно появится здесь</p>
                      <Link href="/add" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                        + Подать объявление
                      </Link>
                    </div>
                  ) : (
                    myProducts.map((product: any) => (
                      <div key={product.id} className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 flex items-center gap-4 group">
                        <Link href={"/product/" + product.id} className="flex items-center gap-4 flex-1 min-w-0">
                          <div className="w-24 h-24 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:from-blue-700 group-hover:to-purple-900 transition">
                            <span className="text-3xl opacity-30">🎣</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-white font-semibold mb-1 truncate group-hover:text-blue-300 transition">{product.title}</h3>
                            <div className="flex items-center gap-3 text-sm text-gray-400">
                              <span className="text-lg font-bold text-white">{product.price} ₽</span>
                              <span>·</span>
                              <span> {product.city}</span>
                              <span>·</span>
                              <span>{product.condition === "new" ? "Новое" : "Б/У"}</span>
                            </div>
                            <p className="text-gray-400 text-sm mt-1 line-clamp-2">{product.description}</p>
                          </div>
                        </Link>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className={
                            "px-3 py-1 rounded-full text-xs font-semibold " +
                            (product.status === "active" ? "bg-green-600/30 text-green-300 border border-green-500/30" : "bg-gray-600/30 text-gray-300 border border-gray-500/30")
                          }>
                            {product.status === "active" ? "Активно" : "Продано"}
                          </span>
                          <Link
                            href={"/product/" + product.id + "/edit"}
                            className="p-2 text-blue-400 hover:bg-blue-600/20 rounded-lg transition"
                            title="Редактировать"
                          >
                            ✏️
                          </Link>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="p-2 text-red-400 hover:bg-red-600/20 rounded-lg transition"
                            title="Удалить"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === "reports" && (
                <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-8 text-center">
                  <div className="text-5xl mb-4"></div>
                  <h2 className="text-xl font-bold text-white mb-2">У тебя пока нет отчётов</h2>
                  <p className="text-gray-400 mb-4">Поделись своей первой рыбалкой с сообществом</p>
                  <Link href="/add-report" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                    + Добавить отчёт
                  </Link>
                </div>
              )}

              {activeTab === "favorites" && (
                <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-8 text-center">
                  <div className="text-5xl mb-4">❤️</div>
                  <h2 className="text-xl font-bold text-white mb-2">Избранное пусто</h2>
                  <p className="text-gray-400">Добавляй товары в избранное, чтобы не потерять</p>
                </div>
              )}

              {activeTab === "achievements" && (
                <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-8 text-center">
                  <div className="text-5xl mb-4">🏆</div>
                  <h2 className="text-xl font-bold text-white mb-2">Достижения</h2>
                  <p className="text-gray-400">Начни активно пользоваться сайтом, чтобы получать достижения</p>
                </div>
              )}

              {activeTab === "notifications" && (
                <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-8 text-center">
                  <div className="text-5xl mb-4">🔔</div>
                  <h2 className="text-xl font-bold text-white mb-2">Нет уведомлений</h2>
                  <p className="text-gray-400">Здесь будут появляться уведомления о активности</p>
                </div>
              )}

              {activeTab === "settings" && (
                <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-white mb-4">Настройки профиля</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white text-sm font-semibold mb-2">Имя</label>
                      <input type="text" defaultValue={profile?.username || ""} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500 transition" />
                    </div>
                    <div>
                      <label className="block text-white text-sm font-semibold mb-2">Email</label>
                      <input type="email" defaultValue={user?.email || ""} disabled className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-gray-400" />
                    </div>
                    <div>
                      <label className="block text-white text-sm font-semibold mb-2">Город</label>
                      <input type="text" defaultValue={profile?.city || ""} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500 transition" />
                    </div>
                    <div className="flex gap-3 pt-4">
                      <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">Сохранить</button>
                      <button onClick={handleLogout} className="px-6 py-3 bg-red-600/30 text-red-300 rounded-lg hover:bg-red-600/50 transition font-semibold border border-red-500/30">Выйти из аккаунта</button>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}