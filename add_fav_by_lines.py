import os

def add_favorite_button(file_path):
    if not os.path.exists(file_path):
        print(f'File not found: {file_path}')
        return False
    
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    # 1. Находим строку с <Link и key={product.id}
    link_start_idx = None
    link_end_idx = None
    
    for i, line in enumerate(lines):
        if '<Link' in line and i+1 < len(lines) and 'key={product.id}' in lines[i+1]:
            link_start_idx = i
        if link_start_idx is not None and '</Link>' in line and link_end_idx is None:
            link_end_idx = i
            break
    
    if link_start_idx is None or link_end_idx is None:
        print(f'Link not found in: {file_path}')
        return False
    
    # 2. Определяем отступ строки <Link>
    link_indent = len(lines[link_start_idx]) - len(lines[link_start_idx].lstrip())
    inner_indent = link_indent + 2
    
    # 3. Вставляем <div className="relative"> ПЕРЕД <Link>
    div_open = ' ' * link_indent + '<div className="relative">\n'
    # 4. Вставляем <FavoriteButton> после <div>
    fav_btn = ' ' * inner_indent + '<FavoriteButton productId={product.id} />\n'
    # 5. Вставляем </div> ПОСЛЕ </Link>
    div_close = ' ' * link_indent + '</div>\n'
    
    # Вставляем в обратном порядке (чтобы индексы не сдвигались)
    lines.insert(link_end_idx + 1, div_close)
    lines.insert(link_start_idx + 1, fav_btn)
    lines.insert(link_start_idx, div_open)
    
    # 6. Добавляем импорт FavoriteButton если нет
    content = ''.join(lines)
    if 'FavoriteButton' not in content[:500]:
        import_line = 'import FavoriteButton from "@/components/FavoriteButton";\n'
        # Находим последнюю строку с import
        for i in range(len(lines)-1, -1, -1):
            if lines[i].startswith('import '):
                lines.insert(i+1, import_line)
                break
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(lines)
    
    print(f'Fixed: {file_path} (lines {link_start_idx+1}-{link_end_idx+1})')
    return True

files = [
    'src/app/(main)/page.tsx',
    'src/app/(main)/search/page.tsx',
    'src/app/(main)/categories/[slug]/page.tsx'
]

for f in files:
    add_favorite_button(f)

print('Done!')
