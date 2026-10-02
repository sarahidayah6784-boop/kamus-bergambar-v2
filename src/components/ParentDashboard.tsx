import React, { useState } from 'react';
import { UserProgress } from '../types';
import { CATEGORIES } from '../data/categories';
import { soundManager } from '../utils/audio';
import {
  Shield,
  Award,
  CheckCircle2,
  Clock,
  Sparkles,
  BarChart3,
  Printer,
  X,
  Lock,
} from 'lucide-react';

interface ParentDashboardProps {
  progress: UserProgress;
  onUpdateProgress: (p: UserProgress) => void;
  onClose: () => void;
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({
  progress,
  onUpdateProgress,
  onClose,
}) => {
  const [pinEntered, setPinEntered] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [childNameInput, setChildNameInput] = useState(progress.childName);
  const [showCertificate, setShowCertificate] = useState(false);

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinEntered === progress.parentPin || pinEntered === '1234') {
      setIsUnlocked(true);
      setPinError(false);
      soundManager.playCorrect();
    } else {
      setPinError(true);
      soundManager.playGentleWrong();
    }
  };

  const handleSaveSettings = () => {
    soundManager.playTap();
    const updated = {
      ...progress,
      childName: childNameInput.trim() || 'Adik Bijak',
    };
    onUpdateProgress(updated);
  };

  const quizAccuracy =
    progress.quizStats.totalAnswered > 0
      ? Math.round(
          (progress.quizStats.totalCorrect / progress.quizStats.totalAnswered) * 100
        )
      : 85;

  const estimatedMinutes = Math.round(
    progress.learnedWordIds.length * 2.5 + progress.quizStats.totalAnswered * 1.5
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl border-4 border-slate-700 shadow-2xl max-w-4xl w-full p-6 sm:p-8 relative my-auto">
        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playTap();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* If PIN not unlocked yet */}
        {!isUnlocked ? (
          <div className="max-w-md mx-auto text-center py-8">
            <div className="w-16 h-16 rounded-full bg-slate-100 border-2 border-slate-300 flex items-center justify-center mx-auto mb-4 text-slate-800">
              <Lock className="w-8 h-8 text-slate-700" />
            </div>

            <h3 className="text-2xl font-black font-['Fredoka'] text-slate-900 mb-1">
              Pintu Masuk Ibu Bapa
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-slate-600 mb-6">
              Sila masukkan PIN keselamatan untuk melihat laporan kemajuan anak anda. (PIN Lalai: <span className="font-bold text-indigo-600">1234</span>)
            </p>

            <form onSubmit={handleVerifyPin} className="space-y-4">
              <input
                type="password"
                maxLength={4}
                placeholder="••••"
                value={pinEntered}
                onChange={(e) => setPinEntered(e.target.value)}
                className="text-center text-3xl tracking-widest font-black py-3 px-4 w-40 mx-auto block bg-slate-50 border-3 border-slate-300 rounded-2xl focus:outline-none focus:border-indigo-600"
              />

              {pinError && (
                <p className="text-xs font-bold text-rose-600">
                  PIN salah. Sila cuba lagi atau gunakan PIN lalai 1234.
                </p>
              )}

              <button
                type="submit"
                className="py-3 px-8 rounded-2xl bg-slate-900 text-white font-black text-sm shadow-md hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Buka Dashboard
              </button>
            </form>
          </div>
        ) : (
          /* Dashboard Content */
          <div className="space-y-6">
            {/* Header banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-2xl shadow-md">
                  👨‍👩‍👧
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black font-['Fredoka'] text-slate-900">
                    Dashboard Ibu Bapa & Kemajuan
                  </h2>
                  <p className="text-xs sm:text-sm font-semibold text-slate-600">
                    Pantau pembelajaran Bahasa Melayu anak anda secara terperinci.
                  </p>
                </div>
              </div>

              {/* Certificate Button */}
              <button
                onClick={() => {
                  soundManager.playCorrect();
                  setShowCertificate(true);
                }}
                className="flex items-center gap-2 py-2.5 px-4 bg-gradient-to-r from-amber-400 to-orange-500 text-amber-950 font-black text-xs sm:text-sm rounded-xl shadow-md hover:scale-105 transition-all cursor-pointer"
              >
                <Award className="w-4 h-4" />
                <span>Jana Sijil Penghargaan 📜</span>
              </button>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-amber-50 p-4 rounded-2xl border-2 border-amber-200 text-center">
                <span className="text-2xl">📚</span>
                <div className="text-2xl sm:text-3xl font-black text-amber-950 mt-1">
                  {progress.learnedWordIds.length}
                </div>
                <div className="text-xs font-bold text-amber-800">Perkataan Dipelajari</div>
              </div>

              <div className="bg-emerald-50 p-4 rounded-2xl border-2 border-emerald-200 text-center">
                <span className="text-2xl">🎯</span>
                <div className="text-2xl sm:text-3xl font-black text-emerald-950 mt-1">
                  {quizAccuracy}%
                </div>
                <div className="text-xs font-bold text-emerald-800">Ketepatan Kuiz</div>
              </div>

              <div className="bg-rose-50 p-4 rounded-2xl border-2 border-rose-200 text-center">
                <span className="text-2xl">🔥</span>
                <div className="text-2xl sm:text-3xl font-black text-rose-950 mt-1">
                  {progress.streak} Hari
                </div>
                <div className="text-xs font-bold text-rose-800">Rentak Belajar</div>
              </div>

              <div className="bg-sky-50 p-4 rounded-2xl border-2 border-sky-200 text-center">
                <span className="text-2xl">⏱️</span>
                <div className="text-2xl sm:text-3xl font-black text-sky-950 mt-1">
                  {estimatedMinutes} min
                </div>
                <div className="text-xs font-bold text-sky-800">Masa Belajar Aktif</div>
              </div>
            </div>

            {/* Child Profile Settings */}
            <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex-1 w-full">
                <label className="text-xs font-black text-slate-700 block mb-1">
                  Nama Anak:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={childNameInput}
                    onChange={(e) => setChildNameInput(e.target.value)}
                    className="flex-1 bg-white border-2 border-slate-300 rounded-xl px-3 py-2 text-sm font-bold text-slate-900 focus:outline-none focus:border-slate-800"
                  />
                  <button
                    onClick={handleSaveSettings}
                    className="py-2 px-4 bg-slate-900 text-white rounded-xl text-xs font-black hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Simpan Nama
                  </button>
                </div>
              </div>

              <div className="text-xs font-bold text-slate-600 bg-white p-3 rounded-2xl border border-slate-200 shrink-0">
                <span>Tahap Semasa: </span>
                <span className="font-black text-indigo-700">Level {progress.level} ({progress.xp} XP)</span>
              </div>
            </div>

            {/* Category Mastery Progress Bars */}
            <div>
              <h3 className="text-lg font-black font-['Fredoka'] text-slate-900 mb-3 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-indigo-600" />
                <span>Penguasaan Mengikut Kategori Kosa Kata</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-56 overflow-y-auto pr-1">
                {CATEGORIES.map((cat) => {
                  const count = progress.categoryMastery[cat.id] || 0;
                  const percent = Math.min(100, Math.round((count / 15) * 100));

                  return (
                    <div
                      key={cat.id}
                      className="p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2.5 min-w-[120px]">
                        <span className="text-xl">{cat.icon}</span>
                        <span className="text-xs font-bold text-slate-800">{cat.name}</span>
                      </div>

                      <div className="flex-1">
                        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${cat.color}`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>

                      <span className="text-[11px] font-black text-slate-600 min-w-[36px] text-right">
                        {percent}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Certificate Modal View */}
        {showCertificate && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-3xl border-8 border-amber-400 p-8 max-w-xl w-full text-center shadow-2xl relative">
              <button
                onClick={() => setShowCertificate(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-6xl mb-2">🏆</div>
              <h3 className="text-xs font-black tracking-widest uppercase text-amber-700">
                SIJIL PENGHARGAAN PEMBELAJARAN
              </h3>
              <h2 className="text-2xl sm:text-3xl font-black font-['Fredoka'] text-slate-900 mt-1 mb-2">
                KAMUS CERIA AI
              </h2>

              <p className="text-xs text-slate-500 mb-4">
                Dengan bangganya menganugerahkan sijil kecemerlangan ini kepada:
              </p>

              <div className="text-3xl font-black font-['Fredoka'] text-amber-600 py-3 border-b-2 border-dashed border-amber-300 mb-4">
                {progress.childName}
              </div>

              <p className="text-xs font-semibold text-slate-600 leading-relaxed mb-6">
                Kerana telah berjaya mempelajari {progress.learnedWordIds.length} perkataan Bahasa Melayu,
                mencapai ketepatan kuiz {quizAccuracy}%, dan menunjukkan semangat rajin menuntut ilmu
                bersama Cikgu Ceri!
              </p>

              <div className="flex justify-between items-center text-xs font-bold text-slate-600 pt-4 border-t border-slate-200">
                <div>
                  <div className="font-['Fredoka'] font-black text-slate-800">Cikgu Ceri 🦉</div>
                  <div className="text-[10px] text-slate-400">Maskot Utama</div>
                </div>

                <div className="text-right">
                  <div className="font-['Fredoka'] font-black text-slate-800">
                    {new Date().toLocaleDateString('ms-MY', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  <div className="text-[10px] text-slate-400">Tarikh Anugerah</div>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Printer className="w-4 h-4" />
                  <span>Cetak Sijil</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
