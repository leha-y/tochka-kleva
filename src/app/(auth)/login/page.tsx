"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const { error } = await signIn(email, password);

    if (error) {
      setError("Неверный email или пароль");
    } else {
      router.push("/profile");
    }
  };

  return (
    <div className="min-h-screen hero-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-8">
          <div className="text-center mb-6">
            <div className="text-5xl mb-2">🎣</div>
            <h1 className="text-2xl font-bold text-white">Вход в аккаунт</h1>
            <p className="text-gray-400 text-sm mt-1">С возвращением, рыбак!</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-600/30 border border-red-500/30 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rybak@mail.ru"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition"
                required
              />
            </div>

            <div>
              <label className="block text-white text-sm font-semibold mb-2">Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                <input type="checkbox" className="accent-blue-500" />
                Запомнить меня
              </label>
              <Link href="/forgot-password" className="text-blue-400 hover:text-blue-300 transition">
                Забыли пароль?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Войти
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            Нет аккаунта?{" "}
            <Link href="/register" className="text-blue-400 hover:text-blue-300 font-semibold transition">
              Зарегистрироваться
            </Link>
          </div>

          <div className="mt-4 text-center">
            <Link href="/" className="text-gray-500 hover:text-gray-300 text-xs transition">
              ← Вернуться на главную
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}