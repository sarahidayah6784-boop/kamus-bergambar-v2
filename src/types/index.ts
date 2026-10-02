export type WorldId = 'world-1' | 'world-2' | 'world-3';

export type AgeGroup = '3-5' | '6-8' | '9-12';

export interface WordItem {
  id: string;
  word: string;
  category: string;
  level: 1 | 2 | 3; // 1 = 3-5yo, 2 = 6-8yo, 3 = 9-12yo
  syllables: string[];
  meaning: string;
  exampleSentence: string;
  image: string; // Emoji or visual icon
  pronunciation?: string;
  synonym?: string[];
  antonym?: string[];
  partOfSpeech?: 'Kata Nama' | 'Kata Kerja' | 'Kata Adjektif' | 'Kata Tugas';
  funFact?: string;
}

export interface CategoryInfo {
  id: string;
  name: string;
  englishName: string;
  icon: string;
  color: string;
  bgLight: string;
  borderLight: string;
  textLight: string;
  gradient: string;
  description: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  condition: (progress: UserProgress) => boolean;
  unlockedAt?: string;
}

export interface UserProgress {
  childName: string;
  ageGroup: AgeGroup;
  currentWorld: WorldId;
  xp: number;
  stars: number;
  streak: number;
  level: number;
  lastActiveDate: string;
  learnedWordIds: string[];
  favoriteWordIds: string[];
  unlockedAchievementIds: string[];
  quizStats: {
    totalAnswered: number;
    totalCorrect: number;
    quizzesCompleted: number;
  };
  gameHighScores: {
    tekaGambar: number;
    susunHuruf: number;
    padankan: number;
    tekaMaksud: number;
    dengarPilih: number;
    cariPerkataan: number;
    cabaran60Saat: number;
    rodaSpins: number;
  };
  categoryMastery: Record<string, number>;
  mapProgress: {
    currentZoneId: string;
    completedMissions: string[];
  };
  soundEnabled: boolean;
  parentPin: string;
}

export interface MapMission {
  id: string;
  title: string;
  description: string;
  requiredStars: number;
  targetCategory: string;
  rewardXp: number;
  rewardStars: number;
  icon: string;
}

export interface MapZone {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  color: string;
  bgGradient: string;
  missions: MapMission[];
}
