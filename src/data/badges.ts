import { Trophy, Flame, Star, Target, BookOpen, Zap, Award, Crown, Rocket, GraduationCap } from "lucide-react";

export type BadgeCategory = "streak" | "xp" | "tasks" | "subjects" | "special";

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: any;
  category: BadgeCategory;
  requirement: number;
  xpReward: number;
  rarity: "common" | "rare" | "epic" | "legendary";
  unlocked?: boolean;
  progress?: number;
}

export const badges: Badge[] = [
  // Streak Badges
  {
    id: "streak_3",
    name: "Getting Started",
    description: "Maintain a 3-day study streak",
    icon: Flame,
    category: "streak",
    requirement: 3,
    xpReward: 50,
    rarity: "common",
  },
  {
    id: "streak_7",
    name: "Week Warrior",
    description: "Maintain a 7-day study streak",
    icon: Flame,
    category: "streak",
    requirement: 7,
    xpReward: 150,
    rarity: "common",
  },
  {
    id: "streak_14",
    name: "Streak Master",
    description: "Maintain a 14-day study streak",
    icon: Flame,
    category: "streak",
    requirement: 14,
    xpReward: 300,
    rarity: "rare",
  },
  {
    id: "streak_30",
    name: "Dedicated Scholar",
    description: "Maintain a 30-day study streak",
    icon: Crown,
    category: "streak",
    requirement: 30,
    xpReward: 750,
    rarity: "epic",
  },
  {
    id: "streak_100",
    name: "Century Champion",
    description: "Maintain a 100-day study streak",
    icon: Crown,
    category: "streak",
    requirement: 100,
    xpReward: 2500,
    rarity: "legendary",
  },

  // XP Badges
  {
    id: "xp_500",
    name: "Rising Star",
    description: "Earn 500 total XP",
    icon: Star,
    category: "xp",
    requirement: 500,
    xpReward: 100,
    rarity: "common",
  },
  {
    id: "xp_1000",
    name: "Knowledge Seeker",
    description: "Earn 1,000 total XP",
    icon: Star,
    category: "xp",
    requirement: 1000,
    xpReward: 200,
    rarity: "rare",
  },
  {
    id: "xp_5000",
    name: "Academic Ace",
    description: "Earn 5,000 total XP",
    icon: Trophy,
    category: "xp",
    requirement: 5000,
    xpReward: 500,
    rarity: "epic",
  },
  {
    id: "xp_10000",
    name: "Master Scholar",
    description: "Earn 10,000 total XP",
    icon: Crown,
    category: "xp",
    requirement: 10000,
    xpReward: 1000,
    rarity: "legendary",
  },

  // Task Badges
  {
    id: "tasks_10",
    name: "Quick Learner",
    description: "Complete 10 tasks",
    icon: Target,
    category: "tasks",
    requirement: 10,
    xpReward: 100,
    rarity: "common",
  },
  {
    id: "tasks_50",
    name: "Productive Student",
    description: "Complete 50 tasks",
    icon: Target,
    category: "tasks",
    requirement: 50,
    xpReward: 250,
    rarity: "rare",
  },
  {
    id: "tasks_100",
    name: "Task Master",
    description: "Complete 100 tasks",
    icon: Award,
    category: "tasks",
    requirement: 100,
    xpReward: 500,
    rarity: "epic",
  },
  {
    id: "tasks_500",
    name: "Completion Legend",
    description: "Complete 500 tasks",
    icon: Crown,
    category: "tasks",
    requirement: 500,
    xpReward: 2000,
    rarity: "legendary",
  },

  // Subject Badges
  {
    id: "math_master",
    name: "Math Wizard",
    description: "Complete 25 Mathematics tasks",
    icon: BookOpen,
    category: "subjects",
    requirement: 25,
    xpReward: 300,
    rarity: "rare",
  },
  {
    id: "science_genius",
    name: "Science Genius",
    description: "Complete 25 Science tasks",
    icon: Rocket,
    category: "subjects",
    requirement: 25,
    xpReward: 300,
    rarity: "rare",
  },
  {
    id: "all_rounder",
    name: "Renaissance Scholar",
    description: "Complete tasks in all subjects",
    icon: GraduationCap,
    category: "subjects",
    requirement: 1,
    xpReward: 500,
    rarity: "epic",
  },

  // Special Badges
  {
    id: "early_bird",
    name: "Early Bird",
    description: "Complete tasks before 8 AM",
    icon: Zap,
    category: "special",
    requirement: 10,
    xpReward: 200,
    rarity: "rare",
  },
  {
    id: "night_owl",
    name: "Night Owl",
    description: "Complete tasks after 10 PM",
    icon: Star,
    category: "special",
    requirement: 10,
    xpReward: 200,
    rarity: "rare",
  },
  {
    id: "perfectionist",
    name: "Perfectionist",
    description: "Complete a week with 100% task completion",
    icon: Award,
    category: "special",
    requirement: 1,
    xpReward: 400,
    rarity: "epic",
  },
  {
    id: "speed_demon",
    name: "Speed Demon",
    description: "Complete 10 tasks in one day",
    icon: Zap,
    category: "special",
    requirement: 10,
    xpReward: 350,
    rarity: "epic",
  },
];

export const getRarityColor = (rarity: Badge["rarity"]) => {
  switch (rarity) {
    case "common":
      return "text-muted-foreground border-border";
    case "rare":
      return "text-primary border-primary";
    case "epic":
      return "text-achievement border-achievement";
    case "legendary":
      return "text-success border-success";
    default:
      return "text-muted-foreground border-border";
  }
};

export const getRarityGradient = (rarity: Badge["rarity"]) => {
  switch (rarity) {
    case "common":
      return "bg-muted";
    case "rare":
      return "bg-gradient-primary";
    case "epic":
      return "bg-gradient-achievement";
    case "legendary":
      return "bg-gradient-success";
    default:
      return "bg-muted";
  }
};

export const calculateLevel = (xp: number): number => {
  return Math.floor(xp / 250) + 1;
};

export const getXPForNextLevel = (currentXP: number): number => {
  const currentLevel = calculateLevel(currentXP);
  return currentLevel * 250;
};

export const getXPProgress = (currentXP: number): number => {
  const currentLevel = calculateLevel(currentXP);
  const xpForCurrentLevel = (currentLevel - 1) * 250;
  const xpForNextLevel = currentLevel * 250;
  const progressInLevel = currentXP - xpForCurrentLevel;
  return (progressInLevel / (xpForNextLevel - xpForCurrentLevel)) * 100;
};
