-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('student', 'teacher', 'parent');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  profile_image TEXT,
  class_grade TEXT,
  subjects TEXT[] DEFAULT '{}',
  available_study_hours INTEGER DEFAULT 2,
  xp INTEGER DEFAULT 0,
  streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

-- Create function to check if user has role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Create badges table
CREATE TABLE public.badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  rarity TEXT NOT NULL,
  icon TEXT NOT NULL,
  xp_required INTEGER DEFAULT 0,
  streak_required INTEGER DEFAULT 0,
  tasks_required INTEGER DEFAULT 0,
  condition_type TEXT NOT NULL,
  condition_value INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create user_badges table
CREATE TABLE public.user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  badge_id UUID REFERENCES public.badges(id) ON DELETE CASCADE NOT NULL,
  earned_at TIMESTAMPTZ DEFAULT now(),
  progress INTEGER DEFAULT 0,
  UNIQUE (user_id, badge_id)
);

-- Create xp_logs table
CREATE TABLE public.xp_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  xp_change INTEGER NOT NULL,
  reason TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create streak_logs table
CREATE TABLE public.streak_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  maintained BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, date)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.xp_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.streak_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- RLS Policies for user_roles
CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'teacher'));

-- RLS Policies for badges
CREATE POLICY "Anyone can view badges"
  ON public.badges FOR SELECT
  USING (true);

-- RLS Policies for user_badges
CREATE POLICY "Users can view all user badges"
  ON public.user_badges FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own badges"
  ON public.user_badges FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own badges"
  ON public.user_badges FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for xp_logs
CREATE POLICY "Users can view own xp logs"
  ON public.xp_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own xp logs"
  ON public.xp_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for streak_logs
CREATE POLICY "Users can view own streak logs"
  ON public.streak_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own streak logs"
  ON public.streak_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own streak logs"
  ON public.streak_logs FOR UPDATE
  USING (auth.uid() = user_id);

-- Create function to update profile timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', 'User'),
    NEW.email
  );
  
  -- Insert default role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, COALESCE((NEW.raw_user_meta_data->>'role')::app_role, 'student'));
  
  RETURN NEW;
END;
$$;

-- Create trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Insert default badges
INSERT INTO public.badges (name, description, category, rarity, icon, xp_required, streak_required, tasks_required, condition_type, condition_value) VALUES
('First Steps', 'Complete your first task', 'tasks', 'common', 'Footprints', 0, 0, 1, 'tasks', 1),
('Rookie Scholar', 'Earn your first 100 XP', 'xp', 'common', 'BookOpen', 100, 0, 0, 'xp', 100),
('Getting Started', 'Maintain a 3-day streak', 'streak', 'common', 'Calendar', 0, 3, 0, 'streak', 3),
('Task Master', 'Complete 10 tasks', 'tasks', 'uncommon', 'CheckCircle', 0, 0, 10, 'tasks', 10),
('Knowledge Seeker', 'Earn 500 XP', 'xp', 'uncommon', 'Star', 500, 0, 0, 'xp', 500),
('Week Warrior', 'Maintain a 7-day streak', 'streak', 'uncommon', 'Flame', 0, 7, 0, 'streak', 7),
('Dedicated Student', 'Complete 25 tasks', 'tasks', 'rare', 'Award', 0, 0, 25, 'tasks', 25),
('XP Champion', 'Earn 1000 XP', 'xp', 'rare', 'Trophy', 1000, 0, 0, 'xp', 1000),
('Streak Legend', 'Maintain a 30-day streak', 'streak', 'rare', 'Zap', 0, 30, 0, 'streak', 30),
('Academic Excellence', 'Complete 50 tasks', 'tasks', 'epic', 'Crown', 0, 0, 50, 'tasks', 50),
('XP Prodigy', 'Earn 2500 XP', 'xp', 'epic', 'Sparkles', 2500, 0, 0, 'xp', 2500),
('Unstoppable', 'Maintain a 60-day streak', 'streak', 'epic', 'Rocket', 0, 60, 0, 'streak', 60),
('Master Scholar', 'Earn 5000 XP', 'xp', 'legendary', 'Medal', 5000, 0, 0, 'xp', 5000),
('Century Club', 'Complete 100 tasks', 'tasks', 'legendary', 'Target', 0, 0, 100, 'tasks', 100),
('Streak Immortal', 'Maintain a 100-day streak', 'streak', 'legendary', 'Infinity', 0, 100, 0, 'streak', 100);