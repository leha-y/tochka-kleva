"use client";

import { useState } from "react";
import Link from "next/link";

type SortType = "total" | "fish" | "reports" | "sales";

const mockUsers = [
  { id: 1, name: "Алексей Рыбаков", city: "Киров", avatar: "А", fish: 47, reports: 23, sales: 15, rating: 4.9, achievements: 12, level: 8 },
  { id: 2, name: "Дмитрий Щукин", city: "Кировская обл.", avatar: "Д", fish: 38, reports: 19, sales: 12, rating: 4.7, achievements: 10, level: 7 },
  { id: 3, name: "Иван Лещёв", city: "Киров", avatar: "И", fish: 31, reports: 15, sales: 18, rating: 4.8, achievements: 9, level: 6 },
  { id: 4, name: "Сергей Сомов", city: "Пермский край", avatar: "С", fish: 28, reports: 12, sales: 8, rating: 4.5, achievements: 7, level: 5 },
  { id: 5, name: "Михаил Окунёв", city: "Киров", avatar: "М", fish: 24, reports: 11, sales: 10, rating: 4.6, achievements: 6, level: 5 },
  { id: 6, name: "Андрей Карасёв", city: "Кировская обл.", avatar: "А", fish: 19, reports: 9, sales: 6, rating: 4.3, achievements: 5, level: 4 },
  { id: 7, name: "Павел Судачков", city: "Киров", avatar: "П", fish: 15, reports: 7, sales: 5, rating: 4.2, achievements: 4, level: 3 },
  { id: 8, name: "Николай Плотвицын", city: "Кировская обл.", avatar: "Н", fish: 12, reports: 5, sales: 4, rating: 4.0, achievements: 3, level: 3 },
  { id: 9, name: "Виктор Голавлёв", city: "Киров", avatar: "В", fish: 9, reports: 4, sales: 3, rating: 3.9, achievements: 2, level: 2 },
  { id: 10, name: "Олег Жерехов", city: "Пермский край", avatar: "О", fish: 6, reports: 2, sales: 2, rating: 3.7, achievements: 1, level: 1 },
];

export default function RatingPage() {
  const [sortBy, setSortBy] = useState<SortType>("total");

  const getLevelColor = (level: number) => {
    if (level >= 7) return "from-yellow-400 to-orange-500";
    if (level >= 5) return "from-blue-400 to-purple-500";
    if (level >= 3) return "from-green-400 to-teal-500";
    return "from-gray-400 to-gray-600";
  };

  const getMedal = (rank: number) => {
    if (rank === 1) return { icon: "", color: "text-yellow-400" };
    if (rank === 2) return { icon: "🥈", color: "text-gray-300" };
    if (rank === 3) return { icon: "", color: "text-orange-400" };
    return { icon: `#${rank}`, color: "text-gray-400" };
  };

  const sortedUsers = [...mockUsers].sort((a, b) => {
    if (sortBy === "fish") return b.fish - a.fish;
    if (sortBy === "reports") return b.reports - a.reports;
    if (sortBy === "sales") return b.sales - a.sales;
    return (b.fish + b.reports * 2 + b.sales * 3) - (a.fish + a.reports * 2 + a.sales * 3);
  });

  const topThree = sortedUsers.slice(0, 3);
  const restUsers = sortedUsers.slice(3);

  return (
    <div className="min-h-screen hero-background">
      <div className="relative z-10 pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-white transition">Главная</Link>
            <span>→</span>
            <span className="text-white">Рейтинг рыбаков</span>
          </nav>

          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">🏆 Рейтинг рыбаков</h1>
                <p className="text-gray-300 text-sm">Топ участников сообщества "Точка Клёва"</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSortBy("total")}
                  className={"px-4 py-2 rounded-lg text-sm font-semibold transition " + (sortBy === "total" ? "bg-blue-600 text-white" : "bg-white/10 text-gray-300 hover:bg-white/20")}
                >
                  Общий
                </button>
                <button
                  onClick={() => setSortBy("fish")}
                  className={"px-4 py-2 rounded-lg text-sm font-semibold transition " + (sortBy === "fish" ? "bg-blue-600 text-white" : "bg-white/10 text-gray-300 hover:bg-white/20")}
                >
                  По улову
                </button>
                <button
                  onClick={() => setSortBy("reports")}
                  className={"px-4 py-2 rounded-lg text-sm font-semibold transition " + (sortBy === "reports" ? "bg-blue-600 text-white" : "bg-white/10 text-gray-300 hover:bg-white/20")}
                >
                  По отчётам
                </button>
                <button
                  onClick={() => setSortBy("sales")}
                  className={"px-4 py-2 rounded-lg text-sm font-semibold transition " + (sortBy === "sales" ? "bg-blue-600 text-white" : "bg-white/10 text-gray-300 hover:bg-white/20")}
                >
                  По продажам
                </button>
              </div>
            </div>
          </div>

          {/* ТОП-3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {topThree.map((user, idx) => {
              const medal = getMedal(idx + 1);
              const isWinner = idx === 0;
              return (
                <div
                  key={user.id}
                  className={
                    "backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 text-center transition " +
                    (isWinner ? "md:scale-110 md:-mt-4 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/30" : "")
                  }
                >
                  <div className={"text-6xl mb-3 " + medal.color}>{medal.icon}</div>
                  <div className={"w-20 h-20 rounded-full bg-gradient-to-br " + getLevelColor(user.level) + " flex items-center justify-center text-white font-bold text-2xl mx-auto mb-3 shadow-lg"}>
                    {user.avatar}
                  </div>
                  <h3 className="text-white font-bold text-lg mb-1">{user.name}</h3>
                  <p className="text-gray-400 text-sm mb-3">📍 {user.city}</p>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-white font-bold">{user.fish}</div>
                      <div className="text-gray-500 text-xs">рыбы</div>
                    </div>
                    <div>
                      <div className="text-white font-bold">{user.reports}</div>
                      <div className="text-gray-500 text-xs">отчётов</div>
                    </div>
                    <div>
                      <div className="text-white font-bold">{user.sales}</div>
                      <div className="text-gray-500 text-xs">продаж</div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-center gap-2">
                    <span className="text-yellow-400 text-sm">★ {user.rating}</span>
                    <span className="text-gray-500 text-xs">·</span>
                    <span className="text-blue-400 text-xs">Уровень {user.level}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ОСТАЛЬНЫЕ */}
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Остальные участники</h2>
            <div className="space-y-3">
              {restUsers.map((user, idx) => {
                const rank = idx + 4;
                const medal = getMedal(rank);
                return (
                  <div key={user.id} className="bg-white/5 border border-white/10 rounded-lg p-4 flex items-center gap-4 hover:bg-white/10 transition">
                    <div className={"text-2xl font-bold w-12 text-center " + medal.color}>
                      {medal.icon}
                    </div>
                    <div className={"w-12 h-12 rounded-full bg-gradient-to-br " + getLevelColor(user.level) + " flex items-center justify-center text-white font-bold flex-shrink-0"}>
                      {user.avatar}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold">{user.name}</h4>
                      <p className="text-gray-400 text-xs">📍 {user.city} · ★ {user.rating}</p>
                    </div>
                    <div className="hidden md:flex items-center gap-6 text-sm">
                      <div className="text-center">
                        <div className="text-white font-bold">{user.fish}</div>
                        <div className="text-gray-500 text-xs">рыбы</div>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-bold">{user.reports}</div>
                        <div className="text-gray-500 text-xs">отчётов</div>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-bold">{user.sales}</div>
                        <div className="text-gray-500 text-xs">продаж</div>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-bold">{user.achievements}</div>
                        <div className="text-gray-500 text-xs">достижений</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="px-3 py-1 bg-blue-600/30 text-blue-300 text-xs rounded-full border border-blue-500/30">
                        Ур. {user.level}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* СТАТИСТИКА */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 text-center">
              <div className="text-3xl mb-2"></div>
              <div className="text-white font-bold text-xl">1 247</div>
              <div className="text-gray-400 text-sm">участников</div>
            </div>
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">🐟</div>
              <div className="text-white font-bold text-xl">8 432</div>
              <div className="text-gray-400 text-sm">поймано рыб</div>
            </div>
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 text-center">
              <div className="text-3xl mb-2"></div>
              <div className="text-white font-bold text-xl">2 156</div>
              <div className="text-gray-400 text-sm">отчётов</div>
            </div>
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 text-center">
              <div className="text-3xl mb-2"></div>
              <div className="text-white font-bold text-xl">5 746</div>
              <div className="text-gray-400 text-sm">сделок</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}