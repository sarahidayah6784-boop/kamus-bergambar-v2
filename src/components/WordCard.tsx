import React, { useState } from 'react';
import { WordItem } from '../types';
import { soundManager } from '../utils/audio';
import { Volume2, Heart, Mic, Sparkles, CheckCircle2 } from 'lucide-react';

interface WordCardProps {
  word: WordItem;
  isFavorite: boolean;
  isLearned: boolean;
  onToggleFavorite: (id: string) => void;
  onMarkLearned: (id: string, category: string) => void;
  onOpenSpeakingMode?: (word: WordItem) => void;
  compact?: boolean;
}

export const WordCard: React.FC<WordCardProps> = ({
  word,
  isFavorite,
  isLearned,
  onToggleFavorite,
  onMarkLearned,
  onOpenSpeakingMode,
  compact = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(true);
    soundManager.speakMalay(word.word).then(() => setIsPlaying(false));
    onMarkLearned(word.id, word.category);
  };

  const handleSpeakSentence = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(true);
    soundManager.speakMalay(word.exampleSentence).then(() => setIsPlaying(false));
  };

  const levelLabels = {
    1: { label: '🐣 Si Kecil (3-5)', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
    2: { label: '🌟 Penemu (6-8)', color: 'bg-amber-100 text-amber-800 border-amber-300' },
    3: { label: '🚀 Bijak (9-12)', color: 'bg-purple-100 text-purple-800 border-purple-300' },
  };

  return (
    <div
      onClick={() => setShowDetail(!showDetail)}
      className="group relative bg-white rounded-3xl p-5 border-4 border-amber-200 hover:border-amber-400 hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1.5 flex flex-col justify-between"
    >
      {/* Top action row */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <span
          className={`text-[11px] font-black px-2.5 py-0.5 rounded-full border ${
            levelLabels[word.level].color
          }`}
        >
          {levelLabels[word.level].label}
        </span>

        <div className="flex items-center gap-1.5">
          {isLearned && (
            <span title="Telah dipelajari!" className="text-emerald-500">
              <CheckCircle2 className="w-5 h-5 fill-emerald-100" />
            </span>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(word.id);
            }}
            className="p-1.5 rounded-full hover:bg-rose-50 text-rose-500 transition-transform active:scale-125 cursor-pointer"
            title={isFavorite ? 'Padam dari kegemaran' : 'Simpan sebagai kegemaran'}
          >
            <Heart
              className={`w-5 h-5 ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-slate-300'}`}
            />
          </button>
        </div>
      </div>

      {/* Main big visual & Word */}
      <div className="text-center my-3">
        <div className="text-6xl sm:text-7xl mb-2.5 group-hover:scale-110 transition-transform select-none animate-pulse">
          {word.image}
        </div>

        <h3 className="text-2xl sm:text-3xl font-black text-slate-800 font-['Fredoka'] tracking-wide group-hover:text-amber-600 transition-colors">
          {word.word}
        </h3>

        {/* Syllables breakdown pill buttons */}
        <div className="flex items-center justify-center gap-1.5 mt-2 flex-wrap">
          {word.syllables.map((syl, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                soundManager.playTap();
                soundManager.speakMalay(syl);
              }}
              className="text-xs font-bold px-2 py-0.5 rounded-lg bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200 transition-colors"
              title="Dengar suku kata ini"
            >
              {syl}
            </button>
          ))}
        </div>
      </div>

      {/* Meaning description */}
      <p className="text-xs sm:text-sm text-slate-600 text-center font-medium my-2 line-clamp-2 px-1">
        {word.meaning}
      </p>

      {/* Example Sentence Box */}
      <div
        onClick={handleSpeakSentence}
        className="bg-amber-50/80 rounded-2xl p-2.5 border border-amber-200/80 my-2 text-center text-xs font-semibold text-amber-950 relative hover:bg-amber-100/70 transition-colors"
        title="Tekan untuk dengar ayat"
      >
        <p className="italic">“{word.exampleSentence}”</p>
      </div>

      {/* Expanded details (Synonyms, antonyms, grammar) */}
      {showDetail && (
        <div className="mt-2 pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-600 animate-fade-in">
          {word.partOfSpeech && (
            <div className="flex items-center justify-between font-bold text-indigo-700">
              <span>Jenis Kata:</span>
              <span className="bg-indigo-50 px-2 py-0.5 rounded-md">{word.partOfSpeech}</span>
            </div>
          )}
          {word.synonym && word.synonym.length > 0 && (
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-700">Sinonim:</span>
              <span className="font-semibold text-emerald-900">{word.synonym.join(', ')}</span>
            </div>
          )}
          {word.antonym && word.antonym.length > 0 && (
            <div className="flex items-center justify-between">
              <span className="font-bold text-rose-700">Antonim:</span>
              <span className="font-semibold text-rose-900">{word.antonym.join(', ')}</span>
            </div>
          )}
          {word.funFact && (
            <p className="text-[11px] bg-sky-50 text-sky-800 p-1.5 rounded-xl border border-sky-200 mt-1">
              💡 {word.funFact}
            </p>
          )}
        </div>
      )}

      {/* Action Buttons row: Dengar & Cuba Sebut */}
      <div className="grid grid-cols-2 gap-2 mt-3 pt-2">
        <button
          type="button"
          onClick={handleSpeak}
          className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-2xl font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer ${
            isPlaying
              ? 'bg-amber-500 text-white scale-95'
              : 'bg-gradient-to-r from-amber-400 to-orange-400 text-amber-950 hover:from-amber-500 hover:to-orange-500'
          }`}
        >
          <Volume2 className="w-4 h-4" />
          <span>DENGAR</span>
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (onOpenSpeakingMode) {
              onOpenSpeakingMode(word);
            } else {
              soundManager.speakMalay(word.word);
            }
          }}
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-2xl font-black text-xs sm:text-sm bg-gradient-to-r from-rose-400 to-pink-500 text-white hover:from-rose-500 hover:to-pink-600 shadow-md transition-all cursor-pointer"
        >
          <Mic className="w-4 h-4" />
          <span>SEBUT</span>
        </button>
      </div>
    </div>
  );
};
