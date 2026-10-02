import React, { useState } from 'react';
import { LEARNING_MAP_ZONES } from '../data/learningMap';
import { UserProgress, MapMission } from '../types';
import { soundManager } from '../utils/audio';
import { awardReward } from '../utils/storage';
import confetti from 'canvas-confetti';
import { Compass, CheckCircle2, Lock, Star, Sparkles, Play } from 'lucide-react';

interface AdventureMapProps {
  progress: UserProgress;
  onUpdateProgress: (p: UserProgress) => void;
  onSelectCategory: (category: string) => void;
}

export const AdventureMap: React.FC<AdventureMapProps> = ({
  progress,
  onUpdateProgress,
  onSelectCategory,
}) => {
  const [selectedMission, setSelectedMission] = useState<MapMission | null>(null);

  const handleCompleteMission = (mission: MapMission) => {
    if (progress.mapProgress.completedMissions.includes(mission.id)) return;

    soundManager.playCorrect();
    try {
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
    } catch (e) {}

    const updated = {
      ...progress,
      mapProgress: {
        ...progress.mapProgress,
        completedMissions: [...progress.mapProgress.completedMissions, mission.id],
      },
    };

    const { newProgress } = awardReward(updated, mission.rewardXp, mission.rewardStars);
    onUpdateProgress(newProgress);
    setSelectedMission(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
      {/* Header */}
      <div className="text-center mb-8">
        <span className="text-5xl inline-block animate-pulse">🗺️</span>
        <h2 className="text-3xl sm:text-4xl font-black font-['Fredoka'] text-slate-900 mt-2">
          Peta Kembara Bahasa
        </h2>
        <p className="text-sm sm:text-base font-semibold text-slate-600 max-w-xl mx-auto">
          Terokai 5 stesen kembara, selesaikan misi, dan kumpulkan bintang untuk bergelar Wira Kamus Ceria!
        </p>
      </div>

      {/* Map Trail Zones */}
      <div className="space-y-6 relative">
        {/* Connecting line */}
        <div className="hidden md:block absolute left-12 top-10 bottom-10 w-2 bg-gradient-to-b from-amber-400 via-emerald-400 to-purple-500 rounded-full -z-0 opacity-50" />

        {LEARNING_MAP_ZONES.map((zone, zIdx) => {
          const isZoneLocked = progress.stars < (zone.missions[0]?.requiredStars || 0);

          return (
            <div
              key={zone.id}
              className={`relative z-10 rounded-3xl p-6 sm:p-8 border-4 transition-all ${
                isZoneLocked
                  ? 'bg-slate-100/70 border-slate-300 opacity-60'
                  : `${zone.bgGradient} border-amber-300 shadow-lg`
              }`}
            >
              {/* Zone title header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-3 border-b-2 border-amber-200/60">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center text-3xl border-2 border-amber-300">
                    {zone.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black font-['Fredoka'] text-slate-900">
                      Stesen {zIdx + 1}: {zone.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-bold text-slate-600">
                      {zone.subtitle}
                    </p>
                  </div>
                </div>

                {isZoneLocked ? (
                  <span className="flex items-center gap-1.5 text-xs font-black text-rose-600 bg-rose-50 px-3 py-1.5 rounded-full border border-rose-200 w-fit">
                    <Lock className="w-4 h-4" />
                    <span>Perlu {zone.missions[0].requiredStars} ⭐ untuk dibuka</span>
                  </span>
                ) : (
                  <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-full border border-emerald-300 w-fit">
                    🌟 Stesen Dibuka
                  </span>
                )}
              </div>

              {/* Missions in this zone */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {zone.missions.map((m) => {
                  const isDone = progress.mapProgress.completedMissions.includes(m.id);
                  const isMissionLocked = progress.stars < m.requiredStars;

                  return (
                    <div
                      key={m.id}
                      onClick={() => {
                        if (!isMissionLocked) {
                          soundManager.playTap();
                          setSelectedMission(m);
                        }
                      }}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                        isDone
                          ? 'bg-emerald-50 border-emerald-300 shadow-xs'
                          : isMissionLocked
                          ? 'bg-slate-200/50 border-slate-300 cursor-not-allowed'
                          : 'bg-white border-amber-200 hover:border-amber-400 hover:shadow-md'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-2xl">{m.icon}</span>
                          {isDone ? (
                            <span className="text-xs font-black text-emerald-600 flex items-center gap-1">
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Selesai</span>
                            </span>
                          ) : isMissionLocked ? (
                            <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                              <Lock className="w-3.5 h-3.5" />
                              <span>{m.requiredStars} ⭐</span>
                            </span>
                          ) : (
                            <span className="text-xs font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                              Sedia
                            </span>
                          )}
                        </div>

                        <h4 className="text-base font-black font-['Fredoka'] text-slate-800 mb-1">
                          {m.title}
                        </h4>
                        <p className="text-xs font-semibold text-slate-600 line-clamp-2">
                          {m.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-black">
                        <span className="text-sky-700">+{m.rewardXp} XP</span>
                        <span className="text-amber-600">+{m.rewardStars} ⭐</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Mission Modal */}
      {selectedMission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl border-4 border-amber-300 shadow-2xl max-w-md w-full p-6 text-center">
            <span className="text-6xl my-2 block">{selectedMission.icon}</span>
            <h3 className="text-2xl font-black font-['Fredoka'] text-slate-900 mb-1">
              {selectedMission.title}
            </h3>
            <p className="text-sm font-semibold text-slate-600 mb-4">
              {selectedMission.description}
            </p>

            <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200 text-xs font-black text-amber-900 mb-6 flex justify-around">
              <span>Ganjaran: +{selectedMission.rewardXp} XP</span>
              <span>+{selectedMission.rewardStars} Bintang ⭐</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  onSelectCategory(selectedMission.targetCategory);
                  setSelectedMission(null);
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-black text-sm shadow-md cursor-pointer"
              >
                Teroka Kategori Ini
              </button>

              <button
                onClick={() => handleCompleteMission(selectedMission)}
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm shadow-md cursor-pointer"
              >
                Selesai Misi
              </button>
            </div>

            <button
              onClick={() => setSelectedMission(null)}
              className="mt-3 text-xs font-bold text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
