import os

file_path = 'src/app/(main)/page.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Ищем строку с <Link и key={product.id}
link_start = None
link_end = None

for i, line in enumerate(lines):
    if '<Link' in line:
        if i+1 < len(lines) and 'key={product.id}' in lines[i+1]:
            link_start = i
    if link_start is not None and '</Link>' in line:
        link_end = i
        break

if link_start is None or link_end is None:
    print('ERROR: Could not find product card')
    exit()

print(f'Found card at lines {link_start+1}-{link_end+1}')

# Вставляем СНИЗУ ВВЕРХ (чтобы индексы не сдвигались)
link_indent = len(lines[link_start]) - len(lines[link_start].lstrip())
inner_indent = link_indent + 2

# 1. </div> после </Link>
lines.insert(link_end + 1, ' ' * link_indent + '</div>\n')
# 2. <FavoriteButton> после строки с key={product.id}
lines.insert(link_start + 2, ' ' * inner_indent + '<FavoriteButton productId={product.id} />\n')
# 3. <div className="relative"> перед <Link>
lines.insert(link_start, ' ' * link_indent + '<div className="relative">\n')

# 4. Импорт (если ещё нет)
content = ''.join(lines)
if 'FavoriteButton' not in content[:500]:
    import_line = 'import FavoriteButton from "@/components/FavoriteButton";\n'
    for i in range(len(lines)-1, -1, -1):
        if lines[i].startswith('import '):
            lines.insert(i+1, import_line)
            break

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(lines)

print('Done! Button added safely.')
