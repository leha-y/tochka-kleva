import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const latinToCyr: Record<string, string> = {
  'a': 'а', 'b': 'б', 'c': 'с', 'd': 'д', 'e': 'е',
  'f': 'ф', 'g': 'г', 'h': 'х', 'i': 'и', 'j': 'й',
  'k': 'к', 'l': 'л', 'm': 'м', 'n': 'н', 'o': 'о',
  'p': 'р', 'q': 'к', 'r': 'г', 's': 'с', 't': 'т',
  'u': 'у', 'v': 'в', 'w': 'ш', 'x': 'х', 'y': 'у',
  'z': 'з',
  'A': 'А', 'B': 'Б', 'C': 'С', 'D': 'Д', 'E': 'Е',
  'F': 'Ф', 'G': 'Г', 'H': 'Х', 'I': 'И', 'J': 'Й',
  'K': 'К', 'L': 'Л', 'M': 'М', 'N': 'Н', 'O': 'О',
  'P': 'Р', 'Q': 'К', 'R': 'Г', 'S': 'С', 'T': 'Т',
  'U': 'У', 'V': 'В', 'W': 'Ш', 'X': 'Х', 'Y': 'У',
  'Z': 'З',
};

function normalize(s: string): string {
  return s
    .normalize("NFC")
    .split("")
    .map(ch => latinToCyr[ch] || ch)
    .join("")
    .toLowerCase()
    .replace(/[^а-яёa-z0-9\s]/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";
  
  if (!query.trim()) {
    return NextResponse.json({ products: [], query: "" });
  }
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  
  const { data, error } = await supabase
    .from("products")
    .select("*");
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  const cleanQuery = normalize(query);
  
  const filtered = (data || []).filter(p => {
    const cleanTitle = normalize(p.title || "");
    const cleanDesc = normalize(p.description || "");
    return cleanTitle.includes(cleanQuery) || cleanDesc.includes(cleanQuery);
  });
  
  return NextResponse.json({ products: filtered, query });
}
