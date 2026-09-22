// Progress tracking for grammar activities
// Stores user progress in localStorage

export interface UserProgress {
  userId: string;
  completedActivities: Record<string, boolean>; // activityId -> completed
  scores: Record<string, number>; // activityId -> score (0-100)
  lastAccessed: Record<string, number>; // activityId -> timestamp
  levelProgress: Record<string, {
    totalActivities: number;
    completedActivities: number;
    averageScore: number;
  }>;
}

const STORAGE_KEY = 'grammar_lab_progress';

// Get current user ID (in a real app, this would come from authentication)
const getCurrentUserId = (): string => {
  let userId = localStorage.getItem('grammar_lab_user_id');
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('grammar_lab_user_id', userId);
  }
  return userId;
};

// Load user progress from localStorage
export const loadProgress = (): UserProgress => {
  const userId = getCurrentUserId();
  const stored = localStorage.getItem(`${STORAGE_KEY}_${userId}`);
  
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Error loading progress:', e);
    }
  }
  
  return {
    userId,
    completedActivities: {},
    scores: {},
    lastAccessed: {},
    levelProgress: {}
  };
};

// Save user progress to localStorage
export const saveProgress = (progress: UserProgress): void => {
  try {
    localStorage.setItem(`${STORAGE_KEY}_${progress.userId}`, JSON.stringify(progress));
  } catch (e) {
    console.error('Error saving progress:', e);
  }
};

// Mark an activity as completed
export const markActivityCompleted = (activityId: string, score: number): void => {
  const progress = loadProgress();
  progress.completedActivities[activityId] = true;
  progress.scores[activityId] = score;
  progress.lastAccessed[activityId] = Date.now();
  saveProgress(progress);
};

// Check if an activity is completed
export const isActivityCompleted = (activityId: string): boolean => {
  const progress = loadProgress();
  return progress.completedActivities[activityId] || false;
};

// Get score for an activity
export const getActivityScore = (activityId: string): number => {
  const progress = loadProgress();
  return progress.scores[activityId] || 0;
};

// Update level progress
export const updateLevelProgress = (
  levelId: string,
  totalActivities: number,
  completedActivities: number,
  averageScore: number
): void => {
  const progress = loadProgress();
  progress.levelProgress[levelId] = {
    totalActivities,
    completedActivities,
    averageScore
  };
  saveProgress(progress);
};

// Get level progress
export const getLevelProgress = (levelId: string): {
  totalActivities: number;
  completedActivities: number;
  averageScore: number;
} | null => {
  const progress = loadProgress();
  return progress.levelProgress[levelId] || null;
};

// Get overall progress statistics
export const getOverallProgress = (): {
  totalCompleted: number;
  totalActivities: number;
  averageScore: number;
  levelsCompleted: number;
} => {
  const progress = loadProgress();
  const totalCompleted = Object.keys(progress.completedActivities).length;
  
  let totalScore = 0;
  let scoreCount = 0;
  Object.values(progress.scores).forEach(score => {
    totalScore += score;
    scoreCount++;
  });
  
  const averageScore = scoreCount > 0 ? totalScore / scoreCount : 0;
  
  const levelsCompleted = Object.values(progress.levelProgress).filter(
    lp => lp.completedActivities === lp.totalActivities
  ).length;
  
  return {
    totalCompleted,
    totalActivities: 0, // Will be calculated by the app
    averageScore,
    levelsCompleted
  };
};

// Reset all progress (for testing)
export const resetProgress = (): void => {
  const userId = getCurrentUserId();
  localStorage.removeItem(`${STORAGE_KEY}_${userId}`);
};

// Get all users (for admin view)
export const getAllUsers = (): string[] => {
  const users: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(STORAGE_KEY)) {
      users.push(key.replace(`${STORAGE_KEY}_`, ''));
    }
  }
  return users;
};
