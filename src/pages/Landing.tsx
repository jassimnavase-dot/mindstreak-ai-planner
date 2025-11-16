import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { 
  Brain, 
  Target, 
  Trophy, 
  TrendingUp, 
  Users, 
  Calendar,
  Zap,
  Award,
  BookOpen,
  CheckCircle
} from "lucide-react";
import heroImage from "@/assets/hero-students.jpg";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block">
                <span className="px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium">
                  🚀 AI-Powered Study Planning
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Build Your{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Study Streak
                </span>
                , Level Up Your Learning
              </h1>
              <p className="text-xl text-muted-foreground">
                MindStreak transforms studying into an engaging game. Get personalized AI timetables, 
                earn XP for completing tasks, and watch your knowledge grow with every streak.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/auth">
                  <Button variant="hero" size="xl" className="w-full sm:w-auto">
                    Start Learning Free <Zap className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="outline" size="xl" className="w-full sm:w-auto">
                  Watch Demo
                </Button>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">10K+</div>
                  <div className="text-sm text-muted-foreground">Active Students</div>
                </div>
                <div className="h-12 w-px bg-border" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Teachers</div>
                </div>
                <div className="h-12 w-px bg-border" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">95%</div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl rounded-full" />
              <img 
                src={heroImage} 
                alt="Students learning with MindStreak" 
                className="relative rounded-2xl shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Everything You Need to{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">Excel</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to make studying effective, engaging, and fun
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-primary transition-smooth hover:shadow-md">
              <CardContent className="pt-6">
                <div className="p-3 rounded-lg bg-gradient-primary w-fit mb-4">
                  <Brain className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">AI Timetable Generator</h3>
                <p className="text-muted-foreground">
                  Smart AI creates personalized study schedules based on your subjects, exam dates, and available time
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-smooth hover:shadow-md">
              <CardContent className="pt-6">
                <div className="p-3 rounded-lg bg-gradient-achievement w-fit mb-4">
                  <Trophy className="h-6 w-6 text-achievement-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">XP & Streak System</h3>
                <p className="text-muted-foreground">
                  Earn experience points and maintain study streaks. Gamification that actually motivates
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-smooth hover:shadow-md">
              <CardContent className="pt-6">
                <div className="p-3 rounded-lg bg-gradient-success w-fit mb-4">
                  <Target className="h-6 w-6 text-success-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">Smart Task Management</h3>
                <p className="text-muted-foreground">
                  Track homework, assignments, and study goals all in one place with intelligent reminders
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-smooth hover:shadow-md">
              <CardContent className="pt-6">
                <div className="p-3 rounded-lg bg-primary w-fit mb-4">
                  <TrendingUp className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">Progress Analytics</h3>
                <p className="text-muted-foreground">
                  Visualize your learning journey with detailed analytics and performance insights
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-smooth hover:shadow-md">
              <CardContent className="pt-6">
                <div className="p-3 rounded-lg bg-accent w-fit mb-4">
                  <Users className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">Teacher Dashboard</h3>
                <p className="text-muted-foreground">
                  Teachers can create classes, assign tasks, and monitor student progress in real-time
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-smooth hover:shadow-md">
              <CardContent className="pt-6">
                <div className="p-3 rounded-lg bg-muted w-fit mb-4">
                  <Award className="h-6 w-6 text-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">Badges & Achievements</h3>
                <p className="text-muted-foreground">
                  Unlock special badges and achievements as you hit study milestones
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How MindStreak Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-2xl mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Sign Up & Set Goals</h3>
              <p className="text-muted-foreground">
                Create your account and tell us about your subjects and exam dates
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-gradient-achievement flex items-center justify-center text-achievement-foreground font-bold text-2xl mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Get AI Timetable</h3>
              <p className="text-muted-foreground">
                Our AI generates a personalized study schedule optimized for your success
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-gradient-success flex items-center justify-center text-success-foreground font-bold text-2xl mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Study & Level Up</h3>
              <p className="text-muted-foreground">
                Complete tasks, earn XP, maintain streaks, and watch your progress soar
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/pattern-bg.jpg')] bg-cover" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-primary-foreground">
            Ready to Transform Your Study Habits?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already leveling up their learning with MindStreak
          </p>
          <Link to="/auth">
            <Button variant="achievement" size="xl" className="text-lg">
              Start Your Free Journey <Trophy className="ml-2 h-6 w-6" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-primary" />
              <span className="font-bold">MindStreak</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 MindStreak. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
