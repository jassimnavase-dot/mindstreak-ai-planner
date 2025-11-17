import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { useProfile } from "./useProfile";

export const useStreak = () => {
  const { user } = useAuth();
  const { profile, updateProfile, refetch } = useProfile();

  const updateStreak = async () => {
    if (!user || !profile) return;

    try {
      const today = new Date().toISOString().split("T")[0];

      // Check if already logged today
      const { data: todayLog } = await supabase
        .from("streak_logs")
        .select("*")
        .eq("user_id", user.id)
        .eq("date", today)
        .single();

      if (todayLog) return; // Already logged today

      // Get yesterday's date
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayDate = yesterday.toISOString().split("T")[0];

      // Check if logged yesterday
      const { data: yesterdayLog } = await supabase
        .from("streak_logs")
        .select("*")
        .eq("user_id", user.id)
        .eq("date", yesterdayDate)
        .single();

      let newStreak = profile.streak;

      if (yesterdayLog) {
        // Continue streak
        newStreak = profile.streak + 1;
      } else {
        // Reset streak
        newStreak = 1;
      }

      const newLongestStreak = Math.max(newStreak, profile.longest_streak);

      // Update profile
      await updateProfile({
        streak: newStreak,
        longest_streak: newLongestStreak,
      });

      // Log today's streak
      await supabase.from("streak_logs").insert({
        user_id: user.id,
        date: today,
        maintained: true,
      });

      await refetch();

      return { newStreak, newLongestStreak };
    } catch (error) {
      console.error("Error updating streak:", error);
    }
  };

  return {
    updateStreak,
  };
};
