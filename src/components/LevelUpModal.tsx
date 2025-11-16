import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trophy, Sparkles } from "lucide-react";

interface LevelUpModalProps {
  level: number;
  open: boolean;
  onClose: () => void;
}

const LevelUpModal = ({ level, open, onClose }: LevelUpModalProps) => {
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; delay: number }>>([]);

  useEffect(() => {
    if (open) {
      // Generate confetti particles
      const particles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.5,
      }));
      setConfetti(particles);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {confetti.map((particle) => (
            <div
              key={particle.id}
              className="absolute w-2 h-2 bg-gradient-achievement rounded-full animate-in fade-in zoom-in duration-1000"
              style={{
                left: `${particle.x}%`,
                top: "-10%",
                animationDelay: `${particle.delay}s`,
                animation: `fall ${2 + Math.random()}s linear forwards`,
              }}
            />
          ))}
        </div>

        <DialogHeader className="text-center space-y-4 pt-6">
          <div className="mx-auto">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-achievement opacity-30 blur-2xl rounded-full animate-pulse" />
              <div className="relative p-6 rounded-full bg-gradient-achievement">
                <Trophy className="h-16 w-16 text-achievement-foreground animate-bounce" />
              </div>
            </div>
          </div>
          
          <DialogTitle className="text-3xl font-bold">
            Level Up!
          </DialogTitle>
          
          <div className="space-y-2">
            <div className="text-6xl font-bold bg-gradient-achievement bg-clip-text text-transparent">
              {level}
            </div>
            <p className="text-muted-foreground">
              You've reached Level {level}!
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4" />
            <span>Keep up the amazing work!</span>
            <Sparkles className="h-4 w-4" />
          </div>
        </DialogHeader>

        <div className="pt-4">
          <Button variant="hero" className="w-full" onClick={onClose}>
            Continue Learning
          </Button>
        </div>
      </DialogContent>

      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </Dialog>
  );
};

export default LevelUpModal;
