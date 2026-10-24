import { Megaphone } from "lucide-react";

export default function AdBlock() {
  return (
    <div className="backdrop-blur-md bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-2 border-dashed border-yellow-500/30 rounded-xl p-4">
      <div className="text-center">
        <Megaphone className="w-10 h-10 text-yellow-400 mx-auto mb-2" />
        <h3 className="text-lg font-bold text-yellow-300 mb-1">Реклама</h3>
        <p className="text-gray-400 text-xs mb-3">
          Здесь может быть ваша реклама
        </p>
        <div className="bg-white/5 border border-white/10 rounded-lg p-3 mb-3">
          <div className="text-white text-xs font-semibold mb-1">
            Ваш бренд
          </div>
          <div className="text-gray-400 text-xs">
            1000+ рыбаков увидят ваш товар
          </div>
        </div>
        <a
          href="/contacts"
          className="block w-full py-2 bg-yellow-600/30 text-yellow-300 rounded-lg hover:bg-yellow-600/50 transition text-xs font-semibold border border-yellow-500/30"
        >
          Разместить рекламу
        </a>
      </div>
    </div>
  );
}
