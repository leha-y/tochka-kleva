import os

files = [
    'src/app/(main)/page.tsx',
    'src/app/(main)/search/page.tsx',
    'src/app/(main)/categories/[slug]/page.tsx'
]

import_line = 'import FavoriteButton from "@/components/FavoriteButton";'

for file_path in files:
    if not os.path.exists(file_path):
        print(f'File not found: {file_path}')
        continue
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Добавляем импорт если нет
    if 'FavoriteButton' not in content:
        lines = content.split('\n')
        for i in range(len(lines)-1, -1, -1):
            if lines[i].startswith('import '):
                lines.insert(i+1, import_line)
                break
        content = '\n'.join(lines)
    
    # 2. Заменяем <Link key={product.id} на <div key={product.id} className="relative"> + FavoriteButton + <Link
    old_pattern = '<Link\n          key={product.id}\n          href={"/product/" + product.id}'
    new_pattern = '''<div key={product.id} className="relative">
          <FavoriteButton productId={product.id} />
          <Link
          href={"/product/" + product.id}'''
    
    if old_pattern in content:
        content = content.replace(old_pattern, new_pattern)
        
        # 3. Находим закрывающий </Link> карточки и добавляем </div>
        # Ищем паттерн: </Link> перед ))} или })}
        old_end = '        </Link>\n      ))}'
        new_end = '        </Link>\n      </div>\n    ))}'
        
        if old_end in content:
            content = content.replace(old_end, new_end)
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Fixed: {file_path}')
    else:
        print(f'Pattern not found in: {file_path}')

print('Done!')
