"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function Header() {
  const { user, signOut } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    if (user?.email) {
      setDisplayName(user.email.split("@")[0]);
    }
  }, [user]);

  const handleLogout = async () => {
    await signOut();
    setShowMenu(false);
    window.location.href = "/";
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/30 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🎣</span>
          <span className="text-xl font-bold text-white">Точка Клёва</span>
        </Link>

        <nav className="hidden md:flex items-center gap-4">
          <Link href="/contacts" className="px-3 py-1.5 bg-amber-500/20 border border-amber-500/40 text-amber-300 hover:bg-amber-500/30 hover:text-amber-200 transition text-sm font-semibold rounded-lg flex items-center gap-1.5">
            💬 Жалобы и предложения
          </Link>
          <Link href="/reports" className="text-blue-400 hover:text-blue-300 transition text-sm font-semibold">С водоёма</Link>
          <Link href="/map" className="text-gray-300 hover:text-white transition text-sm">Карта</Link>
          <Link href="/forecast" className="text-gray-300 hover:text-white transition text-sm">Прогноз</Link>
          <Link href="/rating" className="text-gray-300 hover:text-white transition text-sm">Рейтинг</Link>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2 px-3 py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                  {displayName[0]?.toUpperCase() || "P"}
                </div>
                <span className="text-white text-sm font-semibold hidden sm:block">{displayName}</span>
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-56 backdrop-blur-md bg-gray-900/95 border border-white/20 rounded-xl shadow-2xl overflow-hidden">
                  <div className="p-3 border-b border-white/10">
                    <p className="text-white font-semibold text-sm">{displayName}</p>
                    <p className="text-gray-400 text-xs truncate">{user.email}</p>
                  </div>
                  <Link href="/profile" onClick={() => setShowMenu(false)} className="block px-4 py-2 text-gray-300 hover:bg-white/10 hover:text-white transition text-sm">
                    Личный кабинет
                  </Link>
                  <Link href="/add" onClick={() => setShowMenu(false)} className="block px-4 py-2 text-gray-300 hover:bg-white/10 hover:text-white transition text-sm">
                    + Подать объявление
                  </Link>
                  <Link href="/add-report" onClick={() => setShowMenu(false)} className="block px-4 py-2 text-gray-300 hover:bg-white/10 hover:text-white transition text-sm">
                    Добавить отчёт
                  </Link>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-400 hover:bg-red-600/10 transition text-sm border-t border-white/10">
                    Выйти из аккаунта
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex items-center">
              <Link href="/login" className="px-4 py-2 text-gray-300 hover:text-white transition text-sm">Войти</Link>
              <Link href="/register" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition shadow-lg">Регистрация</Link>
            </div>
          )}

          <div className="hidden md:flex items-center">
            <form action="/search" method="GET" className="relative">
              <input
                type="text"
                name="q"
                placeholder="Поиск снастей..."
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition w-48"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                🔍
              </button>
            </form>
          </div>

          <Link href="/add" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition shadow-lg hidden sm:block">
            + Подать объявление
          </Link>
        </div>
      </div>
    </header>
  );
}