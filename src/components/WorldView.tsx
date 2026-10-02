import React, { useState } from 'react';
import { WorldId, WordItem, UserProgress } from '../types';
import { ALL_WORDS } from '../data/allWords';
import { WordCard } from './WordCard';
import { soundManager } from '../utils/audio';
import { Volume2, Sparkles, BookOpen, Brain, Zap } from 'lucide-react';

interface WorldViewProps {
  currentWorld: WorldId;
  onChangeWorld: (worldId: WorldId) => void;
  progress: UserProgress;
  onToggleFavorite: (id: string) => void;
  onMarkLearned: (id: string, category: string) => void;
  onOpenSpeakingMode: (word: WordItem) => void;
  onStartQuiz: (level: 1 | 2 | 3) => void;
}

export const WorldView: React.FC<WorldViewProps> = ({
  currentWorld,
  onChangeWorld,
  progress,
  onToggleFavorite,
  onMarkLearned,
  onOpenSpeakingMode,
  onStartQuiz,
}) => {
  const [worldIndex, setWorldIndex] = useState<WorldId>(currentWorld);

  const worldDetails = {
    'world-1': {
      title: '🌱 DUNIA SI KECIL',
      age: 'Umur 3–5 Tahun',
      badge: 'Tahap 1 • Visual & Audio Ceria',
      themeColor: 'from-emerald-400 to-teal-500',
      bgColor: 'bg-emerald-50/60',
      borderColor: 'border-emerald-300',
      textColor: 'text-emerald-900',
      description: 'Fokus kepada gambar besar, audio sebutan suku kata ceria, dan aktiviti interaktif!',
      level: 1 as const,
      features: ['👀 Gambar Besar Ceria', '👂 Dengar Sebutan Jelas', '🗣️ Latihan Cuba Sebut', '🧩 Padanan Mudah'],
    },
    'world-2': {
      title: '🌟 DUNIA PENEMU',
      age: 'Umur 6–8 Tahun',
      badge: 'Tahap 2 • Kosa Kata & Ejaan Cergas',
      themeColor: 'from-amber-400 to-orange-500',
      bgColor: 'bg-amber-50/60',
      borderColor: 'border-amber-300',
      textColor: 'text-amber-900',
      description: 'Kombinasi gambar, perkataan, maksud mudah, susun ejaan huruf, dan binaan ayat ceria!',
      level: 2 as const,
      features: ['🔤 Susun Huruf & Ejaan', '📖 Maksud & Contoh Ayat', '🎯 Kuiz Padanan Pantas', '✨ Bina Ayat Sendiri'],
    },
    'world-3': {
      title: '🚀 DUNIA BIJAK',
      age: 'Umur 9–12 Tahun',
      badge: 'Tahap 3 • Tatabahasa & Kosa Kata Tinggi',
      themeColor: 'from-purple-500 to-indigo-600',
      bgColor: 'bg-purple-50/60',
      borderColor: 'border-purple-300',
      textColor: 'text-purple-900',
      description: 'Kosa kata mendalam, sinonim, antonim, jenis kata tatabahasa, dan cabaran masa!',
      level: 3 as const,
      features: ['🧠 Sinonim & Antonim', '📝 Golongan Kata (Adjektif/Kerja)', '⚡ Cabaran Masa 60s', '🏆 Kuiz Tatabahasa Lengkap'],
    },
  };

  const active = worldDetails[worldIndex];
  const wordsForWorld = ALL_WORDS.filter((w) => w.level === active.level);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* 3 Worlds Selector Tabs Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
        {(Object.keys(worldDetails) as WorldId[]).map((wId) => {
          const w = worldDetails[wId];
          const isSelected = worldIndex === wId;
          return (
            <button
              key={wId}
              onClick={() => {
                soundManager.playTap();
                setWorldIndex(wId);
                onChangeWorld(wId);
              }}
              className={`p-4 rounded-3xl border-3 text-left transition-all cursor-pointer transform hover:-translate-y-1 ${
                isSelected
                  ? `${w.borderColor} ${w.bgColor} shadow-xl scale-[1.02] ring-3 ring-amber-400`
                  : 'bg-white border-slate-200 hover:border-amber-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-black uppercase text-slate-500">{w.age}</span>
                <span className="text-2xl">{wId === 'world-1' ? '🌱' : wId === 'world-2' ? '🌟' : '🚀'}</span>
              </div>
              <h3 className="text-xl font-black font-['Fredoka'] text-slate-900">{w.title}</h3>
              <p className="text-xs font-semibold text-slate-600 mt-1 line-clamp-1">{w.description}</p>
            </button>
          );
        })}
      </div>

      {/* World Hero Banner */}
      <div
        className={`rounded-3xl p-6 sm:p-8 border-4 ${active.borderColor} ${active.bgColor} mb-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6`}
      >
        <div className="max-w-2xl text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-slate-200 text-xs font-black shadow-sm mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{active.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black font-['Fredoka'] text-slate-900">
            {active.title}
          </h2>
          <p className="text-sm sm:text-base font-semibold text-slate-700 mt-2">
            {active.description}
          </p>

          {/* Feature Badges */}
          <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
            {active.features.map((feat, idx) => (
              <span
                key={idx}
                className="bg-white/80 backdrop-blur-sm border border-slate-200 px-3 py-1 rounded-xl text-xs font-bold text-slate-800 shadow-xs"
              >
                {feat}
              </span>
            ))}
          </div>
        </div>

        {/* Quick Quiz action for this world */}
        <div className="bg-white p-5 rounded-3xl border-3 border-amber-200 shadow-md text-center shrink-0 w-full md:w-64">
          <span className="text-4xl">🎯</span>
          <h4 className="text-lg font-black font-['Fredoka'] text-slate-900 mt-1">
            Ujian Dunia Ini
          </h4>
          <p className="text-xs font-semibold text-slate-600 mb-3">
            Kumpul bintang & XP tambahan!
          </p>
          <button
            onClick={() => {
              soundManager.playCorrect();
              onStartQuiz(active.level);
            }}
            className="w-full py-2.5 px-4 rounded-xl font-black text-sm text-white shadow-md bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Zap className="w-4 h-4 fill-white" />
            <span>MULA KUIZ DUNIA</span>
          </button>
        </div>
      </div>

      {/* Words Grid for active world */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-black font-['Fredoka'] text-slate-900">
            Kosa Kata Pilihan ({wordsForWorld.length} Perkataan)
          </h3>
          <p className="text-xs sm:text-sm font-semibold text-slate-600">
            Disesuaikan khas mengikut tahap perkembangan umur anda.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {wordsForWorld.map((word) => (
          <WordCard
            key={word.id}
            word={word}
            isFavorite={progress.favoriteWordIds.includes(word.id)}
            isLearned={progress.learnedWordIds.includes(word.id)}
            onToggleFavorite={onToggleFavorite}
            onMarkLearned={onMarkLearned}
            onOpenSpeakingMode={onOpenSpeakingMode}
          />
        ))}
      </div>
    </div>
  );
};
