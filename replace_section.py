import re

page_file = 'src/app/(main)/page.tsx'

with open(page_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Находим секцию ВЕРХНИЙ РЯД и заменяем её
old_pattern = r'/\* ВЕРХНИЙ РЯД: Отчёты \| Hero \| Чат \*/\s*<section className="max-w-7xl mx-auto px-4 pt-24 pb-12 grid grid-cols-1 lg:grid-cols-3 gap-6">.*?</section>'

new_section = '''/* ВЕРХНИЙ РЯД: Топ приманка | Отчёты | Hero | Чат | Реклама */
        <section className="max-w-[1400px] mx-auto px-4 pt-24 pb-12 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4">
          
          {/* ЛЕВАЯ КОЛОНКА: Топ приманка */}
          <div className="md:col-span-1 xl:col-span-1 order-2 md:order-1">
            <TopLureWidget />
          </div>

          {/* Отчёты */}
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 order-1 md:order-2 xl:col-span-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Последние отчёты</h2>
              <Link href="/reports" className="text-blue-400 hover:text-blue-300 transition text-sm">Все →</Link>
            </div>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {mockReports.map((report) => (
                <div key={report.id} className="bg-white/5 border border-white/10 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                        {report.author[0]}
                      </div>
                      <div>
                        <div className="text-white text-sm font-semibold">{report.author}</div>
                        <div className="text-gray-400 text-xs">📍 {report.location} · {report.time}</div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">{report.text}</p>
                  <div className="text-xs text-gray-400 mt-1">❤️ {report.likes}</div>
                </div>
              ))}
            </div>
            <Link href="/reports" className="block w-full mt-4 py-3 bg-blue-600/30 text-blue-300 rounded-lg hover:bg-blue-600/50 transition text-center text-sm font-semibold border border-blue-500/30">
              Открыть все отчёты
            </Link>
          </div>

          {/* ЦЕНТР: Hero */}
          <div className="flex flex-col items-center justify-center text-center px-4 order-3 xl:col-span-1">
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold text-white mb-4">Точка Клёва</h1>
            <p className="text-lg text-gray-300 mb-6">Твоё место силы и честных снастей</p>
            <div className="flex justify-center gap-3 flex-wrap">
              <Link href="/categories/all" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold shadow-lg">
                Найти снасть
              </Link>
              <Link href="/add" className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-lg hover:bg-white/20 transition font-semibold">
                Продать снасть
              </Link>
            </div>
          </div>

          {/* Чат */}
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 order-4 xl:col-span-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <MessageCircle className="w-5 h-5" /> Общий чат
              </h2>
              <span className="text-green-400 text-sm flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                127 онлайн
              </span>
            </div>
            <div className="space-y-3 max-h-80 overflow-y-auto mb-4">
              {mockChat.map((msg) => (
                <div key={msg.id} className="bg-white/5 border border-white/10 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-blue-400 text-sm font-semibold">{msg.user}</span>
                    <span className="text-gray-500 text-xs">{msg.time}</span>
                  </div>
                  <p className="text-gray-300 text-sm">{msg.text}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Написать..."
                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition text-sm"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm">
                →
              </button>
            </div>
          </div>

          {/* ПРАВАЯ КОЛОНКА: Реклама */}
          <div className="md:col-span-1 xl:col-span-1 order-5">
            <AdBlock />
          </div>

        </section>'''

# Заменяем секцию
new_content, count = re.subn(old_pattern, new_section, content, flags=re.DOTALL)

if count > 0:
    with open(page_file, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f'Секция заменена! ({count} раз)')
else:
    print('Секция не найдена. Пробуем альтернативный поиск...')
    # Пробуем найти по началу
    start_marker = '/* ВЕРХНИЙ РЯД: Отчёты | Hero | Чат */'
    if start_marker in content:
        print(f'Начало найдено на позиции {content.find(start_marker)}')
        # Находим конец секции - ищем следующий </section> после начала
        start_pos = content.find(start_marker)
        end_marker = '</section>'
        end_pos = content.find(end_marker, start_pos)
        if end_pos > 0:
            print(f'Конец найден на позиции {end_pos}')
            new_content = content[:start_pos] + new_section + content[end_pos + len(end_marker):]
            with open(page_file, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print('Секция заменена вручную!')
        else:
            print('Конец секции не найден')
    else:
        print('Начало секции не найдено')

print('Готово!')
