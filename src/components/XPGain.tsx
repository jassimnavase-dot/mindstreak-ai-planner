import { useEffect, useState } from "react";
import { Star } from "lucide-react";

interface XPGainProps {
  amount: number;
  onComplete?: () => void;
}

const XPGain = ({ amount, onComplete }: XPGainProps) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onComplete?.();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!show) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-achievement shadow-achievement">
        <Star className="h-5 w-5 text-achievement-foreground animate-spin" style={{ animationDuration: "1s" }} />
        <span className="text-lg font-bold text-achievement-foreground">
          +{amount} XP
        </span>
      </div>
    </div>
  );
};

export default XPGain;
