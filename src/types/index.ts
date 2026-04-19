export interface Profile {
  id: string;
  session_id: string;
  name: string;
  age: number;
  weight_kg: number;
  target_weight_kg: number;
  height_cm: number;
  created_at: string;
  updated_at: string;
}

export interface WeightLog {
  id: string;
  profile_id: string;
  weight_kg: number;
  note: string;
  logged_date: string;
  created_at: string;
}

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  safeFormTip: string;
}

export interface WorkoutDay {
  day: string;
  focus: string;
  color: string;
  bgColor: string;
  exercises: Exercise[];
}

export interface ProteinFood {
  name: string;
  serving: string;
  protein: number;
  description: string;
  meals: string[];
  icon: string;
}

export type Tab = 'dashboard' | 'workout' | 'protein' | 'tracker' | 'profile' | 'streak' | 'recipes';
