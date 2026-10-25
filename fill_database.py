import os
import requests
import json
from dotenv import load_dotenv

# Загружаем переменные окружения
load_dotenv()

SUPABASE_URL = os.getenv('NEXT_PUBLIC_SUPABASE_URL')
SUPABASE_KEY = os.getenv('NEXT_PUBLIC_SUPABASE_ANON_KEY')

headers = {
    'apikey': SUPABASE_KEY,
    'Authorization': f'Bearer {SUPABASE_KEY}',
    'Content-Type': 'application/json'
}

# Реальные пользователи
users = [
    {'name': 'Алексей Рыбаков', 'email': 'alexey@fishing.ru', 'avatar_url': 'https://i.pravatar.cc/150?img=12'},
    {'name': 'Дмитрий Спиннингист', 'email': 'dmitry@fishing.ru', 'avatar_url': 'https://i.pravatar.cc/150?img=33'},
    {'name': 'Сергей Карпятник', 'email': 'sergey@fishing.ru', 'avatar_url': 'https://i.pravatar.cc/150?img=51'},
    {'name': 'Иван Фидерист', 'email': 'ivan@fishing.ru', 'avatar_url': 'https://i.pravatar.cc/150?img=68'},
    {'name': 'Михаил Поплавочник', 'email': 'mikhail@fishing.ru', 'avatar_url': 'https://i.pravatar.cc/150?img=15'},
]

# Реальные товары
products = [
    {'name': 'Спиннинг Major Craft Solpara SPS-702UL', 'category': 'Снасти и оснастка', 'price': 8500, 'description': 'Ультралайтовый спиннинг для микроджига', 'image_url': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500', 'rating': 4.8},
    {'name': 'Катушка Shimano Stradic CI4+ 2500', 'category': 'Снасти и оснастка', 'price': 15900, 'description': 'Лёгкая безынерционная катушка', 'image_url': 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=500', 'rating': 4.9},
    {'name': 'Воблер ZipBaits Rigge 58S', 'category': 'Приманки', 'price': 890, 'description': 'Минноу для голавля и окуня', 'image_url': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500', 'rating': 4.7},
    {'name': 'Воблер Keitech Swing Impact 3.5"', 'category': 'Приманки', 'price': 450, 'description': 'Силиконовый виброхвост', 'image_url': 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=500', 'rating': 4.8},
    {'name': 'Блесна Mepps Aglia Long №3', 'category': 'Приманки', 'price': 320, 'description': 'Классическая вращающаяся блесна', 'image_url': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500', 'rating': 4.6},
    {'name': 'Лодка ПВХ Фрегат М-3', 'category': 'Лодки и моторы', 'price': 45000, 'description': 'Надувная лодка для рыбалки', 'image_url': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500', 'rating': 4.7},
    {'name': 'Мотор Tohatsu 5 л.с.', 'category': 'Лодки и моторы', 'price': 78000, 'description': 'Двухтактный лодочный мотор', 'image_url': 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=500', 'rating': 4.9},
    {'name': 'Костюм рыболовный зимний', 'category': 'Одежда и экипировка', 'price': 12500, 'description': 'Тёплый костюм для зимней рыбалки', 'image_url': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500', 'rating': 4.5},
    {'name': 'Палатка кемпинговая 4-местная', 'category': 'Кемпинг и палатки', 'price': 8900, 'description': 'Палатка для рыбалки с тамбуром', 'image_url': 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=500', 'rating': 4.6},
    {'name': 'Эхолот Deeper Smart Sonar PRO+', 'category': 'Электроника', 'price': 32000, 'description': 'Беспроводной эхолот с GPS', 'image_url': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500', 'rating': 4.8},
    {'name': 'Леска PowerPro 0.12мм 135м', 'category': 'Расходники и прочее', 'price': 890, 'description': 'Плетёный шнур', 'image_url': 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=500', 'rating': 4.7},
    {'name': 'Крючки Owner №12 (50шт)', 'category': 'Расходники и прочее', 'price': 450, 'description': 'Острые крючки для поплавочной ловли', 'image_url': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500', 'rating': 4.9},
]

# Реальные отчёты о рыбалке
reports = [
    {'user_id': 1, 'location': 'р. Вятка, Кировская обл.', 'fish_type': 'Судак', 'weight': 1.8, 'description': 'Поймал на джиг у коряги', 'image_url': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500'},
    {'user_id': 2, 'location': 'оз. Орловское, Московская обл.', 'fish_type': 'Щука', 'weight': 3.2, 'description': 'Взяла на воблер у камыша', 'image_url': 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=500'},
    {'user_id': 3, 'location': 'р. Дон, Воронежская обл.', 'fish_type': 'Карп', 'weight': 5.5, 'description': 'Ночная рыбалка на бойлы', 'image_url': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500'},
    {'user_id': 4, 'location': 'р. Ока, Рязанская обл.', 'fish_type': 'Лещ', 'weight': 2.1, 'description': 'Фидерная ловля на течении', 'image_url': 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=500'},
    {'user_id': 5, 'location': 'оз. Селигер, Тверская обл.', 'fish_type': 'Окунь', 'weight': 0.8, 'description': 'Поплавочная ловля на червя', 'image_url': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500'},
]

print('Начинаем наполнение базы данных...')
print(f'Подключение к: {SUPABASE_URL}')

# Добавляем пользователей
print('\n📝 Добавляем пользователей...')
for user in users:
    response = requests.post(f'{SUPABASE_URL}/rest/v1/users', json=user, headers=headers)
    if response.status_code in [200, 201]:
        print(f'✅ {user["name"]}')
    else:
        print(f'❌ {user["name"]}: {response.text}')

# Добавляем товары
print('\n🎣 Добавляем товары...')
for product in products:
    response = requests.post(f'{SUPABASE_URL}/rest/v1/products', json=product, headers=headers)
    if response.status_code in [200, 201]:
        print(f'✅ {product["name"]}')
    else:
        print(f'❌ {product["name"]}: {response.text}')

# Добавляем отчёты
print('\n📊 Добавляем отчёты...')
for report in reports:
    response = requests.post(f'{SUPABASE_URL}/rest/v1/reports', json=report, headers=headers)
    if response.status_code in [200, 201]:
        print(f'✅ {report["fish_type"]} {report["weight"]}кг')
    else:
        print(f'❌ Отчёт: {response.text}')

print('\n✅ Готово! База данных наполнена.')
