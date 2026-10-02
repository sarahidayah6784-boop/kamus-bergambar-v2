import React, { useState } from 'react';
import { CATEGORIES } from '../data/categories';
import { ALL_WORDS } from '../data/allWords';
import { WordItem, UserProgress } from '../types';
import { WordCard } from './WordCard';
import { soundManager } from '../utils/audio';
import { ArrowLeft, Filter, Search } from 'lucide-react';

interface CategoryBrowserProps {
  progress: UserProgress;
  onToggleFavorite: (id: string) => void;
  onMarkLearned: (id: string, category: string) => void;
  onOpenSpeakingMode: (word: WordItem) => void;
  initialCategory?: string | null;
}

export const CategoryBrowser: React.FC<CategoryBrowserProps> = ({
  progress,
  onToggleFavorite,
  onMarkLearned,
  onOpenSpeakingMode,
  initialCategory = null,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);
  const [levelFilter, setLevelFilter] = useState<'all' | 1 | 2 | 3>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Active category object
  const activeCategoryInfo = CATEGORIES.find((c) => c.id === selectedCategory);

  // Filter words
  const filteredWords = ALL_WORDS.filter((w) => {
    if (selectedCategory && w.category !== selectedCategory) return false;
    if (levelFilter !== 'all' && w.level !== levelFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchWord = w.word.toLowerCase().includes(q);
      const matchMeaning = w.meaning.toLowerCase().includes(q);
      return matchWord || matchMeaning;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* If no category is selected: Show 20 Categories Grid */}
      {!selectedCategory ? (
        <div>
          <div className="text-center mb-8">
            <span className="text-4xl">📚</span>
            <h2 className="text-3xl sm:text-4xl font-black font-['Fredoka'] text-slate-900 mt-2">
              20 Kategori Pembelajaran Utama
            </h2>
            <p className="text-base font-semibold text-slate-600 mt-1 max-w-xl mx-auto">
              Pilih mana-mana kategori di bawah untuk meneroka perkataan bergambar, mendengar sebutan, dan mengumpul bintang!
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {CATEGORIES.map((cat) => {
              const catWords = ALL_WORDS.filter((w) => w.category === cat.id);
              const learnedCount = catWords.filter((w) =>
                progress.learnedWordIds.includes(w.id)
              ).length;
              const percentage = Math.min(
                100,
                Math.round((learnedCount / Math.max(1, catWords.length)) * 100)
              );

              return (
                <div
                  key={cat.id}
                  onClick={() => {
                    soundManager.playTap();
                    setSelectedCategory(cat.id);
                  }}
                  className={`group relative rounded-3xl p-4 border-3 ${cat.borderLight} ${cat.bgLight} hover:border-amber-400 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1.5 flex flex-col justify-between`}
                >
                  <div>
                    <div className="text-4xl sm:text-5xl text-center mb-2 group-hover:scale-125 transition-transform duration-300">
                      {cat.icon}
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-slate-900 text-center font-['Fredoka'] group-hover:text-amber-700">
                      {cat.name}
                    </h3>
                    <p className="text-[11px] font-bold text-slate-500 text-center">
                      {catWords.length} Perkataan
                    </p>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-3">
                    <div className="flex justify-between items-center text-[10px] font-black text-slate-600 mb-1">
                      <span>Kemajuan</span>
                      <span>{percentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${cat.color} transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* If category is selected: Show Words List for this category */
        <div>
          {/* Header with back button & category banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b-2 border-amber-200">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  soundManager.playTap();
                  setSelectedCategory(null);
                }}
                className="p-2.5 rounded-2xl bg-white border-2 border-amber-300 hover:bg-amber-100 text-slate-800 transition-colors shadow-sm cursor-pointer flex items-center gap-1.5 font-black text-sm"
              >
                <ArrowLeft className="w-5 h-5 text-amber-600" />
                <span>Semua Kategori</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="text-4xl">{activeCategoryInfo?.icon}</span>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black font-['Fredoka'] text-slate-900">
                    {activeCategoryInfo?.name}
                  </h2>
                  <p className="text-xs sm:text-sm font-semibold text-slate-600">
                    {activeCategoryInfo?.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Filters Row */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Level Filter Tabs */}
              <div className="flex items-center bg-white p-1 rounded-2xl border-2 border-slate-200 shadow-sm text-xs font-black">
                <button
                  onClick={() => setLevelFilter('all')}
                  className={`px-3 py-1.5 rounded-xl cursor-pointer transition-colors ${
                    levelFilter === 'all'
                      ? 'bg-amber-400 text-amber-950 shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Semua
                </button>
                <button
                  onClick={() => setLevelFilter(1)}
                  className={`px-3 py-1.5 rounded-xl cursor-pointer transition-colors ${
                    levelFilter === 1
                      ? 'bg-emerald-500 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  3-5 Thn
                </button>
                <button
                  onClick={() => setLevelFilter(2)}
                  className={`px-3 py-1.5 rounded-xl cursor-pointer transition-colors ${
                    levelFilter === 2
                      ? 'bg-amber-500 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  6-8 Thn
                </button>
                <button
                  onClick={() => setLevelFilter(3)}
                  className={`px-3 py-1.5 rounded-xl cursor-pointer transition-colors ${
                    levelFilter === 3
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  9-12 Thn
                </button>
              </div>

              {/* Quick Search */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-3 py-1.5 bg-white border-2 border-slate-200 rounded-2xl text-xs sm:text-sm font-semibold focus:outline-none focus:border-amber-400 w-36 sm:w-48"
                />
              </div>
            </div>
          </div>

          {/* Words Grid */}
          {filteredWords.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredWords.map((word) => (
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
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border-3 border-dashed border-amber-200 p-8">
              <span className="text-5xl">🔍</span>
              <h3 className="text-xl font-black text-slate-800 font-['Fredoka'] mt-2">
                Tiada perkataan dijumpai
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                Cuba tukar tapisan umur atau carian anda.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
