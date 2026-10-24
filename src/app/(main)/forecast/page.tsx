import Link from "next/link";

const forecast = {
  today: {
    date: "22 октября",
    temp: "+8°C",
    weather: "Облачно",
    icon: "☁️",
    wind: "3 м/с",
    pressure: "755 мм",
    activity: "good",
    activityText: "Хороший клёв",
    bestTime: "06:00 - 10:00, 18:00 - 21:00",
  },
  week: [
    { day: "Пт", date: "23", temp: "+6°C", icon: "️", activity: "medium" },
    { day: "Сб", date: "24", temp: "+4°C", icon: "️", activity: "bad" },
    { day: "Вс", date: "25", temp: "+7°C", icon: "☀️", activity: "good" },
    { day: "Пн", date: "26", temp: "+9°C", icon: "☀️", activity: "good" },
    { day: "Вт", date: "27", temp: "+5°C", icon: "☁️", activity: "medium" },
    { day: "Ср", date: "28", temp: "+3°C", icon: "🌨️", activity: "bad" },
    { day: "Чт", date: "29", temp: "+6°C", icon: "☁️", activity: "medium" },
  ],
  recommendations: [
    { fish: "Судак", activity: "Активен", lure: "Джиг, виброхвост", depth: "4-6 м", icon: "🐟" },
    { fish: "Щука", activity: "Умеренно", lure: "Воблер, блесна", depth: "2-4 м", icon: "🦈" },
    { fish: "Окунь", activity: "Активен", lure: "Микроджиг, вертушка", depth: "1-3 м", icon: "🐠" },
    { fish: "Лещ", activity: "Слабо", lure: "Фидер, опарыш", depth: "5-8 м", icon: "🐡" },
  ],
};

export default function ForecastPage() {
  const getActivityColor = (activity: string) => {
    if (activity === "good") return "bg-green-600/30 text-green-300 border-green-500/30";
    if (activity === "medium") return "bg-yellow-600/30 text-yellow-300 border-yellow-500/30";
    return "bg-red-600/30 text-red-300 border-red-500/30";
  };

  const getActivityText = (activity: string) => {
    if (activity === "good") return "Хороший";
    if (activity === "medium") return "Средний";
    return "Плохой";
  };

  return (
    <div className="min-h-screen hero-background">
      <div className="relative z-10 pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          
          {/* ХЛЕБНЫЕ КРОШКИ */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-white transition">Главная</Link>
            <span>→</span>
            <span className="text-white">Прогноз клёва</span>
          </nav>

          {/* ЗАГОЛОВОК */}
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 mb-6">
            <h1 className="text-3xl font-bold text-white mb-1">🌦️ Прогноз клёва</h1>
            <p className="text-gray-300 text-sm">Прогноз активности рыбы на основе погоды и давления</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* ЛЕВАЯ КОЛОНКА: ПРОГНОЗ НА СЕГОДНЯ */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* СЕГОДНЯ */}
              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-white">Сегодня</h2>
                    <p className="text-gray-400 text-sm">{forecast.today.date}</p>
                  </div>
                  <span className={
                    "px-4 py-2 rounded-full text-sm font-semibold border " +
                    getActivityColor(forecast.today.activity)
                  }>
                    {forecast.today.activityText}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-4xl mb-2">{forecast.today.icon}</div>
                    <div className="text-white font-bold">{forecast.today.temp}</div>
                    <div className="text-gray-400 text-xs">{forecast.today.weather}</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-4xl mb-2">💨</div>
                    <div className="text-white font-bold">{forecast.today.wind}</div>
                    <div className="text-gray-400 text-xs">Ветер</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-4xl mb-2">📊</div>
                    <div className="text-white font-bold">{forecast.today.pressure}</div>
                    <div className="text-gray-400 text-xs">Давление</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-4xl mb-2">🕐</div>
                    <div className="text-white font-bold text-xs">{forecast.today.bestTime.split(",")[0]}</div>
                    <div className="text-gray-400 text-xs">Лучшее время</div>
                  </div>
                </div>

                <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2">💡 Рекомендация</h3>
                  <p className="text-gray-300 text-sm">
                    Сегодня хороший день для рыбалки! Лучшее время клёва: <strong>{forecast.today.bestTime}</strong>. 
                    Рекомендуется использовать джиг и виброхвосты для судака, воблеры для щуки.
                  </p>
                </div>
              </div>

              {/* ПРОГНОЗ НА НЕДЕЛЮ */}
              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Прогноз на неделю</h3>
                <div className="grid grid-cols-7 gap-2">
                  {forecast.week.map((day, idx) => (
                    <div key={idx} className="text-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition">
                      <div className="text-gray-400 text-xs mb-1">{day.day}</div>
                      <div className="text-white text-sm font-semibold mb-2">{day.date}</div>
                      <div className="text-2xl mb-2">{day.icon}</div>
                      <div className="text-white text-xs font-bold mb-1">{day.temp}</div>
                      <span className={
                        "inline-block px-2 py-0.5 rounded-full text-xs border " +
                        getActivityColor(day.activity)
                      }>
                        {getActivityText(day.activity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* ПРАВАЯ КОЛОНКА: АКТИВНОСТЬ РЫБЫ */}
            <div className="space-y-6">
              
              {/* АКТИВНОСТЬ РЫБЫ */}
              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Активность рыбы</h3>
                <div className="space-y-3">
                  {forecast.recommendations.map((rec, idx) => (
                    <div key={idx} className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl">{rec.icon}</span>
                        <div className="flex-1">
                          <h4 className="text-white font-semibold">{rec.fish}</h4>
                          <span className={
                            "inline-block px-2 py-0.5 rounded-full text-xs border " +
                            getActivityColor(rec.activity.toLowerCase() === "активен" ? "good" : rec.activity.toLowerCase() === "умеренно" ? "medium" : "bad")
                          }>
                            {rec.activity}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-gray-400">Приманка:</span>
                          <p className="text-white">{rec.lure}</p>
                        </div>
                        <div>
                          <span className="text-gray-400">Глубина:</span>
                          <p className="text-white">{rec.depth}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ССЫЛКА НА КАРТУ */}
              <div className="backdrop-blur-md bg-gradient-to-br from-blue-600/30 to-purple-600/30 border border-blue-500/30 rounded-xl p-6 text-center">
                <div className="text-4xl mb-2">🗺️</div>
                <h3 className="text-white font-bold mb-2">Найди водоём рядом</h3>
                <p className="text-gray-300 text-sm mb-4">Смотри прогноз для конкретного места на карте</p>
                <Link
                  href="/map"
                  className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  Открыть карту
                </Link>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}