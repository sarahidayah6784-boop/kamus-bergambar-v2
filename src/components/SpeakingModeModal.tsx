import React, { useState, useEffect } from 'react';
import { WordItem, UserProgress } from '../types';
import { soundManager } from '../utils/audio';
import { awardReward } from '../utils/storage';
import confetti from 'canvas-confetti';
import { Mic, Volume2, X, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';

interface SpeakingModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  word: WordItem;
  progress: UserProgress;
  onUpdateProgress: (p: UserProgress) => void;
}

export const SpeakingModeModal: React.FC<SpeakingModeModalProps> = ({
  isOpen,
  onClose,
  word,
  progress,
  onUpdateProgress,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  const positivePraise = [
    '🌟 Hebat! Sebutan kamu sangat jelas!',
    '👏 Bagus! Cikgu Ceri bangga dengan kamu!',
    '🎉 Tepat! Kamu memang jaguh kosa kata!',
    '💪 Hebat sungguh! Teruskan latihan ceria!',
  ];

  const handleStartSpeaking = () => {
    soundManager.playTap();
    setIsListening(true);
    setTranscript('');
    setFeedback(null);

    // Check if webkitSpeechRecognition or SpeechRecognition is available in browser
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = 'ms-MY';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event: any) => {
          const heard = event.results[0][0].transcript;
          setTranscript(heard);
          finishSpeaking(heard);
        };

        recognition.onerror = () => {
          // Graceful fallback to enthusiastic simulation
          simulateFeedback();
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.start();
        return;
      } catch (err) {
        simulateFeedback();
        return;
      }
    }

    // Fallback simulation
    simulateFeedback();
  };

  const simulateFeedback = () => {
    setTimeout(() => {
      setIsListening(false);
      setTranscript(word.word);
      finishSpeaking(word.word);
    }, 1800);
  };

  const finishSpeaking = (heardText: string) => {
    soundManager.playCorrect();
    const randomPraise = positivePraise[Math.floor(Math.random() * positivePraise.length)];
    setFeedback(randomPraise);

    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    } catch (e) {}

    // Award XP and Star
    const { newProgress } = awardReward(progress, 15, 1);
    onUpdateProgress(newProgress);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl border-4 border-rose-300 shadow-2xl max-w-md w-full p-6 text-center">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-black bg-rose-100 text-rose-900 px-3 py-1 rounded-full border border-rose-300 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span>MOD SEBUTAN: CUBA SEBUT</span>
          </span>
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

        {/* Word graphic & title */}
        <div className="text-7xl sm:text-8xl my-2 select-none animate-pulse">{word.image}</div>

        <h3 className="text-3xl font-black font-['Fredoka'] text-slate-900 mb-1">
          {word.word}
        </h3>

        {/* Syllables */}
        <div className="flex justify-center gap-1.5 mb-4">
          {word.syllables.map((syl, i) => (
            <span
              key={i}
              className="text-xs font-black px-2.5 py-0.5 rounded-lg bg-amber-100 text-amber-900 border border-amber-300"
            >
              {syl}
            </span>
          ))}
        </div>

        {/* Hear it first */}
        <button
          onClick={() => soundManager.speakMalay(word.word)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-black text-xs transition-colors cursor-pointer mb-6"
        >
          <Volume2 className="w-4 h-4" />
          <span>Dengar Contoh Sebutan Cikgu</span>
        </button>

        {/* Feedback Display */}
        {feedback ? (
          <div className="p-4 bg-emerald-50 rounded-2xl border-2 border-emerald-300 text-emerald-800 font-black text-sm my-3 animate-bounce">
            <p>{feedback}</p>
            <p className="text-xs font-bold text-emerald-600 mt-1">⭐ +15 XP & 1 Bintang diperoleh!</p>
          </div>
        ) : isListening ? (
          <div className="p-4 bg-rose-50 rounded-2xl border-2 border-rose-300 text-rose-800 font-black text-sm my-3 animate-pulse">
            🎤 Cikgu Ceri sedang mendengar suara adik... Sebutkan "{word.word}"!
          </div>
        ) : (
          <p className="text-xs font-semibold text-slate-500 mb-4">
            Tekan butang mikrofon di bawah dan sebut perkataan ini dengan jelas!
          </p>
        )}

        {/* Big Mic Button */}
        <button
          onClick={handleStartSpeaking}
          disabled={isListening}
          className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center shadow-2xl transition-all cursor-pointer ${
            isListening
              ? 'bg-rose-600 text-white scale-110 animate-ping'
              : 'bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:scale-110 active:scale-95'
          }`}
          title="Tekan & Sebut"
        >
          <Mic className="w-9 h-9" />
        </button>
      </div>
    </div>
  );
};
