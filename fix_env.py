# Читаем файл
with open('.env.local', 'r', encoding='utf-8') as f:
    content = f.read()

# Исправляем разбитый URL
content = content.replace('.supabase.co\no', '.supabase.com')
content = content.replace('.supabase.co\r\no', '.supabase.com')

# Показываем что получилось
lines = content.strip().split('\n')
for line in lines:
    print(line)

# Сохраняем исправленный файл
with open('.env.local', 'w', encoding='utf-8') as f:
    f.write(content)

print('\nФайл исправлен!')
