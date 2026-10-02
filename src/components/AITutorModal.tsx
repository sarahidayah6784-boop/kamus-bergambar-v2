import React, { useState } from 'react';
import { CikguCeriMascot } from './CikguCeriMascot';
import { AgeGroup } from '../types';
import { soundManager } from '../utils/audio';
import { getLocalTutorReply } from '../utils/aiFallback';
import { X, Send, Sparkles, Volume2, MessageSquare } from 'lucide-react';

interface AITutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  ageGroup: AgeGroup;
}

interface Message {
  sender: 'user' | 'cikgu';
  text: string;
}

export const AITutorModal: React.FC<AITutorModalProps> = ({
  isOpen,
  onClose,
  ageGroup,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'cikgu',
      text: 'Hai sayang! Saya Cikgu Ceri AI! 🦉 Ada sebarang perkataan yang adik ingin tahu maksudnya atau cara mengejanya hari ini?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const quickQuestions = [
    'Apa maksud rajin?',
    'Bagaimana nak eja rama-rama?',
    'Beri contoh ayat untuk gembira',
    'Ceritakan tentang gajah',
    'Apa itu bersopan santun?',
  ];

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    soundManager.playTap();
    const newMessages: Message[] = [...messages, { sender: 'user', text: query }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      // Try backend if available (AI Studio / Express) with a short timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const res = await fetch('/api/ai/ask-cikgu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query, ageGroup }),
        signal: controller.signal,
      }).catch(() => null);

      clearTimeout(timeoutId);

      let replyText = '';
      if (res && res.ok) {
        const data = await res.json().catch(() => null);
        replyText = data?.reply || '';
      }

      // If backend did not reply or returned non-ok (GitHub Pages static environment)
      if (!replyText) {
        replyText = getLocalTutorReply(query, ageGroup);
      }

      setMessages((prev) => [...prev, { sender: 'cikgu', text: replyText }]);
      soundManager.speakMalay(replyText);
    } catch (err) {
      const fallbackReply = getLocalTutorReply(query, ageGroup);
      setMessages((prev) => [...prev, { sender: 'cikgu', text: fallbackReply }]);
      soundManager.speakMalay(fallbackReply);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl border-4 border-amber-300 shadow-2xl max-w-xl w-full flex flex-col h-[600px] max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-400 via-pink-400 to-rose-400 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-3xl">🦉</span>
            <div>
              <h3 className="text-xl font-black font-['Fredoka'] leading-tight">
                Cikgu Ceri AI
              </h3>
              <p className="text-xs font-bold text-amber-950 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Rakan Tutor Pintar (Umur {ageGroup} Thn)</span>
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

        {/* Chat message list */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-amber-50/40">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2.5 ${
                m.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {m.sender === 'cikgu' && (
                <div className="w-9 h-9 rounded-full bg-amber-400 flex items-center justify-center text-lg shrink-0 shadow-sm">
                  🦉
                </div>
              )}

              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm sm:text-base font-semibold shadow-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-tr-none'
                    : 'bg-white border-2 border-amber-200 text-slate-800 rounded-tl-none'
                }`}
              >
                <p>{m.text}</p>
                {m.sender === 'cikgu' && (
                  <button
                    onClick={() => soundManager.speakMalay(m.text)}
                    className="mt-1.5 flex items-center gap-1 text-[11px] font-bold text-amber-700 hover:text-amber-900 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Dengar Suara Cikgu</span>
                  </button>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs font-bold text-amber-700 bg-white p-2.5 rounded-2xl border border-amber-200 w-fit">
              <span className="animate-spin">🦉</span>
              <span>Cikgu Ceri sedang berfikir...</span>
            </div>
          )}
        </div>

        {/* Quick Suggestion Pills */}
        <div className="p-2.5 bg-white border-t border-amber-100 overflow-x-auto flex gap-1.5 no-scrollbar">
          {quickQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              className="px-2.5 py-1 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-xs whitespace-nowrap transition-colors cursor-pointer border border-amber-300"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-amber-200 flex items-center gap-2">
          <input
            type="text"
            placeholder="Tanya Cikgu Ceri apa-apa soalan..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-amber-50 border-2 border-amber-300 rounded-2xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:border-amber-500"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || loading}
            className="p-3 rounded-2xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-black shadow-md cursor-pointer transition-all"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
