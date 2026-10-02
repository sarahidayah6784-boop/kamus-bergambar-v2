import React from 'react';
import { ACHIEVEMENTS } from '../data/achievements';
import { UserProgress } from '../types';
import { soundManager } from '../utils/audio';
import { Award, CheckCircle2, Lock, X } from 'lucide-react';

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({
  isOpen,
  onClose,
  progress,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl border-4 border-yellow-300 shadow-2xl max-w-2xl w-full p-6 sm:p-8 flex flex-col max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-yellow-100">
          <div className="flex items-center gap-2.5">
            <span className="text-3xl">🏅</span>
            <div>
              <h3 className="text-2xl font-black font-['Fredoka'] text-slate-900">
                Peti Lencana Kejayaan
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-slate-600">
                {progress.unlockedAchievementIds.length} daripada {ACHIEVEMENTS.length} lencana dibuka!
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playTap();
              onClose();
            }}
            className="p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Badges Grid */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-1">
          {ACHIEVEMENTS.map((ach) => {
            const isUnlocked = progress.unlockedAchievementIds.includes(ach.id);

            return (
              <div
                key={ach.id}
                className={`p-4 rounded-2xl border-2 flex items-center justify-between gap-4 transition-all ${
                  isUnlocked
                    ? 'bg-amber-50 border-amber-300 shadow-sm'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm ${
                      isUnlocked
                        ? 'bg-amber-400 text-amber-950 border-2 border-white'
                        : 'bg-slate-200 text-slate-400'
                    }`}
                  >
                    {ach.icon}
                  </div>

                  <div>
                    <h4 className="text-base font-black font-['Fredoka'] text-slate-900">
                      {ach.title}
                    </h4>
                    <p className="text-xs font-semibold text-slate-600">
                      {ach.description}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  {isUnlocked ? (
                    <span className="inline-flex items-center gap-1 text-xs font-black text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Dibuka</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                      <Lock className="w-3.5 h-3.5" />
                      <span>+{ach.xpReward} XP</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
