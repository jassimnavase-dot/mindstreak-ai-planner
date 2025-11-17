import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { useProfile } from "./useProfile";
import { toast } from "sonner";

export const useXP = () => {
  const { user } = useAuth();
  const { profile, updateProfile, refetch } = useProfile();

  const addXP = async (amount: number, reason: string) => {
    if (!user || !profile) return;

    try {
      const newXP = profile.xp + amount;
      const newLevel = Math.floor(newXP / 1000) + 1;
      const leveledUp = newLevel > profile.level;

      // Update profile
      await updateProfile({
        xp: newXP,
        level: newLevel,
      });

      // Log XP transaction
      await supabase.from("xp_logs").insert({
        user_id: user.id,
        xp_change: amount,
        reason,
      });

      // Check and unlock badges
      await checkBadges();

      await refetch();

      return { newXP, newLevel, leveledUp };
    } catch (error) {
      console.error("Error adding XP:", error);
      toast.error("Failed to add XP");
    }
  };

  const checkBadges = async () => {
    if (!user || !profile) return;

    try {
      // Fetch all badges
      const { data: allBadges } = await supabase
        .from("badges")
        .select("*");

      if (!allBadges) return;

      // Fetch user's current badges
      const { data: userBadges } = await supabase
        .from("user_badges")
        .select("badge_id")
        .eq("user_id", user.id);

      const earnedBadgeIds = new Set(userBadges?.map(ub => ub.badge_id) || []);

      // Check each badge condition
      for (const badge of allBadges) {
        if (earnedBadgeIds.has(badge.id)) continue;

        let shouldEarn = false;

        if (badge.condition_type === "xp" && profile.xp >= badge.condition_value) {
          shouldEarn = true;
        } else if (badge.condition_type === "streak" && profile.streak >= badge.condition_value) {
          shouldEarn = true;
        } else if (badge.condition_type === "tasks") {
          // Count completed tasks from xp_logs
          const { count } = await supabase
            .from("xp_logs")
            .select("*", { count: "exact", head: true })
            .eq("user_id", user.id)
            .ilike("reason", "%task%");

          if (count && count >= badge.condition_value) {
            shouldEarn = true;
          }
        }

        if (shouldEarn) {
          await supabase.from("user_badges").insert({
            user_id: user.id,
            badge_id: badge.id,
            progress: badge.condition_value,
          });

          toast.success(`🎉 Badge unlocked: ${badge.name}!`);
        }
      }
    } catch (error) {
      console.error("Error checking badges:", error);
    }
  };

  return {
    addXP,
    checkBadges,
  };
};
