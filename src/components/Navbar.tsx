import React from 'react';
import { UserProgress } from '../types';
import { soundManager } from '../utils/audio';
import {
  Volume2,
  VolumeX,
  Search,
  Sparkles,
  Camera,
  Heart,
  Shield,
  Award,
} from 'lucide-react';

interface NavbarProps {
  progress: UserProgress;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSearch: () => void;
  onOpenAITutor: () => void;
  onOpenImageToWord: () => void;
  onOpenAchievements: () => void;
  onOpenParentDashboard: () => void;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  progress,
  activeTab,
  setActiveTab,
  onOpenSearch,
  onOpenAITutor,
  onOpenImageToWord,
  onOpenAchievements,
  onOpenParentDashboard,
  onToggleSound,
}) => {
  const navItems = [
    { id: 'utama', label: 'Utama', icon: '🏠' },
    { id: 'dunia', label: '3 Dunia', icon: '🌍' },
    { id: 'kategori', label: 'Kategori', icon: '📚' },
    { id: 'playground', label: 'Playground', icon: '🎮' },
    { id: 'peta', label: 'Peta Kembara', icon: '🗺️' },
    { id: 'daily', label: 'Hari Ini', icon: '🌟' },
    { id: 'kegemaran', label: 'Kegemaran', icon: '❤️' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b-4 border-amber-200 shadow-sm transition-all">
      {/* Top Banner with Stats & Controls */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2">
        {/* Brand */}
        <button
          onClick={() => {
            soundManager.playTap();
            setActiveTab('utama');
          }}
          className="flex items-center gap-2 group cursor-pointer text-left"
        >
          <span className="text-3xl sm:text-4xl animate-bounce">🌈</span>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-amber-500 via-pink-500 to-indigo-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform font-['Fredoka']">
              KAMUS CERIA AI
            </h1>
            <p className="text-[11px] font-bold text-amber-700 hidden sm:block">
              Jom Belajar. Jom Bermain. Jom Jadi Bijak!
            </p>
          </div>
        </button>

        {/* Stats Pill Badges */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Level */}
          <div className="flex items-center gap-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-2.5 py-1 rounded-full text-xs sm:text-sm font-black shadow-sm">
            <span>🏆</span>
            <span>Lvl {progress.level}</span>
          </div>

          {/* Stars */}
          <div className="flex items-center gap-1 bg-amber-400 text-amber-950 px-2.5 py-1 rounded-full text-xs sm:text-sm font-black shadow-sm">
            <span>⭐</span>
            <span>{progress.stars}</span>
          </div>

          {/* XP */}
          <div className="hidden md:flex items-center gap-1 bg-sky-100 text-sky-800 border border-sky-300 px-2.5 py-1 rounded-full text-xs sm:text-sm font-extrabold">
            <span>⚡</span>
            <span>{progress.xp} XP</span>
          </div>

          {/* Streak */}
          <div className="hidden sm:flex items-center gap-1 bg-rose-100 text-rose-700 border border-rose-300 px-2.5 py-1 rounded-full text-xs sm:text-sm font-extrabold">
            <span>🔥</span>
            <span>{progress.streak} Hari</span>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-1 border-l-2 border-amber-200 pl-2 ml-1">
            {/* Search */}
            <button
              onClick={() => {
                soundManager.playTap();
                onOpenSearch();
              }}
              title="Cari Perkataan"
              className="p-2 rounded-xl bg-amber-100 text-amber-800 hover:bg-amber-200 transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* AI Tutor */}
            <button
              onClick={() => {
                soundManager.playTap();
                onOpenAITutor();
              }}
              title="Tanya Cikgu Ceri AI"
              className="p-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:scale-105 transition-transform shadow-md cursor-pointer flex items-center gap-1 text-xs font-black"
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden lg:inline">Tanya AI</span>
            </button>

            {/* Apa Benda Ini Camera */}
            <button
              onClick={() => {
                soundManager.playTap();
                onOpenImageToWord();
              }}
              title="Apa Benda Ini? (AI Vision)"
              className="p-2 rounded-xl bg-emerald-500 text-white hover:scale-105 transition-transform shadow-md cursor-pointer flex items-center gap-1 text-xs font-black"
            >
              <Camera className="w-4 h-4" />
              <span className="hidden lg:inline">Kamera AI</span>
            </button>

            {/* Achievements */}
            <button
              onClick={() => {
                soundManager.playTap();
                onOpenAchievements();
              }}
              title="Lencana Kejayaan"
              className="p-2 rounded-xl bg-yellow-100 text-yellow-800 hover:bg-yellow-200 transition-colors cursor-pointer"
            >
              <Award className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Sound Mute */}
            <button
              onClick={onToggleSound}
              title={progress.soundEnabled ? 'Bunyi Aktif' : 'Bunyi Dimatikan'}
              className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              {progress.soundEnabled ? (
                <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
              ) : (
                <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />
              )}
            </button>

            {/* Parent Dashboard */}
            <button
              onClick={() => {
                soundManager.playTap();
                onOpenParentDashboard();
              }}
              title="Dashboard Ibu Bapa"
              className="p-2 rounded-xl bg-slate-800 text-white hover:bg-slate-900 transition-colors cursor-pointer ml-0.5"
            >
              <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <nav className="max-w-7xl mx-auto px-2 sm:px-6 overflow-x-auto no-scrollbar flex items-center gap-1.5 py-1.5 border-t border-amber-100">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                soundManager.playTap();
                setActiveTab(item.id);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-amber-400 text-amber-950 shadow-md scale-105 border border-amber-300'
                  : 'bg-white/60 text-slate-600 hover:bg-amber-50 hover:text-amber-900'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
              {item.id === 'kegemaran' && progress.favoriteWordIds.length > 0 && (
                <span className="ml-1 px-1.5 py-0.2 bg-rose-500 text-white rounded-full text-[10px] font-bold">
                  {progress.favoriteWordIds.length}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </header>
  );
};
