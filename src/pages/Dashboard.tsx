import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen, CheckCircle, Clock, Flame, Star, TrendingUp, Trophy, Target } from "lucide-react";
import { AuthenticatedNavbar } from "@/components/AuthenticatedNavbar";
import { Leaderboard } from "@/components/Leaderboard";
import { XPGain } from "@/components/XPGain";
import { LevelUpModal } from "@/components/LevelUpModal";
import { useProfile } from "@/hooks/useProfile";
import { useXP } from "@/hooks/useXP";
import { useStreak } from "@/hooks/useStreak";
import { useAuth } from "@/hooks/useAuth";

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading } = useProfile();
  const { addXP } = useXP();
  const { updateStreak } = useStreak();
  const navigate = useNavigate();
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [xpGains, setXpGains] = useState<Array<{ id: number; amount: number }>>([]);
  const [nextXpId, setNextXpId] = useState(0);
  const [tasks] = useState([
    { id: 1, subject: "Mathematics", task: "Complete Chapter 5 exercises", due: "Today", completed: false, xp: 50 },
    { id: 2, subject: "Physics", task: "Watch lecture on Thermodynamics", due: "Today", completed: false, xp: 40 },
    { id: 3, subject: "Chemistry", task: "Lab report submission", due: "Tomorrow", completed: false, xp: 60 },
    { id: 4, subject: "English", task: "Essay on Shakespeare", due: "In 2 days", completed: false, xp: 75 },
  ]);

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (profile) updateStreak();
  }, [profile]);

  if (authLoading || profileLoading || !profile) {
    return <div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;
  }

  const handleTaskComplete = async (taskId: number) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;
    const newXpId = nextXpId;
    setNextXpId(nextXpId + 1);
    setXpGains([...xpGains, { id: newXpId, amount: task.xp }]);
    setTimeout(() => setXpGains(xpGains.filter(g => g.id !== newXpId)), 2000);
    const result = await addXP(task.xp, "Completed task");
    if (result?.leveledUp) setShowLevelUp(true);
  };

  const levelProgress = ((profile.xp % 1000) / 1000) * 100;

  return (
    <div className="min-h-screen bg-background pb-20">
      <AuthenticatedNavbar />
      {xpGains.map(g => <XPGain key={g.id} amount={g.amount} />)}
      <LevelUpModal level={profile.level} open={showLevelUp} onClose={() => setShowLevelUp(false)} />
      <div className="pt-24 container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Welcome back, {profile.name}! 👋</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm">Level</CardTitle><Trophy className="h-4 w-4 text-primary" /></CardHeader><CardContent><div className="text-2xl font-bold">Level {profile.level}</div><Progress value={levelProgress} className="mt-2" /></CardContent></Card>
          <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm">Total XP</CardTitle><Star className="h-4 w-4 text-primary" /></CardHeader><CardContent><div className="text-2xl font-bold">{profile.xp} XP</div></CardContent></Card>
          <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm">Streak</CardTitle><Flame className="h-4 w-4 text-orange-500" /></CardHeader><CardContent><div className="text-2xl font-bold">{profile.streak} days</div></CardContent></Card>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2"><Card><CardHeader><CardTitle>Today's Tasks</CardTitle></CardHeader><CardContent><div className="space-y-3">{tasks.map(t => <div key={t.id} className="flex items-center justify-between p-4 rounded-lg border"><div className="flex-1"><p className="font-medium">{t.task}</p><p className="text-sm text-muted-foreground">{t.subject}</p></div><div className="flex gap-3"><Badge variant="secondary">+{t.xp} XP</Badge><Button size="sm" variant="hero" onClick={() => handleTaskComplete(t.id)}>Complete</Button></div></div>)}</div></CardContent></Card></div>
          <div><Leaderboard /><Card className="mt-6"><CardHeader><CardTitle className="text-base">Quick Actions</CardTitle></CardHeader><CardContent><Button variant="outline" className="w-full" onClick={() => navigate("/achievements")}><Trophy className="mr-2 h-4 w-4" />View Badges</Button></CardContent></Card></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
