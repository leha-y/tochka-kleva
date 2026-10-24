export default function MiniReportsWidget() {
  const reports = [
    { author: "Алексей", location: "р. Вятка", text: "Судак 1.8 кг на джиг", time: "2ч назад", likes: 24 },
    { author: "Дмитрий", location: "оз. Орловское", text: "Щука 3.2 кг на воблер", time: "5ч назад", likes: 18 },
    { author: "Иван", location: "р. Чепца", text: "Лещ 1.8 кг на фидер", time: "Вчера", likes: 31 },
  ];

  return (
    <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-5 h-80 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-white"> Последние отчёты</h3>
        <a href="/reports" className="text-blue-400 hover:text-blue-300 text-xs font-semibold">
          Все →
        </a>
      </div>
      <div className="space-y-2 flex-1 overflow-y-auto custom-scrollbar">
        {reports.map((post, idx) => (
          <div key={idx} className="bg-white/5 border border-white/10 rounded-lg p-2">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                {post.author[0]}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-semibold text-xs truncate">{post.author}</h4>
                <p className="text-gray-400 text-xs"> {post.location} · {post.time}</p>
              </div>
            </div>
            <p className="text-gray-300 text-xs mb-1">{post.text}</p>
            <div className="flex items-center gap-1 text-gray-400 text-xs">
              <span>❤️ {post.likes}</span>
            </div>
          </div>
        ))}
      </div>
      <a href="/reports" className="mt-3 w-full py-2 bg-blue-600/30 text-blue-300 rounded-lg text-xs hover:bg-blue-600/50 transition text-center border border-blue-500/30 block">
        Открыть все отчёты
      </a>
    </div>
  );
}
