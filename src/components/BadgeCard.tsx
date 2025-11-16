import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/data/badges";
import { getRarityColor, getRarityGradient } from "@/data/badges";
import { Lock } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface BadgeCardProps {
  badge: Badge;
}

const BadgeCard = ({ badge }: BadgeCardProps) => {
  const Icon = badge.icon;
  const isUnlocked = badge.unlocked || false;
  const progress = badge.progress || 0;

  return (
    <Card className={`border-2 transition-smooth hover:shadow-md ${
      isUnlocked 
        ? `${getRarityColor(badge.rarity)} hover:scale-105` 
        : "border-border opacity-60"
    }`}>
      <CardContent className="pt-6 text-center space-y-3">
        <div className="relative mx-auto w-16 h-16">
          {isUnlocked ? (
            <div className={`w-full h-full rounded-full ${getRarityGradient(badge.rarity)} flex items-center justify-center animate-in zoom-in duration-500`}>
              <Icon className="h-8 w-8 text-primary-foreground" />
            </div>
          ) : (
            <div className="w-full h-full rounded-full bg-muted flex items-center justify-center">
              <Lock className="h-6 w-6 text-muted-foreground" />
            </div>
          )}
          
          {isUnlocked && (
            <div className={`absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full text-xs font-bold ${getRarityGradient(badge.rarity)} text-primary-foreground`}>
              {badge.rarity}
            </div>
          )}
        </div>

        <div>
          <h3 className="font-bold text-sm mb-1">{badge.name}</h3>
          <p className="text-xs text-muted-foreground">{badge.description}</p>
        </div>

        {!isUnlocked && progress > 0 && (
          <div className="space-y-1">
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {Math.round(progress)}% complete
            </p>
          </div>
        )}

        <div className="flex items-center justify-center gap-1 text-xs">
          <span className="text-muted-foreground">Reward:</span>
          <span className="font-bold text-achievement">+{badge.xpReward} XP</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default BadgeCard;
