content = '''NEXT_PUBLIC_SUPABASE_URL=https://rgnkbjwmsmjvandvtcjr.supabase.com
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_Te8oIHDKPh4IMZs9PEqEbQ_WBE9dgA2
'''

with open('.env.local', 'w', encoding='utf-8') as f:
    f.write(content)

print('Файл перезаписан!')
print()
with open('.env.local', 'r', encoding='utf-8') as f:
    print(f.read())
