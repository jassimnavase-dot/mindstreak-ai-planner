import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, GraduationCap, Users, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

type UserRole = "student" | "teacher" | "parent";

const Auth = () => {
  const { user, signUp, signIn } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState<UserRole>("student");
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      window.location.href = "/dashboard";
    }
  }, [user]);

  const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (isLogin) {
      await signIn(email, password);
    } else {
      const name = formData.get("name") as string;
      await signUp(email, password, name, selectedRole);
    }

    setIsLoading(false);
  };

  const roleCards = [
    {
      role: "student" as UserRole,
      icon: GraduationCap,
      title: "Student",
      description: "Build streaks, earn XP, and ace your exams",
    },
    {
      role: "teacher" as UserRole,
      icon: Users,
      title: "Teacher",
      description: "Create classes and track student progress",
    },
    {
      role: "parent" as UserRole,
      icon: User,
      title: "Parent",
      description: "Monitor your child's study habits",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-hero opacity-5" />
      
      <Card className="w-full max-w-4xl relative z-10 shadow-lg">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-gradient-primary">
              <Brain className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold">
            Welcome to <span className="bg-gradient-primary bg-clip-text text-transparent">MindStreak</span>
          </CardTitle>
          <CardDescription>
            {isLogin ? "Sign in to continue your learning journey" : "Create your account and start building streaks"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs value={isLogin ? "login" : "signup"} onValueChange={(v) => setIsLogin(v === "login")} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-6">
              <form onSubmit={handleAuth} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="student@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" name="password" type="password" placeholder="••••••••" required />
                </div>
                <Button type="submit" variant="hero" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="space-y-6">
              <div className="space-y-4">
                <Label className="text-base">I am a...</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {roleCards.map((card) => {
                    const Icon = card.icon;
                    return (
                      <Card
                        key={card.role}
                        className={`cursor-pointer transition-smooth hover:shadow-md ${
                          selectedRole === card.role
                            ? "border-primary border-2 shadow-md"
                            : "border-border"
                        }`}
                        onClick={() => setSelectedRole(card.role)}
                      >
                        <CardContent className="pt-6 text-center">
                          <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                            selectedRole === card.role ? "bg-gradient-primary" : "bg-muted"
                          }`}>
                            <Icon className={`h-6 w-6 ${
                              selectedRole === card.role ? "text-primary-foreground" : "text-foreground"
                            }`} />
                          </div>
                          <h3 className="font-semibold mb-1">{card.title}</h3>
                          <p className="text-xs text-muted-foreground">{card.description}</p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              <form onSubmit={handleAuth} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" type="text" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="john@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" name="password" type="password" placeholder="••••••••" required minLength={6} />
                </div>
                <Button type="submit" variant="hero" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <Link to="/" className="text-primary hover:underline">
              Back to Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
