import React from 'react';
import { ALL_WORDS } from '../data/allWords';
import { WordItem, UserProgress } from '../types';
import { WordCard } from './WordCard';
import { soundManager } from '../utils/audio';
import { Heart, BookOpen } from 'lucide-react';

interface FavoritesViewProps {
  progress: UserProgress;
  onToggleFavorite: (id: string) => void;
  onMarkLearned: (id: string, category: string) => void;
  onOpenSpeakingMode: (word: WordItem) => void;
  onExploreWords: () => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  progress,
  onToggleFavorite,
  onMarkLearned,
  onOpenSpeakingMode,
  onExploreWords,
}) => {
  const favoriteWords = ALL_WORDS.filter((w) =>
    progress.favoriteWordIds.includes(w.id)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <div className="text-center mb-8">
        <span className="text-5xl inline-block animate-pulse text-rose-500">❤️</span>
        <h2 className="text-3xl sm:text-4xl font-black font-['Fredoka'] text-slate-900 mt-2">
          Perkataan Kegemaran Saya
        </h2>
        <p className="text-sm sm:text-base font-semibold text-slate-600 max-w-md mx-auto mt-1">
          Koleksi kosa kata istimewa yang disimpan oleh adik untuk diulang kaji pada bila-bila masa!
        </p>
      </div>

      {favoriteWords.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {favoriteWords.map((word) => (
            <WordCard
              key={word.id}
              word={word}
              isFavorite={true}
              isLearned={progress.learnedWordIds.includes(word.id)}
              onToggleFavorite={onToggleFavorite}
              onMarkLearned={onMarkLearned}
              onOpenSpeakingMode={onOpenSpeakingMode}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border-3 border-dashed border-rose-200 p-8 max-w-lg mx-auto">
          <span className="text-5xl">🤍</span>
          <h3 className="text-xl font-black text-slate-800 font-['Fredoka'] mt-3">
            Belum ada perkataan kegemaran
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 my-2">
            Tekan ikon hati ❤️ pada mana-mana kad perkataan untuk menyimpannya di sini!
          </p>
          <button
            onClick={() => {
              soundManager.playTap();
              onExploreWords();
            }}
            className="mt-4 py-2.5 px-6 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-black text-sm shadow-md hover:scale-105 transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            <span>Teroka Kamus Sekarang</span>
          </button>
        </div>
      )}
    </div>
  );
};
