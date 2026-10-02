import React, { useState, useEffect } from 'react';
import { UserProgress, AgeGroup, WorldId, WordItem } from './types';
import { loadProgress, saveProgress, toggleFavoriteWord, markWordLearned } from './utils/storage';
import { soundManager } from './utils/audio';
import { Navbar } from './components/Navbar';
import { LandingHero } from './components/LandingHero';
import { WorldView } from './components/WorldView';
import { CategoryBrowser } from './components/CategoryBrowser';
import { Playground } from './components/Playground';
import { AdventureMap } from './components/AdventureMap';
import { DailyWordCard } from './components/DailyWordCard';
import { FavoritesView } from './components/FavoritesView';
import { AITutorModal } from './components/AITutorModal';
import { ImageToWordModal } from './components/ImageToWordModal';
import { SpeakingModeModal } from './components/SpeakingModeModal';
import { AchievementsModal } from './components/AchievementsModal';
import { ParentDashboard } from './components/ParentDashboard';
import { SearchModal } from './components/SearchModal';
import { Sparkles, MessageCircleQuestion } from 'lucide-react';

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(loadProgress);
  const [activeTab, setActiveTab] = useState<string>('utama');

  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAITutorOpen, setIsAITutorOpen] = useState(false);
  const [isImageToWordOpen, setIsImageToWordOpen] = useState(false);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
  const [isParentDashboardOpen, setIsParentDashboardOpen] = useState(false);
  const [speakingWord, setSpeakingWord] = useState<WordItem | null>(null);

  // Category browser target
  const [browseCategory, setBrowseCategory] = useState<string | null>(null);

  useEffect(() => {
    soundManager.setSoundEnabled(progress.soundEnabled);
  }, [progress.soundEnabled]);

  const handleToggleSound = () => {
    const updated = { ...progress, soundEnabled: !progress.soundEnabled };
    setProgress(updated);
    saveProgress(updated);
    soundManager.setSoundEnabled(updated.soundEnabled);
    if (updated.soundEnabled) {
      soundManager.playCorrect();
    }
  };

  const handleToggleFavorite = (wordId: string) => {
    const updated = toggleFavoriteWord(progress, wordId);
    setProgress(updated);
  };

  const handleMarkLearned = (wordId: string, category: string) => {
    const updated = markWordLearned(progress, wordId, category);
    setProgress(updated);
  };

  const handleStartLearning = (worldId: WorldId) => {
    const updated = { ...progress, currentWorld: worldId };
    setProgress(updated);
    saveProgress(updated);
    setActiveTab('dunia');
  };

  const handleChangeAgeGroup = (age: AgeGroup) => {
    const updated = { ...progress, ageGroup: age };
    setProgress(updated);
    saveProgress(updated);
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/40 text-slate-800 selection:bg-pink-300 selection:text-pink-900 font-['Quicksand']">
      {/* Top Navbar */}
      <Navbar
        progress={progress}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAITutor={() => setIsAITutorOpen(true)}
        onOpenImageToWord={() => setIsImageToWordOpen(true)}
        onOpenAchievements={() => setIsAchievementsOpen(true)}
        onOpenParentDashboard={() => setIsParentDashboardOpen(true)}
        onToggleSound={handleToggleSound}
      />

      {/* Main Content Sections */}
      <main className="flex-1 pb-16">
        {activeTab === 'utama' && (
          <LandingHero
            onStartLearning={handleStartLearning}
            onOpenPlayground={() => setActiveTab('playground')}
            onOpenMap={() => setActiveTab('peta')}
            selectedAgeGroup={progress.ageGroup}
            onChangeAgeGroup={handleChangeAgeGroup}
          />
        )}

        {activeTab === 'dunia' && (
          <WorldView
            currentWorld={progress.currentWorld}
            onChangeWorld={(wId) => {
              const updated = { ...progress, currentWorld: wId };
              setProgress(updated);
              saveProgress(updated);
            }}
            progress={progress}
            onToggleFavorite={handleToggleFavorite}
            onMarkLearned={handleMarkLearned}
            onOpenSpeakingMode={(w) => setSpeakingWord(w)}
            onStartQuiz={() => setActiveTab('playground')}
          />
        )}

        {activeTab === 'kategori' && (
          <CategoryBrowser
            progress={progress}
            onToggleFavorite={handleToggleFavorite}
            onMarkLearned={handleMarkLearned}
            onOpenSpeakingMode={(w) => setSpeakingWord(w)}
            initialCategory={browseCategory}
          />
        )}

        {activeTab === 'playground' && (
          <Playground progress={progress} onUpdateProgress={setProgress} />
        )}

        {activeTab === 'peta' && (
          <AdventureMap
            progress={progress}
            onUpdateProgress={setProgress}
            onSelectCategory={(cat) => {
              setBrowseCategory(cat);
              setActiveTab('kategori');
            }}
          />
        )}

        {activeTab === 'daily' && (
          <DailyWordCard progress={progress} onUpdateProgress={setProgress} />
        )}

        {activeTab === 'kegemaran' && (
          <FavoritesView
            progress={progress}
            onToggleFavorite={handleToggleFavorite}
            onMarkLearned={handleMarkLearned}
            onOpenSpeakingMode={(w) => setSpeakingWord(w)}
            onExploreWords={() => setActiveTab('kategori')}
          />
        )}
      </main>

      {/* Floating Cikgu Ceri AI Helper Trigger */}
      <div className="fixed bottom-5 right-5 z-30">
        <button
          onClick={() => {
            soundManager.playTap();
            setIsAITutorOpen(true);
          }}
          className="group relative flex items-center gap-2 bg-gradient-to-r from-amber-400 via-pink-500 to-rose-500 text-white font-black text-sm p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer border-3 border-white animate-bounce"
          title="Tanya Cikgu Ceri AI"
        >
          <span className="text-2xl">🦉</span>
          <span className="hidden sm:inline font-['Fredoka']">Tanya Cikgu Ceri AI!</span>
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500" />
          </span>
        </button>
      </div>

      {/* Modals */}
      <AITutorModal
        isOpen={isAITutorOpen}
        onClose={() => setIsAITutorOpen(false)}
        ageGroup={progress.ageGroup}
      />

      <ImageToWordModal
        isOpen={isImageToWordOpen}
        onClose={() => setIsImageToWordOpen(false)}
        ageGroup={progress.ageGroup}
      />

      {speakingWord && (
        <SpeakingModeModal
          isOpen={!!speakingWord}
          onClose={() => setSpeakingWord(null)}
          word={speakingWord}
          progress={progress}
          onUpdateProgress={setProgress}
        />
      )}

      <AchievementsModal
        isOpen={isAchievementsOpen}
        onClose={() => setIsAchievementsOpen(false)}
        progress={progress}
      />

      {isParentDashboardOpen && (
        <ParentDashboard
          progress={progress}
          onUpdateProgress={setProgress}
          onClose={() => setIsParentDashboardOpen(false)}
        />
      )}

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        progress={progress}
        onToggleFavorite={handleToggleFavorite}
        onMarkLearned={handleMarkLearned}
      />

      {/* Footer */}
      <footer className="bg-white/80 border-t-2 border-amber-200 py-6 text-center text-xs font-bold text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌈</span>
            <span className="font-black text-slate-800 font-['Fredoka'] text-sm">
              KAMUS CERIA AI
            </span>
            <span>• Jom Belajar. Jom Bermain. Jom Jadi Bijak!</span>
          </div>
          <div>
            Aplikasi Pembelajaran Digital Bahasa Melayu Interaktif (3 - 12 Tahun) 🦉🇲🇾
          </div>
        </div>
      </footer>
    </div>
  );
}
