"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen hero-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-8">
          <div className="text-center mb-6">
            <div className="text-5xl mb-2">🔑</div>
            <h1 className="text-2xl font-bold text-white">Восстановление пароля</h1>
            <p className="text-gray-400 text-sm mt-1">
              {sent ? "Письмо отправлено!" : "Введите email для сброса пароля"}
            </p>
          </div>

          {sent ? (
            <div className="text-center space-y-4">
              <div className="text-green-400 text-sm">
                ✅ Мы отправили ссылку для сброса пароля на <strong>{email}</strong>
              </div>
              <p className="text-gray-400 text-xs">Проверьте папку "Спам", если письмо не пришло</p>
              <Link
                href="/login"
                className="block w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Вернуться ко входу
              </Link>
            </div>
          ) : (
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

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Отправить ссылку
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <Link href="/login" className="text-blue-400 hover:text-blue-300 text-sm transition">
              ← Вернуться ко входу
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}