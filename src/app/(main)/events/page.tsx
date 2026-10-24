import Link from "next/link";
import { Trophy, Calendar, MapPin, Users } from "lucide-react";

const events = [
  {
    id: 1,
    title: "Кубок Вятки по спиннингу",
    date: "15 ноября 2026",
    location: "р. Вятка, Киров",
    description: "Ежегодный турнир по ловле хищника. Призовой фонд 50 000 Р.",
    participants: 124,
    icon: Trophy,
    color: "from-orange-500 to-orange-600"
  },
  {
    id: 2,
    title: "Фестиваль зимней рыбалки",
    date: "20 декабря 2026",
    location: "оз. Орловское",
    description: "Семейный праздник с конкурсами, мастер-классами и горячим чаем.",
    participants: 256,
    icon: Calendar,
    color: "from-orange-500 to-orange-600"
  },
  {
    id: 3,
    title: "Турнир 'Хищник'",
    date: "5 января 2027",
    location: "Воткинское водохранилище",
    description: "Соревнование по ловле судака и щуки. Регистрация открыта.",
    participants: 89,
    icon: Trophy,
    color: "from-orange-500 to-orange-600"
  }
];

export default function EventsPage() {
  return (
    <div className="min-h-screen hero-background">
      <div className="relative z-10 pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-white transition">Главная</Link>
            <span>→</span>
            <span className="text-white">События</span>
          </nav>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Ближайшие события</h1>
            <p className="text-gray-300 text-lg">Турниры, фестивали и встречи рыбаков</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => {
              const Icon = event.icon;
              return (
                <div key={event.id} className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 hover:bg-white/15 transition group">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${event.color}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-gray-400 text-sm flex items-center gap-1">
                      <Calendar className="w-4 h-4" /> {event.date}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition">{event.title}</h3>
                  
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                    <MapPin className="w-4 h-4" /> {event.location}
                  </div>

                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">{event.description}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-gray-400 text-sm flex items-center gap-1">
                      <Users className="w-4 h-4" /> {event.participants} участников
                    </span>
                    <Link href={`/events/${event.id}`} className="text-blue-400 hover:text-blue-300 text-sm font-semibold transition">
                      Подробнее →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}