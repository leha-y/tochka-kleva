content = '''NEXT_PUBLIC_SUPABASE_URL=https://rgnkbjwmsmjvandvtcjr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_Te8oIHDKPh4IMZs9PEqEbQ_WBE9dgA2
'''

with open('.env.local', 'w', encoding='utf-8') as f:
    f.write(content)

print('Готово! Правильный URL: .supabase.co')
