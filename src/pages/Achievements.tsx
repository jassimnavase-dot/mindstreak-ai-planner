import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import BadgeCard from "@/components/BadgeCard";
import Leaderboard from "@/components/Leaderboard";
import { ArrowLeft, Trophy } from "lucide-react";
import { AuthenticatedNavbar } from "@/components/AuthenticatedNavbar";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { supabase } from "@/integrations/supabase/client";

const Achievements = () => {
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading } = useProfile();
  const navigate = useNavigate();
  const [badges, setBadges] = useState<any[]>([]);
  const [userBadges, setUserBadges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const { data: allBadges } = await supabase.from("badges").select("*");
        const { data: earned } = await supabase.from("user_badges").select("*").eq("user_id", user.id);
        setBadges(allBadges || []);
        setUserBadges(earned || []);
        setLoading(false);
      };
      fetchData();
    }
  }, [user]);

  if (authLoading || profileLoading || loading || !profile) {
    return <div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;
  }

  const earnedIds = new Set(userBadges.map(ub => ub.badge_id));
  const badgesWithProgress = badges.map(b => ({
    ...b,
    unlocked: earnedIds.has(b.id),
    progress: earnedIds.has(b.id) ? 100 : Math.min((b.condition_type === "xp" ? profile.xp : profile.streak) / b.condition_value * 100, 100)
  }));

  return (
    <div className="min-h-screen bg-background pb-20">
      <AuthenticatedNavbar />
      <div className="pt-24 container mx-auto px-4">
        <Link to="/dashboard"><Button variant="ghost" size="sm" className="mb-6"><ArrowLeft className="mr-2 h-4 w-4" />Back</Button></Link>
        <h1 className="text-3xl font-bold mb-8"><Trophy className="inline h-8 w-8 text-primary mr-2" />Achievements</h1>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2"><Card><CardContent className="pt-6"><Tabs defaultValue="all"><TabsList className="grid w-full grid-cols-4"><TabsTrigger value="all">All</TabsTrigger><TabsTrigger value="streak">Streak</TabsTrigger><TabsTrigger value="xp">XP</TabsTrigger><TabsTrigger value="tasks">Tasks</TabsTrigger></TabsList><TabsContent value="all" className="mt-6"><div className="grid sm:grid-cols-2 gap-4">{badgesWithProgress.map(b => <BadgeCard key={b.id} badge={b} />)}</div></TabsContent><TabsContent value="streak" className="mt-6"><div className="grid sm:grid-cols-2 gap-4">{badgesWithProgress.filter(b => b.category === "streak").map(b => <BadgeCard key={b.id} badge={b} />)}</div></TabsContent><TabsContent value="xp" className="mt-6"><div className="grid sm:grid-cols-2 gap-4">{badgesWithProgress.filter(b => b.category === "xp").map(b => <BadgeCard key={b.id} badge={b} />)}</div></TabsContent><TabsContent value="tasks" className="mt-6"><div className="grid sm:grid-cols-2 gap-4">{badgesWithProgress.filter(b => b.category === "tasks").map(b => <BadgeCard key={b.id} badge={b} />)}</div></TabsContent></Tabs></CardContent></Card></div>
          <Leaderboard />
        </div>
      </div>
    </div>
  );
};

export default Achievements;
