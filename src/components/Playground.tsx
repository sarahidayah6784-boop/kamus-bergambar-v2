import React, { useState, useEffect } from 'react';
import { ALL_WORDS } from '../data/allWords';
import { CATEGORIES } from '../data/categories';
import { WordItem, UserProgress } from '../types';
import { soundManager } from '../utils/audio';
import { awardReward, saveProgress } from '../utils/storage';
import confetti from 'canvas-confetti';
import {
  Gamepad2,
  Sparkles,
  RefreshCw,
  Trophy,
  Volume2,
  Check,
  RotateCcw,
  Clock,
  ArrowLeft,
  Star,
} from 'lucide-react';

interface PlaygroundProps {
  progress: UserProgress;
  onUpdateProgress: (newProgress: UserProgress) => void;
  defaultGame?: string | null;
}

export const Playground: React.FC<PlaygroundProps> = ({
  progress,
  onUpdateProgress,
  defaultGame = null,
}) => {
  const [activeGame, setActiveGame] = useState<string | null>(defaultGame);

  // Available games metadata
  const games = [
    {
      id: 'teka-gambar',
      title: '🎯 Teka Gambar',
      desc: 'Lihat gambar besar dan teka perkataan yang betul!',
      icon: '🐶',
      color: 'from-amber-400 to-orange-500',
    },
    {
      id: 'susun-huruf',
      title: '🔤 Susun Huruf',
      desc: 'Susun huruf bercampur menjadi perkataan sempurna!',
      icon: '🔤',
      color: 'from-rose-400 to-pink-500',
    },
    {
      id: 'padankan',
      title: '🧩 Padankan Pasangan',
      desc: 'Buka kad memori dan cari pasangan perkataan & gambar!',
      icon: '🧩',
      color: 'from-indigo-400 to-blue-600',
    },
    {
      id: 'teka-maksud',
      title: '🧠 Teka Maksud',
      desc: 'Baca penerangan kosa kata dan cari jawapan tepat!',
      icon: '🧠',
      color: 'from-purple-500 to-violet-600',
    },
    {
      id: 'dengar-pilih',
      title: '🔊 Dengar & Pilih',
      desc: 'Dengar suara Cikgu Ceri dan pilih gambar yang betul!',
      icon: '🔊',
      color: 'from-emerald-400 to-teal-500',
    },
    {
      id: 'cari-perkataan',
      title: '🕵️ Cari Perkataan',
      desc: 'Treasure hunt: Cari semua perkataan dalam kategori!',
      icon: '🕵️',
      color: 'from-cyan-400 to-blue-500',
    },
    {
      id: 'cabaran-60',
      title: '⚡ Cabaran 60 Saat',
      desc: 'Uji kepantasan minda menjawab sebanyak mungkin soalan!',
      icon: '⚡',
      color: 'from-yellow-400 to-amber-600',
    },
    {
      id: 'roda-perkataan',
      title: '🎲 Roda Perkataan',
      desc: 'Putar roda warna-warni untuk menang bintang & kosa kata!',
      icon: '🎲',
      color: 'from-fuchsia-400 to-rose-500',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {!activeGame ? (
        <div>
          {/* Header */}
          <div className="text-center mb-8">
            <span className="text-5xl animate-bounce inline-block">🎮</span>
            <h2 className="text-3xl sm:text-4xl font-black font-['Fredoka'] text-slate-900 mt-2">
              Pusat Permainan Ceria
            </h2>
            <p className="text-base font-semibold text-slate-600 max-w-xl mx-auto mt-1">
              8 permainan pendidikan menyeronokkan untuk menguji minda, mengumpul bintang, dan naik taraf level!
            </p>
          </div>

          {/* Games Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {games.map((g) => (
              <div
                key={g.id}
                onClick={() => {
                  soundManager.playTap();
                  setActiveGame(g.id);
                }}
                className="group relative bg-white rounded-3xl p-6 border-4 border-slate-200 hover:border-amber-400 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="text-5xl text-center mb-4 group-hover:scale-125 transition-transform duration-300">
                    {g.icon}
                  </div>
                  <h3 className="text-xl font-black font-['Fredoka'] text-slate-900 text-center mb-2 group-hover:text-amber-600">
                    {g.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-slate-600 text-center">
                    {g.desc}
                  </p>
                </div>

                <button
                  type="button"
                  className={`mt-6 w-full py-2.5 px-4 rounded-xl font-black text-sm text-white shadow-md bg-gradient-to-r ${g.color} hover:opacity-95 transition-opacity flex items-center justify-center gap-1.5 cursor-pointer`}
                >
                  <Gamepad2 className="w-4 h-4" />
                  <span>MAIN SEKARANG</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Active Game Arena */
        <div>
          {/* Back button */}
          <button
            onClick={() => {
              soundManager.playTap();
              setActiveGame(null);
            }}
            className="mb-6 flex items-center gap-2 px-4 py-2 bg-white rounded-2xl border-2 border-amber-300 text-slate-800 font-black text-sm shadow-sm hover:bg-amber-50 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-amber-600" />
            <span>Kembali ke Pusat Permainan</span>
          </button>

          {/* Render individual games */}
          {activeGame === 'teka-gambar' && (
            <GameTekaGambar progress={progress} onUpdateProgress={onUpdateProgress} />
          )}
          {activeGame === 'susun-huruf' && (
            <GameSusunHuruf progress={progress} onUpdateProgress={onUpdateProgress} />
          )}
          {activeGame === 'padankan' && (
            <GamePadankanPasangan progress={progress} onUpdateProgress={onUpdateProgress} />
          )}
          {activeGame === 'teka-maksud' && (
            <GameTekaMaksud progress={progress} onUpdateProgress={onUpdateProgress} />
          )}
          {activeGame === 'dengar-pilih' && (
            <GameDengarPilih progress={progress} onUpdateProgress={onUpdateProgress} />
          )}
          {activeGame === 'cari-perkataan' && (
            <GameCariPerkataan progress={progress} onUpdateProgress={onUpdateProgress} />
          )}
          {activeGame === 'cabaran-60' && (
            <GameCabaran60 progress={progress} onUpdateProgress={onUpdateProgress} />
          )}
          {activeGame === 'roda-perkataan' && (
            <GameRodaPerkataan progress={progress} onUpdateProgress={onUpdateProgress} />
          )}
        </div>
      )}
    </div>
  );
};

/* ------------------------------------------------------------- */
/* GAME 1: TEKA GAMBAR (Section 13)                              */
/* ------------------------------------------------------------- */
const GameTekaGambar: React.FC<{ progress: UserProgress; onUpdateProgress: (p: UserProgress) => void }> = ({
  progress,
  onUpdateProgress,
}) => {
  const [currentWord, setCurrentWord] = useState<WordItem>(ALL_WORDS[0]);
  const [options, setOptions] = useState<WordItem[]>([]);
  const [score, setScore] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const nextQuestion = () => {
    const randomTarget = ALL_WORDS[Math.floor(Math.random() * ALL_WORDS.length)];
    const otherOptions: WordItem[] = [];
    while (otherOptions.length < 3) {
      const candidate = ALL_WORDS[Math.floor(Math.random() * ALL_WORDS.length)];
      if (candidate.id !== randomTarget.id && !otherOptions.some((o) => o.id === candidate.id)) {
        otherOptions.push(candidate);
      }
    }
    const all = [randomTarget, ...otherOptions].sort(() => Math.random() - 0.5);
    setCurrentWord(randomTarget);
    setOptions(all);
    setSelectedId(null);
    setIsCorrect(null);
  };

  useEffect(() => {
    nextQuestion();
  }, []);

  const handleSelect = (chosen: WordItem) => {
    if (selectedId) return;
    setSelectedId(chosen.id);

    if (chosen.id === currentWord.id) {
      setIsCorrect(true);
      soundManager.playCorrect();
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      } catch (e) {}
      setScore((s) => s + 1);

      // Award XP & Star (+10 Stars)
      const { newProgress } = awardReward(progress, 20, 2);
      newProgress.gameHighScores.tekaGambar = Math.max(
        newProgress.gameHighScores.tekaGambar,
        score + 1
      );
      newProgress.quizStats.totalAnswered += 1;
      newProgress.quizStats.totalCorrect += 1;
      onUpdateProgress(newProgress);
    } else {
      setIsCorrect(false);
      soundManager.playGentleWrong();
      const updated = { ...progress };
      updated.quizStats.totalAnswered += 1;
      onUpdateProgress(updated);
    }

    setTimeout(nextQuestion, 1600);
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border-4 border-amber-300 shadow-xl text-center">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-black bg-amber-100 text-amber-900 px-3 py-1 rounded-full border border-amber-300">
          🎯 TEKA GAMBAR
        </span>
        <div className="flex items-center gap-1.5 bg-amber-400 text-amber-950 font-black px-3 py-1 rounded-full text-sm">
          <span>⭐ Skor: {score}</span>
        </div>
      </div>

      <p className="text-lg font-bold text-slate-700 mb-2">Apakah nama benda ini?</p>

      {/* Big Visual Image */}
      <div className="text-8xl sm:text-9xl my-4 p-6 bg-amber-50 rounded-3xl border-3 border-dashed border-amber-300 inline-block animate-pulse select-none">
        {currentWord.image}
      </div>

      {/* Feedback banner */}
      {isCorrect === true && (
        <div className="text-lg font-black text-emerald-600 bg-emerald-50 py-2 rounded-2xl border-2 border-emerald-300 mb-4 animate-bounce">
          🎉 BETUL! +10 Bintang! Hebatnya kamu!
        </div>
      )}
      {isCorrect === false && (
        <div className="text-base font-bold text-rose-600 bg-rose-50 py-2 rounded-2xl border-2 border-rose-300 mb-4">
          Cuba lagi! Jawapannya ialah: {currentWord.word}
        </div>
      )}

      {/* Choices */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        {options.map((opt) => {
          let btnClass = 'bg-white border-2 border-slate-200 text-slate-800 hover:border-amber-400 hover:bg-amber-50';
          if (selectedId) {
            if (opt.id === currentWord.id) {
              btnClass = 'bg-emerald-500 border-2 border-emerald-600 text-white font-black scale-105';
            } else if (opt.id === selectedId) {
              btnClass = 'bg-rose-500 border-2 border-rose-600 text-white font-black';
            }
          }

          return (
            <button
              key={opt.id}
              disabled={!!selectedId}
              onClick={() => handleSelect(opt)}
              className={`py-3.5 px-4 rounded-2xl font-black text-base sm:text-lg transition-all shadow-sm cursor-pointer ${btnClass}`}
            >
              {opt.word}
            </button>
          );
        })}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------- */
/* GAME 2: SUSUN HURUF (Section 14)                             */
/* ------------------------------------------------------------- */
const GameSusunHuruf: React.FC<{ progress: UserProgress; onUpdateProgress: (p: UserProgress) => void }> = ({
  progress,
  onUpdateProgress,
}) => {
  const [word, setWord] = useState<WordItem>(ALL_WORDS[0]);
  const [scrambled, setScrambled] = useState<string[]>([]);
  const [selectedLetters, setSelectedLetters] = useState<{ char: string; originalIndex: number }[]>([]);
  const [usedIndices, setUsedIndices] = useState<number[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [score, setScore] = useState(0);

  const initGame = () => {
    // Choose words of appropriate length (3 to 6 letters)
    const validWords = ALL_WORDS.filter((w) => w.word.length >= 3 && w.word.length <= 6 && !w.word.includes(' '));
    const target = validWords[Math.floor(Math.random() * validWords.length)] || ALL_WORDS[0];
    const letters = target.word.toUpperCase().split('');
    const shuffled = [...letters].sort(() => Math.random() - 0.5);

    setWord(target);
    setScrambled(shuffled);
    setSelectedLetters([]);
    setUsedIndices([]);
    setIsSuccess(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handlePickLetter = (char: string, index: number) => {
    if (usedIndices.includes(index) || isSuccess) return;
    soundManager.playTap();

    const newSelected = [...selectedLetters, { char, originalIndex: index }];
    const newUsed = [...usedIndices, index];
    setSelectedLetters(newSelected);
    setUsedIndices(newUsed);

    // Check if fully placed
    if (newSelected.length === word.word.length) {
      const formedWord = newSelected.map((s) => s.char).join('');
      if (formedWord === word.word.toUpperCase()) {
        setIsSuccess(true);
        soundManager.playCorrect();
        try {
          confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
        } catch (e) {}
        setScore((s) => s + 1);

        const { newProgress } = awardReward(progress, 25, 2);
        newProgress.gameHighScores.susunHuruf = Math.max(
          newProgress.gameHighScores.susunHuruf,
          score + 1
        );
        onUpdateProgress(newProgress);
        setTimeout(initGame, 2000);
      } else {
        soundManager.playGentleWrong();
        setTimeout(() => {
          setSelectedLetters([]);
          setUsedIndices([]);
        }, 800);
      }
    }
  };

  const handleResetLetters = () => {
    soundManager.playTap();
    setSelectedLetters([]);
    setUsedIndices([]);
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border-4 border-rose-300 shadow-xl text-center">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-black bg-rose-100 text-rose-900 px-3 py-1 rounded-full border border-rose-300">
          🔤 SUSUN HURUF
        </span>
        <span className="bg-rose-500 text-white font-black px-3 py-1 rounded-full text-sm">
          Skor: {score}
        </span>
      </div>

      <div className="text-7xl sm:text-8xl my-3 select-none">{word.image}</div>
      <p className="text-sm font-semibold text-slate-600 mb-4">{word.meaning}</p>

      {/* Target letter slots */}
      <div className="flex justify-center gap-2 mb-6 min-h-[60px]">
        {Array.from({ length: word.word.length }).map((_, idx) => {
          const letter = selectedLetters[idx];
          return (
            <div
              key={idx}
              className={`w-12 h-14 sm:w-14 sm:h-16 rounded-2xl flex items-center justify-center text-2xl font-black border-3 transition-all ${
                letter
                  ? 'bg-amber-400 border-amber-500 text-amber-950 scale-105 shadow-md'
                  : 'bg-slate-50 border-dashed border-slate-300 text-transparent'
              }`}
            >
              {letter?.char || ''}
            </div>
          );
        })}
      </div>

      {isSuccess && (
        <div className="text-lg font-black text-emerald-600 bg-emerald-50 py-2 rounded-2xl border-2 border-emerald-300 mb-4 animate-bounce">
          ✨ TAHNIAH! Ejaan Sempurna!
        </div>
      )}

      {/* Letter pool to tap */}
      <div className="flex justify-center gap-2.5 flex-wrap my-4">
        {scrambled.map((char, idx) => {
          const isUsed = usedIndices.includes(idx);
          return (
            <button
              key={idx}
              disabled={isUsed || isSuccess}
              onClick={() => handlePickLetter(char, idx)}
              className={`w-12 h-14 sm:w-14 sm:h-16 rounded-2xl font-black text-2xl shadow-md transition-all cursor-pointer ${
                isUsed
                  ? 'bg-slate-200 text-slate-400 opacity-40 cursor-not-allowed scale-90'
                  : 'bg-gradient-to-br from-rose-400 to-pink-500 text-white hover:scale-110 active:scale-95'
              }`}
            >
              {char}
            </button>
          );
        })}
      </div>

      <button
        onClick={handleResetLetters}
        className="mt-4 inline-flex items-center gap-1.5 text-xs font-black text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl cursor-pointer"
      >
        <RotateCcw className="w-4 h-4" />
        <span>Susun Semula</span>
      </button>
    </div>
  );
};

/* ------------------------------------------------------------- */
/* GAME 3: PADANKAN PASANGAN (Memory card flip)                 */
/* ------------------------------------------------------------- */
const GamePadankanPasangan: React.FC<{ progress: UserProgress; onUpdateProgress: (p: UserProgress) => void }> = ({
  progress,
  onUpdateProgress,
}) => {
  interface Card {
    uid: string;
    wordId: string;
    content: string;
    type: 'word' | 'image';
  }

  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);

  const initGame = () => {
    // Pick 4 words
    const chosen = [...ALL_WORDS].sort(() => Math.random() - 0.5).slice(0, 4);
    const cardPairs: Card[] = [];
    chosen.forEach((w) => {
      cardPairs.push({ uid: `${w.id}-w`, wordId: w.id, content: w.word, type: 'word' });
      cardPairs.push({ uid: `${w.id}-i`, wordId: w.id, content: w.image, type: 'image' });
    });
    setCards(cardPairs.sort(() => Math.random() - 0.5));
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleFlip = (index: number) => {
    if (flipped.length >= 2 || flipped.includes(index) || matched.includes(cards[index].wordId)) return;
    soundManager.playTap();

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const first = cards[newFlipped[0]];
      const second = cards[newFlipped[1]];

      if (first.wordId === second.wordId && first.type !== second.type) {
        // Matched!
        soundManager.playCorrect();
        const newMatched = [...matched, first.wordId];
        setMatched(newMatched);
        setFlipped([]);

        if (newMatched.length === 4) {
          // Completed game!
          try {
            confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
          } catch (e) {}
          const { newProgress } = awardReward(progress, 30, 3);
          newProgress.gameHighScores.padankan = Math.max(
            newProgress.gameHighScores.padankan,
            newMatched.length
          );
          onUpdateProgress(newProgress);
        }
      } else {
        soundManager.playGentleWrong();
        setTimeout(() => setFlipped([]), 900);
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border-4 border-indigo-300 shadow-xl text-center">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-black bg-indigo-100 text-indigo-900 px-3 py-1 rounded-full border border-indigo-300">
          🧩 PADANKAN PASANGAN
        </span>
        <span className="text-xs font-black text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
          Langkah: {moves}
        </span>
      </div>

      <p className="text-sm font-semibold text-slate-600 mb-4">
        Buka kad dan padankan perkataan dengan gambarnya yang betul!
      </p>

      {/* Grid of 8 cards */}
      <div className="grid grid-cols-4 gap-3 my-4">
        {cards.map((card, idx) => {
          const isFlipped = flipped.includes(idx);
          const isDone = matched.includes(card.wordId);

          return (
            <button
              key={card.uid}
              disabled={isDone}
              onClick={() => handleFlip(idx)}
              className={`h-24 sm:h-28 rounded-2xl flex items-center justify-center p-2 font-black transition-all duration-300 cursor-pointer shadow-md ${
                isDone
                  ? 'bg-emerald-100 border-3 border-emerald-400 text-emerald-800 scale-95 opacity-80'
                  : isFlipped
                  ? 'bg-amber-400 border-3 border-amber-500 text-amber-950 scale-105'
                  : 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white hover:scale-105'
              }`}
            >
              {isFlipped || isDone ? (
                <span className={card.type === 'image' ? 'text-4xl' : 'text-xs sm:text-sm font-extrabold break-all'}>
                  {card.content}
                </span>
              ) : (
                <span className="text-2xl opacity-60">❓</span>
              )}
            </button>
          );
        })}
      </div>

      {matched.length === 4 && (
        <div className="mt-4 p-3 bg-emerald-50 text-emerald-700 rounded-2xl border border-emerald-300 font-black animate-bounce">
          🎉 Wah, hebatnya! Kamu telah padankan kesemua kosa kata!
        </div>
      )}

      <button
        onClick={initGame}
        className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-500 text-white rounded-xl text-xs font-black shadow-md hover:bg-indigo-600 cursor-pointer"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        <span>Main Pusingan Baharu</span>
      </button>
    </div>
  );
};

/* ------------------------------------------------------------- */
/* GAME 4: TEKA MAKSUD (Meaning context quiz)                   */
/* ------------------------------------------------------------- */
const GameTekaMaksud: React.FC<{ progress: UserProgress; onUpdateProgress: (p: UserProgress) => void }> = ({
  progress,
  onUpdateProgress,
}) => {
  const [word, setWord] = useState<WordItem>(ALL_WORDS[0]);
  const [options, setOptions] = useState<WordItem[]>([]);
  const [score, setScore] = useState(0);
  const [answeredId, setAnsweredId] = useState<string | null>(null);

  const nextQuestion = () => {
    const target = ALL_WORDS[Math.floor(Math.random() * ALL_WORDS.length)];
    const others: WordItem[] = [];
    while (others.length < 3) {
      const c = ALL_WORDS[Math.floor(Math.random() * ALL_WORDS.length)];
      if (c.id !== target.id && !others.some((o) => o.id === c.id)) others.push(c);
    }
    setWord(target);
    setOptions([target, ...others].sort(() => Math.random() - 0.5));
    setAnsweredId(null);
  };

  useEffect(() => {
    nextQuestion();
  }, []);

  const handleSelect = (chosen: WordItem) => {
    if (answeredId) return;
    setAnsweredId(chosen.id);

    if (chosen.id === word.id) {
      soundManager.playCorrect();
      setScore((s) => s + 1);
      const { newProgress } = awardReward(progress, 20, 2);
      newProgress.gameHighScores.tekaMaksud = Math.max(
        newProgress.gameHighScores.tekaMaksud,
        score + 1
      );
      onUpdateProgress(newProgress);
    } else {
      soundManager.playGentleWrong();
    }
    setTimeout(nextQuestion, 1600);
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border-4 border-purple-300 shadow-xl text-center">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-black bg-purple-100 text-purple-900 px-3 py-1 rounded-full border border-purple-300">
          🧠 TEKA MAKSUD
        </span>
        <span className="bg-purple-600 text-white font-black px-3 py-1 rounded-full text-sm">
          Skor: {score}
        </span>
      </div>

      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
        Apakah perkataan yang tepat bagi maksud ini?
      </p>

      {/* Clue Box */}
      <div className="bg-purple-50 p-6 rounded-3xl border-2 border-purple-200 my-4 text-base sm:text-lg font-bold text-purple-950">
        “{word.meaning}”
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        {options.map((opt) => {
          let btnClass = 'bg-white border-2 border-slate-200 text-slate-800 hover:border-purple-400 hover:bg-purple-50';
          if (answeredId) {
            if (opt.id === word.id) btnClass = 'bg-emerald-500 border-2 border-emerald-600 text-white font-black';
            else if (opt.id === answeredId) btnClass = 'bg-rose-500 border-2 border-rose-600 text-white';
          }
          return (
            <button
              key={opt.id}
              disabled={!!answeredId}
              onClick={() => handleSelect(opt)}
              className={`py-3.5 px-4 rounded-2xl font-black text-base shadow-sm transition-all cursor-pointer ${btnClass}`}
            >
              {opt.image} {opt.word}
            </button>
          );
        })}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------- */
/* GAME 5: DENGAR & PILIH (Audio listening)                     */
/* ------------------------------------------------------------- */
const GameDengarPilih: React.FC<{ progress: UserProgress; onUpdateProgress: (p: UserProgress) => void }> = ({
  progress,
  onUpdateProgress,
}) => {
  const [word, setWord] = useState<WordItem>(ALL_WORDS[0]);
  const [options, setOptions] = useState<WordItem[]>([]);
  const [score, setScore] = useState(0);
  const [answeredId, setAnsweredId] = useState<string | null>(null);

  const nextQuestion = () => {
    const target = ALL_WORDS[Math.floor(Math.random() * ALL_WORDS.length)];
    const others: WordItem[] = [];
    while (others.length < 3) {
      const c = ALL_WORDS[Math.floor(Math.random() * ALL_WORDS.length)];
      if (c.id !== target.id && !others.some((o) => o.id === c.id)) others.push(c);
    }
    setWord(target);
    setOptions([target, ...others].sort(() => Math.random() - 0.5));
    setAnsweredId(null);
    soundManager.speakMalay(target.word);
  };

  useEffect(() => {
    nextQuestion();
  }, []);

  const handleSelect = (chosen: WordItem) => {
    if (answeredId) return;
    setAnsweredId(chosen.id);

    if (chosen.id === word.id) {
      soundManager.playCorrect();
      setScore((s) => s + 1);
      const { newProgress } = awardReward(progress, 20, 2);
      newProgress.gameHighScores.dengarPilih = Math.max(
        newProgress.gameHighScores.dengarPilih,
        score + 1
      );
      onUpdateProgress(newProgress);
    } else {
      soundManager.playGentleWrong();
    }
    setTimeout(nextQuestion, 1600);
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border-4 border-emerald-300 shadow-xl text-center">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-black bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full border border-emerald-300">
          🔊 DENGAR & PILIH
        </span>
        <span className="bg-emerald-600 text-white font-black px-3 py-1 rounded-full text-sm">
          Skor: {score}
        </span>
      </div>

      <p className="text-sm font-semibold text-slate-600 mb-2">
        Tekan butang pembesar suara untuk dengar, kemudian pilih kad yang betul!
      </p>

      {/* Speaker Button */}
      <button
        onClick={() => soundManager.speakMalay(word.word)}
        className="my-6 p-6 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 text-white shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer inline-flex items-center justify-center animate-bounce"
        title="Dengar Semula"
      >
        <Volume2 className="w-12 h-12" />
      </button>

      <div className="grid grid-cols-2 gap-3 mt-4">
        {options.map((opt) => {
          let btnClass = 'bg-white border-2 border-slate-200 text-slate-800 hover:border-emerald-400 hover:bg-emerald-50';
          if (answeredId) {
            if (opt.id === word.id) btnClass = 'bg-emerald-500 border-2 border-emerald-600 text-white font-black';
            else if (opt.id === answeredId) btnClass = 'bg-rose-500 border-2 border-rose-600 text-white';
          }
          return (
            <button
              key={opt.id}
              disabled={!!answeredId}
              onClick={() => handleSelect(opt)}
              className={`py-4 px-4 rounded-2xl font-black text-lg shadow-sm transition-all cursor-pointer flex flex-col items-center gap-1 ${btnClass}`}
            >
              <span className="text-4xl">{opt.image}</span>
              <span>{opt.word}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------- */
/* GAME 6: CARI PERKATAAN (Treasure Category Hunt - Section 15)  */
/* ------------------------------------------------------------- */
const GameCariPerkataan: React.FC<{ progress: UserProgress; onUpdateProgress: (p: UserProgress) => void }> = ({
  progress,
  onUpdateProgress,
}) => {
  const [targetCategory, setTargetCategory] = useState(CATEGORIES[0]);
  const [gridItems, setGridItems] = useState<WordItem[]>([]);
  const [selectedWordIds, setSelectedWordIds] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const initGame = () => {
    const randomCat = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    const catWords = ALL_WORDS.filter((w) => w.category === randomCat.id);
    const nonCatWords = ALL_WORDS.filter((w) => w.category !== randomCat.id);

    // Pick 3 target words and 3 distractor words
    const targetPicked = [...catWords].sort(() => Math.random() - 0.5).slice(0, 3);
    const distractors = [...nonCatWords].sort(() => Math.random() - 0.5).slice(0, 3);
    const combined = [...targetPicked, ...distractors].sort(() => Math.random() - 0.5);

    setTargetCategory(randomCat);
    setGridItems(combined);
    setSelectedWordIds([]);
    setIsCompleted(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleTileClick = (item: WordItem) => {
    if (selectedWordIds.includes(item.id) || isCompleted) return;

    if (item.category === targetCategory.id) {
      soundManager.playCorrect();
      const updated = [...selectedWordIds, item.id];
      setSelectedWordIds(updated);

      // Check if all targets are found
      const totalTargets = gridItems.filter((g) => g.category === targetCategory.id).length;
      if (updated.length === totalTargets) {
        setIsCompleted(true);
        try {
          confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
        } catch (e) {}
        setScore((s) => s + 1);
        const { newProgress } = awardReward(progress, 25, 2);
        newProgress.gameHighScores.cariPerkataan = Math.max(
          newProgress.gameHighScores.cariPerkataan,
          score + 1
        );
        onUpdateProgress(newProgress);
        setTimeout(initGame, 2000);
      }
    } else {
      soundManager.playGentleWrong();
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border-4 border-cyan-300 shadow-xl text-center">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-black bg-cyan-100 text-cyan-900 px-3 py-1 rounded-full border border-cyan-300">
          🕵️ CARI PERKATAAN
        </span>
        <span className="bg-cyan-600 text-white font-black px-3 py-1 rounded-full text-sm">
          Skor: {score}
        </span>
      </div>

      <div className="bg-cyan-50 p-4 rounded-2xl border-2 border-cyan-200 mb-5">
        <p className="text-sm font-bold text-cyan-900">
          Misi Kembara: Cari semua perkataan dalam kategori{' '}
          <span className="text-lg font-black text-cyan-700 uppercase">
            {targetCategory.icon} {targetCategory.name}!
          </span>
        </p>
      </div>

      {isCompleted && (
        <div className="text-base font-black text-emerald-600 bg-emerald-50 py-2 rounded-2xl border border-emerald-300 mb-4 animate-bounce">
          🎉 Hebat! Semua perkataan kategori berjaya dijumpai!
        </div>
      )}

      {/* Grid of items */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {gridItems.map((item) => {
          const isSelected = selectedWordIds.includes(item.id);
          return (
            <button
              key={item.id}
              disabled={isSelected}
              onClick={() => handleTileClick(item)}
              className={`p-4 rounded-2xl flex flex-col items-center justify-center gap-1 font-black transition-all cursor-pointer shadow-sm border-2 ${
                isSelected
                  ? 'bg-emerald-500 border-emerald-600 text-white scale-95 shadow-inner'
                  : 'bg-white border-slate-200 text-slate-800 hover:border-cyan-400 hover:bg-cyan-50 hover:scale-105'
              }`}
            >
              <span className="text-4xl">{item.image}</span>
              <span className="text-sm font-black mt-1">{item.word}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------- */
/* GAME 7: CABARAN 60 SAAT (Speed Quiz)                         */
/* ------------------------------------------------------------- */
const GameCabaran60: React.FC<{ progress: UserProgress; onUpdateProgress: (p: UserProgress) => void }> = ({
  progress,
  onUpdateProgress,
}) => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [score, setScore] = useState(0);
  const [currentWord, setCurrentWord] = useState<WordItem>(ALL_WORDS[0]);
  const [options, setOptions] = useState<WordItem[]>([]);

  const generateQuestion = () => {
    const target = ALL_WORDS[Math.floor(Math.random() * ALL_WORDS.length)];
    const others: WordItem[] = [];
    while (others.length < 3) {
      const c = ALL_WORDS[Math.floor(Math.random() * ALL_WORDS.length)];
      if (c.id !== target.id && !others.some((o) => o.id === c.id)) others.push(c);
    }
    setCurrentWord(target);
    setOptions([target, ...others].sort(() => Math.random() - 0.5));
  };

  const startGame = () => {
    setTimeLeft(60);
    setScore(0);
    setIsActive(true);
    generateQuestion();
  };

  useEffect(() => {
    let timer: any;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      soundManager.playCorrect();
      try {
        confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
      } catch (e) {}
      const { newProgress } = awardReward(progress, score * 10, Math.floor(score / 2));
      newProgress.gameHighScores.cabaran60Saat = Math.max(
        newProgress.gameHighScores.cabaran60Saat,
        score
      );
      onUpdateProgress(newProgress);
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  const handleAnswer = (chosen: WordItem) => {
    if (chosen.id === currentWord.id) {
      soundManager.playCorrect();
      setScore((s) => s + 1);
    } else {
      soundManager.playGentleWrong();
    }
    generateQuestion();
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border-4 border-yellow-300 shadow-xl text-center">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-black bg-yellow-100 text-yellow-900 px-3 py-1 rounded-full border border-yellow-300 flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          <span>CABARAN 60 SAAT</span>
        </span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-black bg-rose-500 text-white px-3 py-1 rounded-full">
            ⏱️ {timeLeft}s
          </span>
          <span className="text-sm font-black bg-amber-400 text-amber-950 px-3 py-1 rounded-full">
            Skor: {score}
          </span>
        </div>
      </div>

      {!isActive && timeLeft === 60 ? (
        <div className="py-8">
          <span className="text-7xl block mb-4">⚡</span>
          <h3 className="text-2xl font-black font-['Fredoka'] text-slate-900 mb-2">
            Bersedia untuk Cabaran Laju?
          </h3>
          <p className="text-sm font-semibold text-slate-600 mb-6 max-w-sm mx-auto">
            Jawab sebanyak mungkin kosa kata bergambar dalam masa 60 saat untuk mengumpul XP berganda!
          </p>
          <button
            onClick={startGame}
            className="py-3.5 px-8 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 text-white font-black text-lg shadow-xl hover:scale-105 transition-all cursor-pointer"
          >
            MULA SEKARANG!
          </button>
        </div>
      ) : !isActive && timeLeft === 0 ? (
        <div className="py-8">
          <span className="text-7xl block mb-4">🏆</span>
          <h3 className="text-3xl font-black font-['Fredoka'] text-slate-900 mb-2">
            Masa Tamat!
          </h3>
          <p className="text-lg font-bold text-amber-700 mb-4">
            Tahniah! Kamu berjaya mengumpul {score} markah!
          </p>
          <button
            onClick={startGame}
            className="py-3 px-6 rounded-2xl bg-amber-400 text-amber-950 font-black text-sm shadow-md hover:bg-amber-500 transition-all cursor-pointer"
          >
            Cuba Sekali Lagi
          </button>
        </div>
      ) : (
        <div>
          <div className="text-8xl my-4 select-none animate-pulse">{currentWord.image}</div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleAnswer(opt)}
                className="py-3.5 px-4 rounded-2xl font-black text-base bg-white border-2 border-slate-200 text-slate-800 hover:border-amber-400 hover:bg-amber-50 transition-all cursor-pointer shadow-sm"
              >
                {opt.word}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/* ------------------------------------------------------------- */
/* GAME 8: RODA PERKATAAN (Spin the Wheel)                      */
/* ------------------------------------------------------------- */
const GameRodaPerkataan: React.FC<{ progress: UserProgress; onUpdateProgress: (p: UserProgress) => void }> = ({
  progress,
  onUpdateProgress,
}) => {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [prize, setPrize] = useState<{ label: string; xp: number; stars: number } | null>(null);

  const wheelSlices = [
    { label: '⭐ +3 Bintang', stars: 3, xp: 20, color: '#F59E0B' },
    { label: '⚡ +50 XP', stars: 1, xp: 50, color: '#3B82F6' },
    { label: '🌟 +5 Bintang', stars: 5, xp: 30, color: '#10B981' },
    { label: '📚 Perkataan Misteri', stars: 2, xp: 40, color: '#8B5CF6' },
    { label: '⭐ +4 Bintang', stars: 4, xp: 25, color: '#EC4899' },
    { label: '⚡ +100 XP Super', stars: 3, xp: 100, color: '#F97316' },
  ];

  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);
    setPrize(null);
    soundManager.playWheelTick();

    const randomDegrees = 1800 + Math.floor(Math.random() * 360);
    const newRotation = rotation + randomDegrees;
    setRotation(newRotation);

    setTimeout(() => {
      setSpinning(false);
      soundManager.playCorrect();
      try {
        confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
      } catch (e) {}

      // Calculate winning slice
      const actualDegrees = (newRotation % 360);
      const sliceSize = 360 / wheelSlices.length;
      const index = Math.floor((360 - actualDegrees) / sliceSize) % wheelSlices.length;
      const won = wheelSlices[index];
      setPrize(won);

      const { newProgress } = awardReward(progress, won.xp, won.stars);
      newProgress.gameHighScores.rodaSpins += 1;
      onUpdateProgress(newProgress);
    }, 3500);
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border-4 border-fuchsia-300 shadow-xl text-center">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-black bg-fuchsia-100 text-fuchsia-900 px-3 py-1 rounded-full border border-fuchsia-300">
          🎲 RODA PERKATAAN
        </span>
        <span className="text-xs font-black bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
          Putaran: {progress.gameHighScores.rodaSpins}
        </span>
      </div>

      <p className="text-sm font-semibold text-slate-600 mb-6">
        Putar roda ajaib untuk memenangi ganjaran bintang & perkataan misteri!
      </p>

      {/* Wheel Visual Graphic */}
      <div className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto my-4 flex items-center justify-center">
        {/* Pointer Arrow */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[28px] border-t-rose-600 drop-shadow-md" />

        {/* Wheel SVG */}
        <div
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: spinning ? 'transform 3.5s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
          }}
          className="w-full h-full rounded-full shadow-2xl border-6 border-amber-300 overflow-hidden relative"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {wheelSlices.map((slice, i) => {
              const angle = 360 / wheelSlices.length;
              const startAngle = (i * angle * Math.PI) / 180;
              const endAngle = ((i + 1) * angle * Math.PI) / 180;
              const x1 = 50 + 50 * Math.cos(startAngle);
              const y1 = 50 + 50 * Math.sin(startAngle);
              const x2 = 50 + 50 * Math.cos(endAngle);
              const y2 = 50 + 50 * Math.sin(endAngle);

              return (
                <path
                  key={i}
                  d={`M50,50 L${x1},${y1} A50,50 0 0,1 ${x2},${y2} Z`}
                  fill={slice.color}
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-16 h-16 rounded-full bg-white border-4 border-amber-400 shadow-md flex items-center justify-center text-2xl font-black">
              🦉
            </div>
          </div>
        </div>
      </div>

      {prize && (
        <div className="my-4 p-4 bg-amber-50 rounded-2xl border-2 border-amber-300 text-amber-950 font-black text-lg animate-bounce">
          🎉 TAHNIAH! Kamu memenangi: {prize.label}!
        </div>
      )}

      <button
        disabled={spinning}
        onClick={handleSpin}
        className={`mt-4 py-3.5 px-8 rounded-2xl font-black text-lg shadow-xl transition-all cursor-pointer ${
          spinning
            ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-fuchsia-500 to-rose-500 text-white hover:scale-105 active:scale-95'
        }`}
      >
        {spinning ? 'Roda Sedang Berputar...' : 'PUTAR RODA SEKARANG! 🎲'}
      </button>
    </div>
  );
};
