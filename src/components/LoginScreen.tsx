import { useState } from 'react';
import { BookOpen, LogIn, Calculator, Trophy, Zap } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (name: string) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 rounded-2xl shadow-2xl p-8 border border-white/50 backdrop-blur-sm">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          
          {/* Content */}
          <div className="relative z-10">
            <div className="flex justify-center mb-6">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
                {/* Main icon */}
                <div className="relative w-20 h-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl border-2 border-white/50">
                  {/* Clean Single Icon - Trophy with Math Feel */}
                  <Trophy className="w-10 h-10 text-yellow-300 fill-yellow-300/20" />
                  {/* Small Math Symbol */}
                  <div className="absolute bottom-2 right-2 w-6 h-6 bg-white/90 rounded-md flex items-center justify-center shadow-sm">
                    <span className="text-blue-600 font-bold text-xs">∑</span>
                  </div>
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Mathoria
            </h1>
            <p className="text-center text-gray-600 mb-8 text-sm leading-relaxed">
              Think Fast, Rank Higher
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Nama Siswa
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Masukkan nama Anda"
                    className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 hover:border-gray-300"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-3.5 rounded-xl font-semibold hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
              >
                <LogIn className="w-5 h-5" />
                Masuk ke Mathoria
              </button>
            </form>

            <div className="mt-8 pt-6 border-t-2 border-gray-200/50">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg">✨</span>
                </div>
                <h3 className="font-bold text-gray-900">Fitur Platform</h3>
              </div>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-3 group">
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span className="leading-relaxed">Tes adaptif berbasis Item Response Theory (IRT)</span>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span className="leading-relaxed">Leaderboard kompetitif real-time</span>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span className="leading-relaxed">Sistem gamifikasi dengan badges</span>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span className="leading-relaxed">Tracking progress dan kemampuan</span>
                </li>
              </ul>
            </div>

            {/* Additional Info Badge */}
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200/50">
              <p className="text-xs text-center text-gray-600">
                <span className="font-semibold text-blue-700">💡 Tips:</span> Gunakan nama lengkap untuk pengalaman terbaik
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}