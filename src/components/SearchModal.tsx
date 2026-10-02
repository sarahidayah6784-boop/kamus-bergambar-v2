import React, { useState } from 'react';
import { ALL_WORDS } from '../data/allWords';
import { WordItem, UserProgress } from '../types';
import { soundManager } from '../utils/audio';
import { Search, X, Volume2, Heart } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
  onToggleFavorite: (id: string) => void;
  onMarkLearned: (id: string, category: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  progress,
  onToggleFavorite,
  onMarkLearned,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = query.trim()
    ? ALL_WORDS.filter((w) => {
        const q = query.toLowerCase();
        return (
          w.word.toLowerCase().includes(q) ||
          w.meaning.toLowerCase().includes(q) ||
          w.category.toLowerCase().includes(q) ||
          (w.synonym && w.synonym.some((s) => s.toLowerCase().includes(q)))
        );
      })
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto pt-16">
      <div className="bg-white rounded-3xl border-4 border-amber-300 shadow-2xl max-w-2xl w-full p-5 flex flex-col max-h-[80vh] overflow-hidden">
        {/* Search Input Box */}
        <div className="flex items-center gap-3 pb-3 border-b-2 border-amber-100">
          <Search className="w-6 h-6 text-amber-500" />
          <input
            type="text"
            autoFocus
            placeholder="Cari perkataan, maksud, atau haiwan..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-base sm:text-lg font-bold text-slate-900 focus:outline-none placeholder:text-slate-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs font-bold text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              Kosongkan
            </button>
          )}
          <button
            onClick={() => {
              soundManager.playTap();
              onClose();
            }}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto py-3 space-y-2.5">
          {query.trim() === '' ? (
            <div className="text-center py-10 text-slate-400">
              <span className="text-4xl block mb-2">🔍</span>
              <p className="text-sm font-semibold">
                Taip perkataan untuk mula mencari (cth: kucing, rajin, epal)
              </p>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-10 text-slate-400">
              <span className="text-4xl block mb-2">🦉</span>
              <p className="text-sm font-semibold">
                Tiada perkataan dijumpai untuk "{query}".
              </p>
            </div>
          ) : (
            results.map((w) => {
              const isFav = progress.favoriteWordIds.includes(w.id);
              return (
                <div
                  key={w.id}
                  className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200 hover:bg-amber-100/70 transition-colors flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{w.image}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-black font-['Fredoka'] text-slate-900">
                          {w.word}
                        </h4>
                        <span className="text-[10px] font-bold bg-white px-2 py-0.5 rounded-md border border-amber-200 text-amber-800">
                          {w.category}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-600 line-clamp-1">
                        {w.meaning}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => {
                        soundManager.speakMalay(w.word);
                        onMarkLearned(w.id, w.category);
                      }}
                      className="p-2 rounded-xl bg-amber-200 hover:bg-amber-300 text-amber-950 transition-colors cursor-pointer"
                      title="Dengar Sebutan"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onToggleFavorite(w.id)}
                      className="p-2 rounded-xl hover:bg-rose-100 text-rose-500 transition-colors cursor-pointer"
                      title="Simpan Kegemaran"
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
