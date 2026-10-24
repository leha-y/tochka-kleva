import Link from "next/link";

export default function RulesPage() {
  const rules = [
    { title: "1. Уважение к участникам", text: "Запрещены оскорбления, мат и токсичное поведение. Мы — сообщество единомышленников." },
    { title: "2. Честные объявления", text: "Указывайте реальное состояние товара. Фото должны соответствовать описанию. За обман — бан." },
    { title: "3. Запрет на перепродажу", text: "Площадка для личных продаж. Коммерческие перекупы без согласия администрации запрещены." },
    { title: "4. Модерация контента", text: "Все объявления и отчёты проходят модерацию. Мы удаляем спам, рекламу и нерелевантный контент." },
    { title: "5. Безопасность сделок", text: "Рекомендуем встречаться в людных местах. Проверяйте товар перед оплатой. Администрация не несёт ответственности за сделки между пользователями." },
    { title: "6. Авторские права", text: "Используйте только свои фотографии. Контент других пользователей — их собственность." },
  ];

  return (
    <div className="min-h-screen hero-background">
      <div className="relative z-10 pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-white transition">Главная</Link>
            <span>→</span>
            <span className="text-white">Правила</span>
          </nav>

          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-8">
            <h1 className="text-4xl font-bold text-white mb-6">📜 Правила сайта</h1>
            <div className="space-y-6">
              {rules.map((rule, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h3 className="text-white font-bold text-lg mb-2">{rule.title}</h3>
                  <p className="text-gray-300">{rule.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 p-4 bg-blue-600/20 border border-blue-500/30 rounded-lg">
              <p className="text-gray-300 text-sm">Последнее обновление: 22 октября 2026. Администрация оставляет за собой право изменять правила.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}