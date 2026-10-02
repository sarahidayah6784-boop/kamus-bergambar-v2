import React, { useState } from 'react';
import { soundManager } from '../utils/audio';

interface CikguCeriMascotProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  mood?: 'happy' | 'cheering' | 'thinking' | 'teaching';
  interactive?: boolean;
  onTap?: () => void;
  className?: string;
}

export const CikguCeriMascot: React.FC<CikguCeriMascotProps> = ({
  message,
  size = 'md',
  mood = 'happy',
  interactive = true,
  onTap,
  className = '',
}) => {
  const [bubbleText, setBubbleText] = useState<string>(
    message || 'Hai! Saya Cikgu Ceri! 🦉 Jom belajar perkataan baharu!'
  );
  const [isWiggling, setIsWiggling] = useState(false);

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24 sm:w-28 sm:h-28',
    lg: 'w-36 h-36 sm:w-44 sm:h-44',
  };

  const friendlyQuotes = [
    'Wah! Hebatnya kamu! 🌟',
    'Jom sebut bersama Cikgu Ceri! 📢',
    'Kamu anak yang sangat pintar! 🧠✨',
    'Cuba lagi, kamu pasti boleh! 💪⭐',
    'Hoot-hoot! Bahasa Melayu itu indah! 🦉🌸',
  ];

  const handleMascotClick = () => {
    setIsWiggling(true);
    soundManager.playTap();
    const randomQuote = friendlyQuotes[Math.floor(Math.random() * friendlyQuotes.length)];
    setBubbleText(randomQuote);
    soundManager.speakMalay(randomQuote);
    if (onTap) onTap();
    setTimeout(() => setIsWiggling(false), 600);
  };

  return (
    <div className={`relative inline-flex items-center gap-3 ${className}`}>
      {/* Speech bubble */}
      {(message || bubbleText) && (
        <div className="relative bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border-2 border-amber-300 text-slate-800 text-sm sm:text-base font-bold max-w-xs transition-all duration-300 animate-fade-in z-10">
          <p className="flex items-center gap-1.5 leading-snug">
            {message || bubbleText}
          </p>
          {/* Bubble tail */}
          <div className="absolute -bottom-2 left-6 w-3 h-3 bg-white border-r-2 border-b-2 border-amber-300 rotate-45" />
        </div>
      )}

      {/* Mascot illustration */}
      <button
        type="button"
        disabled={!interactive}
        onClick={handleMascotClick}
        aria-label="Cikgu Ceri Burung Hantu"
        className={`${sizeClasses[size]} relative transition-transform duration-300 ${
          interactive ? 'cursor-pointer hover:scale-110 active:scale-95' : ''
        } ${isWiggling ? 'animate-bounce' : ''}`}
      >
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full drop-shadow-xl"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Owl Body */}
          <ellipse cx="60" cy="68" rx="42" ry="46" fill="#F59E0B" />
          <ellipse cx="60" cy="74" rx="32" ry="36" fill="#FDE68A" />

          {/* Feathers belly pattern */}
          <path d="M52 64 Q60 70 68 64" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M46 76 Q60 84 74 76" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M50 88 Q60 94 70 88" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />

          {/* Ears/Tufts */}
          <polygon points="30,36 18,12 46,26" fill="#D97706" />
          <polygon points="90,36 102,12 74,26" fill="#D97706" />
          <polygon points="32,32 24,18 42,26" fill="#F59E0B" />
          <polygon points="88,32 96,18 78,26" fill="#F59E0B" />

          {/* Wings */}
          <ellipse cx="20" cy="72" rx="14" ry="24" fill="#D97706" transform="rotate(12 20 72)" />
          <ellipse cx="100" cy="72" rx="14" ry="24" fill="#D97706" transform="rotate(-12 100 72)" />

          {/* Big Owl Eyes Background */}
          <circle cx="43" cy="50" r="19" fill="#FFFFFF" stroke="#FBBF24" strokeWidth="3" />
          <circle cx="77" cy="50" r="19" fill="#FFFFFF" stroke="#FBBF24" strokeWidth="3" />

          {/* Eye Iris */}
          <circle cx="45" cy="50" r="11" fill="#3B82F6" />
          <circle cx="75" cy="50" r="11" fill="#3B82F6" />

          {/* Pupil */}
          <circle cx="46" cy="50" r="6" fill="#0F172A" />
          <circle cx="74" cy="50" r="6" fill="#0F172A" />

          {/* Eye Sparkles */}
          <circle cx="48" cy="47" r="2.5" fill="#FFFFFF" />
          <circle cx="76" cy="47" r="2.5" fill="#FFFFFF" />
          <circle cx="43" cy="53" r="1.2" fill="#FFFFFF" />
          <circle cx="71" cy="53" r="1.2" fill="#FFFFFF" />

          {/* Cute Rosy Cheeks */}
          <ellipse cx="30" cy="62" rx="6" ry="4" fill="#F43F5E" fillOpacity="0.6" />
          <ellipse cx="90" cy="62" rx="6" ry="4" fill="#F43F5E" fillOpacity="0.6" />

          {/* Beak */}
          <polygon points="60,56 52,66 68,66" fill="#EA580C" />

          {/* Graduation Scholar Cap (Cikgu) */}
          <polygon points="60,10 100,24 60,34 20,24" fill="#4F46E5" />
          <rect x="42" y="27" width="36" height="10" rx="3" fill="#3730A3" />
          {/* Gold Tassel */}
          <line x1="60" y1="24" x2="88" y2="30" stroke="#F59E0B" strokeWidth="2.5" />
          <circle cx="88" cy="32" r="3" fill="#F59E0B" />

          {/* Feet */}
          <ellipse cx="48" cy="112" rx="7" ry="4" fill="#EA580C" />
          <ellipse cx="72" cy="112" rx="7" ry="4" fill="#EA580C" />
        </svg>

        {/* Glow badge */}
        <span className="absolute -bottom-1 -right-1 bg-amber-400 text-amber-950 text-[10px] font-black px-2 py-0.5 rounded-full shadow-md border border-white">
          CIKGU
        </span>
      </button>
    </div>
  );
};
