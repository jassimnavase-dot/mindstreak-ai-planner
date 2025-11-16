import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, TrendingUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LeaderboardEntry {
  rank: number;
  name: string;
  xp: number;
  streak: number;
  avatar: string;
  isCurrentUser?: boolean;
}

const leaderboardData: LeaderboardEntry[] = [
  { rank: 1, name: "Sarah Chen", xp: 5420, streak: 45, avatar: "SC" },
  { rank: 2, name: "Alex Kumar", xp: 4890, streak: 32, avatar: "AK", isCurrentUser: true },
  { rank: 3, name: "Emma Wilson", xp: 4650, streak: 28, avatar: "EW" },
  { rank: 4, name: "James Park", xp: 4230, streak: 25, avatar: "JP" },
  { rank: 5, name: "Maria Garcia", xp: 3980, streak: 21, avatar: "MG" },
  { rank: 6, name: "David Lee", xp: 3750, streak: 19, avatar: "DL" },
  { rank: 7, name: "Sofia Rodriguez", xp: 3520, streak: 17, avatar: "SR" },
  { rank: 8, name: "Ryan Taylor", xp: 3290, streak: 15, avatar: "RT" },
];

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Trophy className="h-5 w-5 text-achievement" />;
    case 2:
      return <Medal className="h-5 w-5 text-muted-foreground" />;
    case 3:
      return <Award className="h-5 w-5 text-achievement/60" />;
    default:
      return <span className="text-sm font-bold text-muted-foreground">{rank}</span>;
  }
};

const Leaderboard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="xp" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="xp">By XP</TabsTrigger>
            <TabsTrigger value="streak">By Streak</TabsTrigger>
          </TabsList>

          <TabsContent value="xp" className="space-y-2">
            {leaderboardData.map((entry) => (
              <div
                key={entry.rank}
                className={`flex items-center gap-3 p-3 rounded-lg transition-smooth ${
                  entry.isCurrentUser 
                    ? "bg-primary/10 border-2 border-primary" 
                    : "bg-muted/50 hover:bg-muted"
                }`}
              >
                <div className="flex items-center justify-center w-8">
                  {getRankIcon(entry.rank)}
                </div>

                <Avatar className="h-10 w-10">
                  <AvatarFallback className={entry.rank <= 3 ? "bg-gradient-primary text-primary-foreground" : "bg-muted"}>
                    {entry.avatar}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium truncate">{entry.name}</p>
                    {entry.isCurrentUser && (
                      <Badge variant="secondary" className="text-xs">You</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <TrendingUp className="h-3 w-3" />
                    <span>{entry.streak} day streak</span>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm font-bold text-primary">{entry.xp.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">XP</p>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="streak" className="space-y-2">
            {[...leaderboardData]
              .sort((a, b) => b.streak - a.streak)
              .map((entry, index) => (
                <div
                  key={entry.rank}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-smooth ${
                    entry.isCurrentUser 
                      ? "bg-primary/10 border-2 border-primary" 
                      : "bg-muted/50 hover:bg-muted"
                  }`}
                >
                  <div className="flex items-center justify-center w-8">
                    {getRankIcon(index + 1)}
                  </div>

                  <Avatar className="h-10 w-10">
                    <AvatarFallback className={index < 3 ? "bg-gradient-success text-success-foreground" : "bg-muted"}>
                      {entry.avatar}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium truncate">{entry.name}</p>
                      {entry.isCurrentUser && (
                        <Badge variant="secondary" className="text-xs">You</Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{entry.xp.toLocaleString()} XP</p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-bold text-achievement">{entry.streak}</p>
                    <p className="text-xs text-muted-foreground">days</p>
                  </div>
                </div>
              ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
