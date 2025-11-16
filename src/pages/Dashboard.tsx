import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Trophy, 
  Flame, 
  Star, 
  CheckCircle2, 
  Circle,
  TrendingUp,
  Calendar,
  BookOpen,
  Target
} from "lucide-react";

const Dashboard = () => {
  const [tasks] = useState([
    { id: 1, subject: "Mathematics", task: "Complete Chapter 5 exercises", due: "Today", completed: false },
    { id: 2, subject: "Physics", task: "Watch lecture on Thermodynamics", due: "Today", completed: true },
    { id: 3, subject: "Chemistry", task: "Lab report submission", due: "Tomorrow", completed: false },
    { id: 4, subject: "English", task: "Essay on Shakespeare", due: "In 2 days", completed: false },
  ]);

  const weeklyProgress = [
    { day: "Mon", hours: 3, completed: true },
    { day: "Tue", hours: 2.5, completed: true },
    { day: "Wed", hours: 4, completed: true },
    { day: "Thu", hours: 3.5, completed: true },
    { day: "Fri", hours: 2, completed: false },
    { day: "Sat", hours: 0, completed: false },
    { day: "Sun", hours: 0, completed: false },
  ];

  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const completionRate = Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Welcome back, Alex! 👋</h1>
              <p className="text-muted-foreground mt-1">Ready to continue your learning streak?</p>
            </div>
            <Button variant="hero">
              <Target className="mr-2 h-4 w-4" />
              Set New Goals
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-2 border-primary/20 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total XP</p>
                  <p className="text-3xl font-bold text-primary">2,450</p>
                  <p className="text-xs text-muted-foreground mt-1">+125 this week</p>
                </div>
                <div className="p-3 rounded-full bg-gradient-primary">
                  <Star className="h-6 w-6 text-primary-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-achievement/20 shadow-achievement">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Current Streak</p>
                  <p className="text-3xl font-bold text-achievement">14 Days</p>
                  <p className="text-xs text-muted-foreground mt-1">Best: 21 days</p>
                </div>
                <div className="p-3 rounded-full bg-gradient-achievement">
                  <Flame className="h-6 w-6 text-achievement-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-success/20 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Tasks Completed</p>
                  <p className="text-3xl font-bold text-success">{completedTasks}/{totalTasks}</p>
                  <p className="text-xs text-muted-foreground mt-1">{completionRate}% completion</p>
                </div>
                <div className="p-3 rounded-full bg-gradient-success">
                  <CheckCircle2 className="h-6 w-6 text-success-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-border shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Study Time</p>
                  <p className="text-3xl font-bold">15.5h</p>
                  <p className="text-xs text-muted-foreground mt-1">This week</p>
                </div>
                <div className="p-3 rounded-full bg-muted">
                  <TrendingUp className="h-6 w-6 text-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Today's Tasks */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Today's Tasks
                  </CardTitle>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-start gap-3 p-4 rounded-lg border transition-smooth hover:shadow-sm ${
                      task.completed ? "bg-muted/50 border-success/30" : "bg-card border-border"
                    }`}
                  >
                    <div className="mt-1">
                      {task.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-success" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">
                          {task.subject}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{task.due}</span>
                      </div>
                      <p className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                        {task.task}
                      </p>
                    </div>
                    {!task.completed && (
                      <Button variant="ghost" size="sm">
                        Mark Done
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Weekly Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Weekly Study Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between gap-2 h-48">
                  {weeklyProgress.map((day) => (
                    <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full bg-muted rounded-t-lg relative overflow-hidden" style={{ height: '100%' }}>
                        <div
                          className={`absolute bottom-0 w-full rounded-t-lg transition-smooth ${
                            day.completed ? "bg-gradient-success" : "bg-gradient-primary opacity-50"
                          }`}
                          style={{ height: `${(day.hours / 5) * 100}%` }}
                        />
                      </div>
                      <div className="text-center">
                        <p className="text-xs font-medium">{day.day}</p>
                        <p className="text-xs text-muted-foreground">{day.hours}h</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Level Progress */}
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Level Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">Level 12</p>
                    <p className="text-sm text-muted-foreground">Dedicated Learner</p>
                  </div>
                  <div className="p-3 rounded-full bg-gradient-primary">
                    <Trophy className="h-6 w-6 text-primary-foreground" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>2,450 / 3,000 XP</span>
                    <span className="text-muted-foreground">550 to go</span>
                  </div>
                  <Progress value={82} className="h-3" />
                </div>
                <p className="text-xs text-muted-foreground">
                  Complete 3 more tasks to reach Level 13!
                </p>
              </CardContent>
            </Card>

            {/* Recent Badges */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Badges</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                  <div className="p-2 rounded-full bg-gradient-achievement">
                    <Trophy className="h-5 w-5 text-achievement-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Streak Master</p>
                    <p className="text-xs text-muted-foreground">14 day streak</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                  <div className="p-2 rounded-full bg-gradient-success">
                    <Star className="h-5 w-5 text-success-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Quick Learner</p>
                    <p className="text-xs text-muted-foreground">Completed 10 tasks</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  View All Badges
                </Button>
              </CardContent>
            </Card>

            {/* Timetable Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Today's Schedule</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-muted-foreground">09:00</span>
                  <span className="font-medium">Mathematics</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-achievement" />
                  <span className="text-muted-foreground">11:00</span>
                  <span className="font-medium">Physics</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-success" />
                  <span className="text-muted-foreground">14:00</span>
                  <span className="font-medium">Chemistry</span>
                </div>
                <Button variant="ghost" size="sm" className="w-full mt-2">
                  View Full Timetable
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
