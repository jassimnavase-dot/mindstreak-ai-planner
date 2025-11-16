import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Brain, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

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

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="#features" className="text-sm font-medium text-foreground hover:text-primary transition-smooth">
            Features
          </Link>
          <Link to="#how-it-works" className="text-sm font-medium text-foreground hover:text-primary transition-smooth">
            How It Works
          </Link>
          <Link to="#pricing" className="text-sm font-medium text-foreground hover:text-primary transition-smooth">
            Pricing
          </Link>
          <Link to="/auth">
            <Button variant="outline" size="sm">Sign In</Button>
          </Link>
          <Link to="/auth">
            <Button variant="hero" size="sm">Get Started</Button>
          </Link>
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col gap-4 mt-8">
              <Link to="#features" className="text-lg font-medium text-foreground hover:text-primary transition-smooth">
                Features
              </Link>
              <Link to="#how-it-works" className="text-lg font-medium text-foreground hover:text-primary transition-smooth">
                How It Works
              </Link>
              <Link to="#pricing" className="text-lg font-medium text-foreground hover:text-primary transition-smooth">
                Pricing
              </Link>
              <Link to="/auth" className="mt-4">
                <Button variant="outline" size="lg" className="w-full">Sign In</Button>
              </Link>
              <Link to="/auth">
                <Button variant="hero" size="lg" className="w-full">Get Started</Button>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
