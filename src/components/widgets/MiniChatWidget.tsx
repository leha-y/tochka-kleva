export default function MiniChatWidget() {
  const messages = [
    { author: "Рыбак_Киров", message: "Всем привет! Кто сегодня на Вятку?", time: "14:32" },
    { author: "Спиннингист", message: "Я планирую к 17:00", time: "14:35" },
    { author: "Рыбак_Киров", message: "Отлично, встретимся у моста", time: "14:36" },
    { author: "Новичок", message: "Подскажите, какой спиннинг выбрать?", time: "14:40" },
    { author: "Опытный", message: "Major Craft Solpara — топ!", time: "14:42" },
  ];

  return (
    <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-5 h-80 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-white">💬 Общий чат</h3>
        <span className="text-green-400 text-xs flex items-center gap-1">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          127 онлайн
        </span>
      </div>
      <div className="space-y-2 flex-1 overflow-y-auto custom-scrollbar mb-3">
        {messages.map((msg, idx) => (
          <div key={idx} className="bg-white/5 border border-white/10 rounded-lg p-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-blue-400 font-semibold text-xs">{msg.author}</span>
              <span className="text-gray-500 text-xs">{msg.time}</span>
            </div>
            <p className="text-gray-300 text-xs">{msg.message}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Написать..."
          className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-xs placeholder-gray-400 focus:outline-none focus:border-blue-500 transition"
        />
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-xs font-semibold">
          →
        </button>
      </div>
    </div>
  );
}
