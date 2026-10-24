"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Trophy, Calendar, MapPin, Users, ArrowLeft } from "lucide-react";

const events = [
  { id: 1, title: "Кубок Вятки по спиннингу", date: "15 ноября 2026", location: "р. Вятка, Киров", description: "Ежегодный турнир по ловле хищника. Призовой фонд 50 000 Р. Участники соревнуются в ловле щуки, судака и окуня. Регистрация обязательна.", participants: 124, icon: Trophy, color: "from-orange-500 to-orange-600" },
  { id: 2, title: "Фестиваль зимней рыбалки", date: "20 декабря 2026", location: "оз. Орловское", description: "Семейный праздник с конкурсами, мастер-классами и горячим чаем. Подходит для всех возрастов. Призы для детей и взрослых.", participants: 256, icon: Calendar, color: "from-orange-500 to-orange-600" },
  { id: 3, title: "Турнир 'Хищник'", date: "5 января 2027", location: "Воткинское водохранилище", description: "Соревнование по ловле судака и щуки. Регистрация открыта. Опытные рыболовы делятся секретами зимней ловли.", participants: 89, icon: Trophy, color: "from-orange-500 to-orange-600" }
];

export default function EventDetailPage() {
  const params = useParams();
  const event = events.find(e => e.id === Number(params.id));

  if (!event) {
    return (
      <div className="min-h-screen hero-background flex items-center justify-center">
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-8 text-center">
          <div className="text-5xl mb-4"></div>
          <h2 className="text-2xl font-bold text-white mb-2">Событие не найдено</h2>
          <Link href="/events" className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
            ← Вернуться к событиям
          </Link>
        </div>
      </div>
    );
  }

  const Icon = event.icon;

  return (
    <div className="min-h-screen hero-background">
      <div className="relative z-10 pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-white transition">Главная</Link>
            <span>→</span>
            <Link href="/events" className="hover:text-white transition">События</Link>
            <span>→</span>
            <span className="text-white">{event.title}</span>
          </nav>

          <Link href="/events" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6 transition">
            <ArrowLeft className="w-4 h-4" /> Назад к событиям
          </Link>

          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className={`p-4 rounded-lg bg-gradient-to-br ${event.color}`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{event.title}</h1>
                <div className="flex items-center gap-4 text-gray-400 flex-wrap">
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {event.date}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {event.location}</span>
                  <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {event.participants} участников</span>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <h2 className="text-xl font-bold text-white mb-3">О событии</h2>
              <p className="text-gray-300 leading-relaxed">{event.description}</p>
            </div>

            <div className="border-t border-white/10 pt-6 mt-6">
              <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                Зарегистрироваться
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}