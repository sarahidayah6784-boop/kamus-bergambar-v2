import React, { useState, useRef } from 'react';
import { soundManager } from '../utils/audio';
import { AgeGroup } from '../types';
import { getLocalObjectResult } from '../utils/aiFallback';
import confetti from 'canvas-confetti';
import { Camera, Upload, X, Sparkles, Volume2, Image as ImageIcon } from 'lucide-react';

interface ImageToWordModalProps {
  isOpen: boolean;
  onClose: () => void;
  ageGroup: AgeGroup;
}

export const ImageToWordModal: React.FC<ImageToWordModalProps> = ({
  isOpen,
  onClose,
  ageGroup,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    word: string;
    category: string;
    syllables: string[];
    meaning: string;
    exampleSentence: string;
    cheer: string;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Preset sample objects for quick test
  const sampleObjects = [
    { name: 'Pisang', emoji: '🍌', color: '#FEF08A' },
    { name: 'Kucing', emoji: '🐱', color: '#FED7AA' },
    { name: 'Epal', emoji: '🍎', color: '#FECDD3' },
    { name: 'Bola', emoji: '⚽', color: '#E2E8F0' },
    { name: 'Basikal', emoji: '🚲', color: '#BAE6FD' },
    { name: 'Bunga', emoji: '🌺', color: '#FBCFE8' },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setSelectedImage(base64);
      analyzeImage(base64, file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleSelectSample = (sample: (typeof sampleObjects)[0]) => {
    soundManager.playTap();
    // Create canvas snapshot of sample emoji to produce valid base64
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = sample.color;
      ctx.fillRect(0, 0, 200, 200);
      ctx.font = '100px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(sample.emoji, 100, 105);
    }
    const dataUrl = canvas.toDataURL('image/jpeg');
    setSelectedImage(dataUrl);
    analyzeImage(dataUrl, sample.name);
  };

  const analyzeImage = async (base64Data: string, sampleHint?: string) => {
    setAnalyzing(true);
    setResult(null);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const res = await fetch('/api/ai/identify-object', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: base64Data, ageGroup }),
        signal: controller.signal,
      }).catch(() => null);

      clearTimeout(timeoutId);

      let finalResult = null;
      if (res && res.ok) {
        finalResult = await res.json().catch(() => null);
      }

      // If backend is not available (GitHub Pages static environment)
      if (!finalResult || !finalResult.word) {
        finalResult = getLocalObjectResult(sampleHint);
      }

      setResult(finalResult);
      soundManager.playCorrect();
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      } catch (e) {}
      if (finalResult.word) {
        soundManager.speakMalay(`Ini ialah ${finalResult.word}! ${finalResult.meaning}`);
      }
    } catch (err) {
      const fallback = getLocalObjectResult(sampleHint);
      setResult(fallback);
      soundManager.speakMalay(`Ini ialah ${fallback.word}!`);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl border-4 border-emerald-300 shadow-2xl max-w-xl w-full flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">📷</span>
            <div>
              <h3 className="text-xl font-black font-['Fredoka']">
                Apa Benda Ini? (AI Vision)
              </h3>
              <p className="text-xs font-bold text-emerald-100 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Cikgu Ceri mengecam objek dalam gambar</span>
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundManager.playTap();
              onClose();
            }}
            className="p-2 rounded-2xl bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4">
          {/* Upload or Camera Button */}
          <div className="flex gap-2">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 py-3 px-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 hover:bg-emerald-100 text-emerald-900 font-black text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
            >
              <Upload className="w-4 h-4 text-emerald-600" />
              <span>Muat Naik / Ambil Gambar</span>
            </button>
          </div>

          {/* Quick Preset Samples */}
          <div>
            <p className="text-xs font-bold text-slate-500 mb-2">
              Atau cuba salah satu objek contoh ini:
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {sampleObjects.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectSample(s)}
                  className="p-2.5 rounded-2xl bg-slate-50 border-2 border-slate-200 hover:border-emerald-400 hover:scale-105 transition-all text-center cursor-pointer"
                >
                  <div className="text-3xl">{s.emoji}</div>
                  <div className="text-[11px] font-black text-slate-700 mt-1">{s.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Image Preview & Analysis Status */}
          {selectedImage && (
            <div className="text-center p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <img
                src={selectedImage}
                alt="Selected"
                className="max-h-48 mx-auto rounded-xl shadow-md object-contain"
              />
              {analyzing && (
                <div className="mt-3 flex items-center justify-center gap-2 text-sm font-black text-emerald-700">
                  <span className="animate-spin text-xl">🦉</span>
                  <span>Cikgu Ceri sedang memerhati objek ini...</span>
                </div>
              )}
            </div>
          )}

          {/* AI Result Card */}
          {result && (
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-5 rounded-3xl border-3 border-emerald-300 text-center animate-fade-in shadow-sm">
              <span className="text-xs font-black bg-emerald-200 text-emerald-900 px-3 py-1 rounded-full uppercase">
                {result.category}
              </span>

              <h2 className="text-3xl font-black text-slate-900 font-['Fredoka'] mt-2 mb-1">
                {result.word}
              </h2>

              {/* Syllables */}
              {result.syllables && result.syllables.length > 0 && (
                <div className="flex justify-center gap-1.5 my-2">
                  {result.syllables.map((syl, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-lg bg-white border border-emerald-200 text-xs font-black text-emerald-800"
                    >
                      {syl}
                    </span>
                  ))}
                </div>
              )}

              <p className="text-sm font-semibold text-slate-700 my-2">{result.meaning}</p>

              <div className="bg-white/80 p-2.5 rounded-2xl border border-emerald-200 text-xs italic font-semibold text-emerald-950 my-2">
                “{result.exampleSentence}”
              </div>

              <div className="flex items-center justify-center gap-2 mt-3">
                <button
                  onClick={() => soundManager.speakMalay(result.word)}
                  className="py-2 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Dengar Sebutan</span>
                </button>
              </div>

              <p className="text-xs font-bold text-emerald-800 mt-3 bg-white p-2 rounded-xl border border-emerald-100">
                🦉 {result.cheer}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
