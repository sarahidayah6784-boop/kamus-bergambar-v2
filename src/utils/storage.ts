import { UserProgress, AgeGroup, WorldId } from '../types';
import { ACHIEVEMENTS } from '../data/achievements';
import { soundManager } from './audio';
import confetti from 'canvas-confetti';

const STORAGE_KEY = 'kamus_ceria_ai_progress_v2';

export const DEFAULT_PROGRESS: UserProgress = {
  childName: 'Adik Bijak',
  ageGroup: '6-8',
  currentWorld: 'world-2',
  xp: 320,
  stars: 18,
  streak: 3,
  level: 2,
  lastActiveDate: new Date().toISOString().split('T')[0],
  learnedWordIds: ['kucing', 'epal', 'rumah', 'buku', 'kereta', 'mata'],
  favoriteWordIds: ['kucing', 'pelangi', 'bintang'],
  unlockedAchievementIds: ['pembaca-cilik'],
  quizStats: {
    totalAnswered: 12,
    totalCorrect: 11,
    quizzesCompleted: 4,
  },
  gameHighScores: {
    tekaGambar: 6,
    susunHuruf: 4,
    padankan: 5,
    tekaMaksud: 4,
    dengarPilih: 5,
    cariPerkataan: 6,
    cabaran60Saat: 8,
    rodaSpins: 3,
  },
  categoryMastery: {
    haiwan: 6,
    makanan: 4,
    rumah: 3,
    sekolah: 4,
    warna: 4,
  },
  mapProgress: {
    currentZoneId: 'zone-1',
    completedMissions: ['m1-1'],
  },
  soundEnabled: true,
  parentPin: '1234',
};

export function loadProgress(): UserProgress {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveProgress(DEFAULT_PROGRESS);
      return DEFAULT_PROGRESS;
    }
    const parsed = JSON.parse(raw);
    const progress: UserProgress = { ...DEFAULT_PROGRESS, ...parsed };

    // Update streak check
    const today = new Date().toISOString().split('T')[0];
    if (progress.lastActiveDate !== today) {
      const lastDate = new Date(progress.lastActiveDate);
      const currentDate = new Date(today);
      const diffDays = Math.round((currentDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        progress.streak += 1;
      } else if (diffDays > 1) {
        progress.streak = 1;
      }
      progress.lastActiveDate = today;
      saveProgress(progress);
    }

    soundManager.setSoundEnabled(progress.soundEnabled);
    return progress;
  } catch (err) {
    console.error('Error loading progress:', err);
    return DEFAULT_PROGRESS;
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (err) {
    console.error('Error saving progress:', err);
  }
}

// Reward user with XP and Stars, and check for level-ups and badges
export function awardReward(
  progress: UserProgress,
  xpEarned: number,
  starsEarned: number
): {
  newProgress: UserProgress;
  leveledUp: boolean;
  newAchievements: string[];
} {
  const newProgress = { ...progress };
  newProgress.xp += xpEarned;
  newProgress.stars += starsEarned;

  // Calculate Level (100 XP per level tier with friendly curve)
  const currentLevel = Math.floor(newProgress.xp / 150) + 1;
  let leveledUp = false;
  if (currentLevel > newProgress.level) {
    newProgress.level = currentLevel;
    leveledUp = true;
    soundManager.playLevelUp();
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {}
  } else if (starsEarned > 0) {
    soundManager.playStar();
  }

  // Check achievements
  const newAchievements: string[] = [];
  ACHIEVEMENTS.forEach((ach) => {
    if (!newProgress.unlockedAchievementIds.includes(ach.id)) {
      if (ach.condition(newProgress)) {
        newProgress.unlockedAchievementIds.push(ach.id);
        newProgress.xp += ach.xpReward;
        newAchievements.push(ach.title);
      }
    }
  });

  saveProgress(newProgress);
  return { newProgress, leveledUp, newAchievements };
}

// Mark a word as learned
export function markWordLearned(progress: UserProgress, wordId: string, category: string): UserProgress {
  if (progress.learnedWordIds.includes(wordId)) return progress;

  const updatedLearned = [...progress.learnedWordIds, wordId];
  const updatedMastery = {
    ...progress.categoryMastery,
    [category]: (progress.categoryMastery[category] || 0) + 1,
  };

  const updated: UserProgress = {
    ...progress,
    learnedWordIds: updatedLearned,
    categoryMastery: updatedMastery,
  };

  const { newProgress } = awardReward(updated, 15, 1);
  return newProgress;
}

// Toggle favorite word
export function toggleFavoriteWord(progress: UserProgress, wordId: string): UserProgress {
  let updatedFavorites: string[];
  if (progress.favoriteWordIds.includes(wordId)) {
    updatedFavorites = progress.favoriteWordIds.filter((id) => id !== wordId);
  } else {
    updatedFavorites = [...progress.favoriteWordIds, wordId];
    soundManager.playStar();
  }

  const updated = {
    ...progress,
    favoriteWordIds: updatedFavorites,
  };
  saveProgress(updated);
  return updated;
}
