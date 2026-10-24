"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const { signUp } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Пароли не совпадают!");
      return;
    }

    const { data, error } = await signUp(
      formData.email,
      formData.password,
      formData.name,
      formData.city
    );

    if (error) {
      setError(error.message);
    } else {
      alert("Регистрация успешна! Теперь войдите в систему.");
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen hero-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-8">
          <div className="text-center mb-6">
            <div className="text-5xl mb-2">🎣</div>
            <h1 className="text-2xl font-bold text-white">Регистрация</h1>
            <p className="text-gray-400 text-sm mt-1">Создай аккаунт за 30 секунд</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-600/30 border border-red-500/30 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white text-sm font-semibold mb-2">Имя *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Алексей"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition"
                required
              />
            </div>

            <div>
              <label className="block text-white text-sm font-semibold mb-2">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="rybak@mail.ru"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition"
                required
              />
            </div>

            <div>
              <label className="block text-white text-sm font-semibold mb-2">Телефон</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+7 (912) 345-67-89"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition"
              />
            </div>

            <div>
              <label className="block text-white text-sm font-semibold mb-2">Город *</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Киров"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition"
                required
              />
            </div>

            <div>
              <label className="block text-white text-sm font-semibold mb-2">Пароль *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Минимум 6 символов"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition"
                required
                minLength={6}
              />
            </div>

            <div>
              <label className="block text-white text-sm font-semibold mb-2">Повторите пароль *</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition"
                required
              />
            </div>

            <label className="flex items-start gap-2 text-gray-300 text-sm cursor-pointer">
              <input type="checkbox" className="accent-blue-500 mt-1" required />
              <span>Я согласен с <Link href="/rules" className="text-blue-400 hover:text-blue-300">правилами сайта</Link></span>
            </label>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Зарегистрироваться
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            Уже есть аккаунт?{" "}
            <Link href="/login" className="text-blue-400 hover:text-blue-300 font-semibold transition">
              Войти
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