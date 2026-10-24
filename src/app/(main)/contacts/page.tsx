"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Mail, MessageSquare, Phone, MapPin, Send, CheckCircle } from "lucide-react";

export default function ContactsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "bug",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const { error } = await supabase.from("feedback").insert({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });

      if (error) throw error;

      setSuccess(true);
      setFormData({ name: "", email: "", subject: "bug", message: "" });
    } catch (err: any) {
      setError(err.message || "Ошибка отправки. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen hero-background">
      <div className="relative z-10 max-w-4xl mx-auto px-4 pt-24 pb-12">
        {/* Хлебные крошки */}
        <div className="flex items-center gap-2 text-gray-400 text-sm mb-6">
          <a href="/" className="hover:text-white transition">Главная</a>
          <span>→</span>
          <span className="text-white">Контакты</span>
        </div>

        {/* Заголовок */}
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 mb-6">
          <h1 className="text-4xl font-bold text-white flex items-center gap-3">
            <span className="text-5xl"></span> Контакты
          </h1>
        </div>

        {/* Контактная информация */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6">
            <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-400" /> Email
            </h3>
            <a href="mailto:leha.rusinov.87@bk.ru" className="text-blue-400 hover:text-blue-300 transition">
              leha.rusinov.87@bk.ru
            </a>
            <p className="text-gray-500 text-sm mt-1">Отвечаем в течение 24 часов</p>
          </div>

          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6">
            <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-400" /> Telegram
            </h3>
            <p className="text-gray-300">Скоро будет</p>
            <p className="text-gray-500 text-sm mt-1">Быстрая связь с поддержкой</p>
          </div>

          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6">
            <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
              <Phone className="w-5 h-5 text-blue-400" /> Телефон
            </h3>
            <a href="tel:+79536786301" className="text-blue-400 hover:text-blue-300 transition">
              +7 (953) 678-63-01
            </a>
            <p className="text-gray-500 text-sm mt-1">Пн-Пт с 9:00 до 18:00</p>
          </div>

          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6">
            <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-400" /> Адрес
            </h3>
            <p className="text-gray-300">Скоро будет</p>
            <p className="text-gray-500 text-sm mt-1">Офис (по предварительной записи)</p>
          </div>
        </div>

        {/* Форма обратной связи */}
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Send className="w-6 h-6 text-blue-400" /> Напишите нам
          </h2>

          {success && (
            <div className="mb-4 p-4 bg-green-500/20 border border-green-500/50 rounded-lg flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-green-300">Сообщение отправлено! Мы ответим в течение 24 часов.</span>
            </div>
          )}

          {error && (
            <div className="mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
              <span className="text-red-300">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white text-sm mb-2">Ваше имя</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition"
                  placeholder="Иван"
                />
              </div>
              <div>
                <label className="block text-white text-sm mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition"
                  placeholder="ivan@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-white text-sm mb-2">Тема</label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500 transition"
              >
                <option value="bug" className="bg-gray-800"> Ошибка на сайте</option>
                <option value="feature" className="bg-gray-800">💡 Предложение</option>
                <option value="complaint" className="bg-gray-800">️ Жалоба</option>
                <option value="question" className="bg-gray-800"> Вопрос</option>
                <option value="other" className="bg-gray-800"> Другое</option>
              </select>
            </div>

            <div>
              <label className="block text-white text-sm mb-2">Сообщение</label>
              <textarea
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition resize-none"
                placeholder="Опишите вашу проблему или предложение..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading || !formData.message}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Отправка...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Отправить сообщение
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}