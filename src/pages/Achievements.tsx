import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import BadgeCard from "@/components/BadgeCard";
import Leaderboard from "@/components/Leaderboard";
import { badges, Badge, calculateLevel, getXPProgress } from "@/data/badges";
import { ArrowLeft, Trophy, Star, Target, BookOpen, Award } from "lucide-react";

const Achievements = () => {
  const [userXP] = useState(2450);
  const [userStreak] = useState(14);
  const [completedTasks] = useState(28);

  // Simulate unlocked badges
  const unlockedBadges = badges.map((badge) => {
    let unlocked = false;
    let progress = 0;

    switch (badge.category) {
      case "streak":
        unlocked = userStreak >= badge.requirement;
        progress = Math.min((userStreak / badge.requirement) * 100, 100);
        break;
      case "xp":
        unlocked = userXP >= badge.requirement;
        progress = Math.min((userXP / badge.requirement) * 100, 100);
        break;
      case "tasks":
        unlocked = completedTasks >= badge.requirement;
        progress = Math.min((completedTasks / badge.requirement) * 100, 100);
        break;
      default:
        unlocked = false;
        progress = 0;
    }

    return { ...badge, unlocked, progress };
  });

  const unlockedCount = unlockedBadges.filter((b) => b.unlocked).length;
  const totalCount = badges.length;
  const completionPercentage = Math.round((unlockedCount / totalCount) * 100);

  const currentLevel = calculateLevel(userXP);
  const levelProgress = getXPProgress(userXP);

  const filterBadgesByCategory = (category: Badge["category"]) => {
    return unlockedBadges.filter((b) => b.category === category);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Trophy className="h-8 w-8 text-primary" />
                Achievements & Badges
              </h1>
              <p className="text-muted-foreground mt-1">
                Track your progress and unlock special rewards
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overall Progress */}
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle>Your Achievement Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 rounded-lg bg-gradient-primary">
                    <div className="text-3xl font-bold text-primary-foreground mb-1">
                      Level {currentLevel}
                    </div>
                    <p className="text-sm text-primary-foreground/80">Current Level</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-gradient-achievement">
                    <div className="text-3xl font-bold text-achievement-foreground mb-1">
                      {unlockedCount}/{totalCount}
                    </div>
                    <p className="text-sm text-achievement-foreground/80">Badges Unlocked</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-gradient-success">
                    <div className="text-3xl font-bold text-success-foreground mb-1">
                      {completionPercentage}%
                    </div>
                    <p className="text-sm text-success-foreground/80">Completion</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Level Progress</span>
                    <span className="text-muted-foreground">{Math.round(levelProgress)}%</span>
                  </div>
                  <Progress value={levelProgress} className="h-3" />
                </div>
              </CardContent>
            </Card>

            {/* Badges by Category */}
            <Card>
              <CardHeader>
                <CardTitle>Badge Collection</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" className="space-y-6">
                  <TabsList className="grid grid-cols-5 w-full">
                    <TabsTrigger value="all" className="text-xs">
                      All
                    </TabsTrigger>
                    <TabsTrigger value="streak" className="text-xs">
                      Streaks
                    </TabsTrigger>
                    <TabsTrigger value="xp" className="text-xs">
                      XP
                    </TabsTrigger>
                    <TabsTrigger value="tasks" className="text-xs">
                      Tasks
                    </TabsTrigger>
                    <TabsTrigger value="special" className="text-xs">
                      Special
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      {unlockedBadges.map((badge) => (
                        <BadgeCard key={badge.id} badge={badge} />
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="streak" className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      {filterBadgesByCategory("streak").map((badge) => (
                        <BadgeCard key={badge.id} badge={badge} />
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="xp" className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      {filterBadgesByCategory("xp").map((badge) => (
                        <BadgeCard key={badge.id} badge={badge} />
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="tasks" className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      {filterBadgesByCategory("tasks").map((badge) => (
                        <BadgeCard key={badge.id} badge={badge} />
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="special" className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      {filterBadgesByCategory("special").map((badge) => (
                        <BadgeCard key={badge.id} badge={badge} />
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Unlocks */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recently Unlocked</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {unlockedBadges
                  .filter((b) => b.unlocked)
                  .slice(0, 3)
                  .map((badge) => {
                    const Icon = badge.icon;
                    return (
                      <div key={badge.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                        <div className="p-2 rounded-full bg-gradient-achievement">
                          <Icon className="h-5 w-5 text-achievement-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{badge.name}</p>
                          <p className="text-xs text-muted-foreground">+{badge.xpReward} XP</p>
                        </div>
                      </div>
                    );
                  })}
              </CardContent>
            </Card>

            {/* Next Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Next Goals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {unlockedBadges
                  .filter((b) => !b.unlocked && b.progress > 0)
                  .sort((a, b) => (b.progress || 0) - (a.progress || 0))
                  .slice(0, 3)
                  .map((badge) => {
                    const Icon = badge.icon;
                    return (
                      <div key={badge.id} className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          <p className="font-medium text-sm flex-1">{badge.name}</p>
                        </div>
                        <Progress value={badge.progress} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          {Math.round(badge.progress || 0)}% complete
                        </p>
                      </div>
                    );
                  })}
              </CardContent>
            </Card>

            {/* Leaderboard */}
            <Leaderboard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
