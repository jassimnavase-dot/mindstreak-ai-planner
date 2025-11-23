import { Link } from "react-router-dom";
import { Brain } from "lucide-react";
import { Button } from "./ui/button";
import { NavLink } from "./NavLink";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 rounded-lg bg-gradient-primary">
            <Brain className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            MindStreak
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="#features">Features</NavLink>
          <NavLink to="#how-it-works">How It Works</NavLink>
        </nav>
        
        <Link to="/auth">
          <Button variant="hero">Get Started</Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
