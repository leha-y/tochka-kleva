import os

content = '''"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";

export default function FavoriteButton({ productId }: { productId: string }) {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user || !productId) return;
    supabase
      .from("favorites")
      .select("id")
      .eq("user_id", user.id)
      .eq("product_id", productId)
      .then(({ data }) => {
        setIsFavorite(Array.isArray(data) && data.length > 0);
      });
  }, [user, productId]);

  const toggleFavorite = async () => {
    if (!user) {
      alert("Войдите в аккаунт");
      return;
    }
    setLoading(true);
    try {
      if (isFavorite) {
        await supabase
          .from("favorites")
          .delete()
          .eq("user_id", user.id)
          .eq("product_id", productId);
        setIsFavorite(false);
      } else {
        await supabase
          .from("favorites")
          .insert({ user_id: user.id, product_id: productId });
        setIsFavorite(true);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <button
      onClick={toggleFavorite}
      disabled={loading}
      className={"absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition disabled:opacity-50 " + (isFavorite ? "bg-red-500/30 text-red-400 hover:bg-red-500/50" : "bg-black/30 text-gray-300 hover:bg-black/50 hover:text-white")}
      title={isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
    >
      {isFavorite ? "\\u2764\\ufe0f" : "\\u{1F90D}"}
    </button>
  );
}
'''

with open('src/components/FavoriteButton.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('FavoriteButton.tsx created successfully!')