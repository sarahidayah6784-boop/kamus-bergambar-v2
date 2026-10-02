import React from 'react';
import { CikguCeriMascot } from './CikguCeriMascot';
import { AgeGroup, WorldId } from '../types';
import { soundManager } from '../utils/audio';
import { Sparkles, Gamepad2, Compass, Play, BookOpen } from 'lucide-react';

interface LandingHeroProps {
  onStartLearning: (worldId: WorldId) => void;
  onOpenPlayground: () => void;
  onOpenMap: () => void;
  selectedAgeGroup: AgeGroup;
  onChangeAgeGroup: (age: AgeGroup) => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onStartLearning,
  onOpenPlayground,
  onOpenMap,
  selectedAgeGroup,
  onChangeAgeGroup,
}) => {
  const floatingEmojis = ['🍎', '🐱', '🚗', '🌳', '🏠', '⭐', '🚀', '📚', '🎨', '🦁'];

  const worlds = [
    {
      id: 'world-1' as WorldId,
      age: '3-5' as AgeGroup,
      badge: '🐣 UMUR 3–5',
      title: 'DUNIA SI KECIL',
      desc: 'Visual besar, sebut suku kata comel & padan gambar mudah!',
      color: 'from-emerald-400 via-teal-400 to-cyan-500',
      borderColor: 'border-emerald-300',
      bgColor: 'bg-emerald-50',
      icon: '🌱',
    },
    {
      id: 'world-2' as WorldId,
      age: '6-8' as AgeGroup,
      badge: '🧒 UMUR 6–8',
      title: 'DUNIA PENEMU',
      desc: 'Gambar + perkataan + ejaan + maksud ceria & bina ayat!',
      color: 'from-amber-400 via-orange-400 to-rose-400',
      borderColor: 'border-amber-300',
      bgColor: 'bg-amber-50',
      icon: '🌟',
    },
    {
      id: 'world-3' as WorldId,
      age: '9-12' as AgeGroup,
      badge: '🚀 UMUR 9–12',
      title: 'DUNIA BIJAK',
      desc: 'Kosa kata mendalam, sinonim, antonim, kuiz tatabahasa!',
      color: 'from-purple-500 via-indigo-500 to-pink-500',
      borderColor: 'border-purple-300',
      bgColor: 'bg-purple-50',
      icon: '🚀',
    },
  ];

  return (
    <div className="relative overflow-hidden pt-6 pb-12 px-4 sm:px-6">
      {/* Background Soft Glow & Animated Clouds */}
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-60">
        <div className="absolute top-10 left-10 w-72 h-72 bg-amber-300/30 rounded-full blur-3xl" />
        <div className="absolute top-20 right-10 w-80 h-80 bg-rose-300/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Floating Icons strip */}
        <div className="flex justify-center items-center gap-3 sm:gap-6 my-2 text-2xl sm:text-3xl select-none animate-pulse">
          {floatingEmojis.map((emoji, index) => (
            <span
              key={index}
              className="inline-block transform hover:scale-150 transition-transform cursor-pointer duration-300 hover:rotate-12"
              onClick={() => soundManager.playTap()}
            >
              {emoji}
            </span>
          ))}
        </div>

        {/* Main App Title & Tagline */}
        <div className="mt-4 mb-3">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-rose-400 text-white px-4 py-1.5 rounded-full font-black text-xs sm:text-sm shadow-md uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4" />
            <span>Aplikasi Pembelajaran Bahasa Melayu Kanak-Kanak</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-['Fredoka'] text-slate-900 tracking-tight leading-none drop-shadow-sm">
            <span className="bg-gradient-to-r from-amber-500 via-pink-500 to-indigo-600 bg-clip-text text-transparent">
              KAMUS CERIA AI
            </span>
          </h1>

          <p className="mt-3 text-lg sm:text-2xl font-black text-amber-800 font-['Quicksand']">
            “Jom Belajar. Jom Bermain. Jom Jadi Bijak!”
          </p>

          <p className="mt-1 text-sm sm:text-base font-semibold text-slate-600 max-w-2xl mx-auto">
            Terokai 300+ perkataan bergambar, permainan kosa kata interaktif, sebutan audio ceria, dan bimbingan pintar bersama Cikgu Ceri!
          </p>
        </div>

        {/* Mascot Centerpiece */}
        <div className="my-6 flex justify-center items-center">
          <CikguCeriMascot
            size="lg"
            message="Hai! Saya Cikgu Ceri! 🦉 Jom pilih umur kamu untuk mula mengembara!"
          />
        </div>

        {/* Main Call To Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 my-6">
          <button
            onClick={() => {
              soundManager.playCorrect();
              const targetWorld =
                selectedAgeGroup === '3-5'
                  ? 'world-1'
                  : selectedAgeGroup === '6-8'
                  ? 'world-2'
                  : 'world-3';
              onStartLearning(targetWorld);
            }}
            className="flex items-center gap-2.5 bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 text-white text-base sm:text-xl font-black px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer font-['Fredoka']"
          >
            <Play className="w-6 h-6 fill-white" />
            <span>MULA BELAJAR</span>
          </button>

          <button
            onClick={() => {
              soundManager.playTap();
              onOpenPlayground();
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-base sm:text-xl font-black px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer font-['Fredoka']"
          >
            <Gamepad2 className="w-6 h-6" />
            <span>MAIN SEKARANG</span>
          </button>

          <button
            onClick={() => {
              soundManager.playTap();
              onOpenMap();
            }}
            className="flex items-center gap-2 bg-white text-slate-800 border-3 border-amber-300 text-base sm:text-xl font-black px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl shadow-md hover:bg-amber-50 hover:scale-105 active:scale-95 transition-all cursor-pointer font-['Fredoka']"
          >
            <Compass className="w-6 h-6 text-amber-500" />
            <span>PETA KEMBARA</span>
          </button>
        </div>

        {/* Age / 3 Learning Worlds Selector Cards */}
        <div className="mt-10 text-left">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-black font-['Fredoka'] text-slate-800">
              Pilih Dunia Pembelajaran Mengikut Umur Kamu
            </h2>
            <p className="text-sm font-semibold text-slate-600">
              Setiap dunia mempunyai cabaran, gambar, dan aktiviti tersendiri!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {worlds.map((world) => {
              const isSelected = selectedAgeGroup === world.age;
              return (
                <div
                  key={world.id}
                  onClick={() => {
                    soundManager.playTap();
                    onChangeAgeGroup(world.age);
                    onStartLearning(world.id);
                  }}
                  className={`relative rounded-3xl p-6 border-4 transition-all duration-300 cursor-pointer transform hover:-translate-y-2 flex flex-col justify-between ${
                    isSelected
                      ? `${world.borderColor} ${world.bgColor} shadow-2xl ring-4 ring-amber-400 scale-[1.02]`
                      : 'border-slate-200 bg-white hover:border-amber-300 hover:shadow-xl'
                  }`}
                >
                  {/* Top Badge */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-black bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm text-slate-800">
                        {world.badge}
                      </span>
                      <span className="text-3xl">{world.icon}</span>
                    </div>

                    <h3 className="text-2xl font-black text-slate-900 font-['Fredoka'] mb-2">
                      {world.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-slate-600 mb-4">
                      {world.desc}
                    </p>
                  </div>

                  {/* World Action Button */}
                  <button
                    type="button"
                    className={`w-full py-2.5 px-4 rounded-xl font-black text-sm text-white shadow-md bg-gradient-to-r ${world.color} hover:opacity-95 transition-opacity flex items-center justify-center gap-1.5 cursor-pointer`}
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>MASUK DUNIA INI</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
