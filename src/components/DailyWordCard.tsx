import React, { useState } from 'react';
import { WordItem, UserProgress } from '../types';
import { soundManager } from '../utils/audio';
import { awardReward } from '../utils/storage';
import confetti from 'canvas-confetti';
import { Sparkles, Volume2, Award, CheckCircle2 } from 'lucide-react';

interface DailyWordCardProps {
  progress: UserProgress;
  onUpdateProgress: (p: UserProgress) => void;
}

export const DailyWordCard: React.FC<DailyWordCardProps> = ({
  progress,
  onUpdateProgress,
}) => {
  const [answered, setAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // Daily word: "BERANI"
  const dailyWord: WordItem = {
    id: 'berani',
    word: 'BERANI',
    category: 'perasaan',
    level: 2,
    syllables: ['Be', 'ra', 'ni'],
    meaning: 'Tidak gentar atau takut menghadapi sesuatu cabaran dan kesukaran.',
    exampleSentence: 'Adik berani mencuba permainan kosa kata baharu bersama Cikgu Ceri.',
    image: '🦁',
    synonym: ['Gagah', 'Cekal'],
    antonym: ['Penakut'],
    partOfSpeech: 'Kata Adjektif',
  };

  const quizQuestion = {
    question: 'Pilih situasi yang menunjukkan sikap BERANI:',
    options: [
      { text: 'A. Mengangkat tangan untuk mencuba menjawab soalan guru.', correct: true },
      { text: 'B. Menyorok di bawah meja kerana takut mencuba.', correct: false },
      { text: 'C. Cepat berputus asa apabila terasa susah.', correct: false },
    ],
  };

  const handleSelectOption = (index: number) => {
    if (answered) return;
    setSelectedOption(index);
    setAnswered(true);

    if (quizQuestion.options[index].correct) {
      soundManager.playCorrect();
      try {
        confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
      } catch (e) {}

      const { newProgress } = awardReward(progress, 50, 3);
      onUpdateProgress(newProgress);
    } else {
      soundManager.playGentleWrong();
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 rounded-3xl p-6 sm:p-10 border-4 border-amber-300 shadow-xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />

        {/* Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3.5 py-1.5 rounded-full font-black text-xs sm:text-sm shadow-md">
            <Sparkles className="w-4 h-4" />
            <span>PERKATAAN HARI INI</span>
          </div>
          <span className="text-xs font-bold text-slate-500">Kemas Kini Harian</span>
        </div>

        {/* Hero content */}
        <div className="flex flex-col sm:flex-row items-center gap-6 my-4">
          <div className="text-8xl sm:text-9xl p-6 bg-white rounded-3xl border-3 border-amber-200 shadow-md shrink-0 animate-bounce select-none">
            {dailyWord.image}
          </div>

          <div className="text-center sm:text-left flex-1">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
              <h2 className="text-4xl sm:text-5xl font-black font-['Fredoka'] text-slate-900 tracking-wide">
                {dailyWord.word}
              </h2>
              <button
                onClick={() => soundManager.speakMalay(dailyWord.word)}
                className="p-2 rounded-2xl bg-amber-200 hover:bg-amber-300 text-amber-950 transition-colors cursor-pointer"
                title="Dengar Sebutan"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            {/* Syllables */}
            <div className="flex items-center justify-center sm:justify-start gap-1.5 mb-3">
              {dailyWord.syllables.map((s, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 rounded-lg bg-amber-200/80 text-amber-950 font-black text-xs"
                >
                  {s}
                </span>
              ))}
              <span className="text-xs font-bold text-slate-500 ml-2">
                (Kata Adjektif)
              </span>
            </div>

            <p className="text-base sm:text-lg font-bold text-slate-700 leading-snug">
              {dailyWord.meaning}
            </p>

            {/* Example sentence */}
            <div className="mt-3 bg-white/80 p-3 rounded-2xl border border-amber-200 text-xs sm:text-sm font-semibold italic text-amber-950">
              “{dailyWord.exampleSentence}”
            </div>
          </div>
        </div>

        {/* Mini Quiz Challenge */}
        <div className="mt-8 pt-6 border-t-2 border-amber-200/70 bg-white/70 p-5 rounded-3xl border">
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-5 h-5 text-amber-600" />
            <h4 className="text-base sm:text-lg font-black font-['Fredoka'] text-slate-900">
              🎮 JAWAB CABARAN HARI INI (+50 XP & 3 Bintang ⭐)
            </h4>
          </div>

          <p className="text-sm font-bold text-slate-700 mb-3">
            {quizQuestion.question}
          </p>

          <div className="space-y-2">
            {quizQuestion.options.map((opt, i) => {
              let btnClass = 'bg-white border-2 border-slate-200 text-slate-800 hover:border-amber-400 hover:bg-amber-50';
              if (answered) {
                if (opt.correct) {
                  btnClass = 'bg-emerald-500 border-2 border-emerald-600 text-white font-black';
                } else if (selectedOption === i) {
                  btnClass = 'bg-rose-500 border-2 border-rose-600 text-white font-black';
                }
              }

              return (
                <button
                  key={i}
                  disabled={answered}
                  onClick={() => handleSelectOption(i)}
                  className={`w-full text-left p-3.5 rounded-2xl font-bold text-sm shadow-xs transition-all cursor-pointer ${btnClass}`}
                >
                  {opt.text}
                </button>
              );
            })}
          </div>

          {answered && (
            <div className="mt-4 p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-800 font-black text-sm flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>
                Tahniah! Terus amalkan sifat berani dalam menuntut ilmu setiap hari! 🦁✨
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
