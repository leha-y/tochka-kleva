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
    
    # 2. Находим карточку и добавляем кнопку ПЕРЕД ней (не оборачивая)
    # Ищем: <Link key={product.id}
    old_start = '        <Link\n          key={product.id}'
    new_start = '        <div className="relative">\n          <FavoriteButton productId={product.id} />\n          <Link\n          key={product.id}'
    
    if old_start in content:
        content = content.replace(old_start, new_start)
        
        # 3. Находим конец карточки и добавляем </div>
        old_end = '        </Link>\n      ))}'
        new_end = '        </Link>\n        </div>\n      ))}'
        
        if old_end in content:
            content = content.replace(old_end, new_end)
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Fixed: {file_path}')
    else:
        print(f'Pattern not found in: {file_path}')

print('Done!')
