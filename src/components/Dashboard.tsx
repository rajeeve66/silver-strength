import { Dumbbell, Apple, TrendingUp, User, ChevronRight, Award, Target, Calendar } from 'lucide-react';
import { Profile, Tab } from '../types';
import { workouts } from '../data/workouts';

interface DashboardProps {
  profile: Profile | null;
  onNavigate: (tab: Tab) => void;
}

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function Dashboard({ profile, onNavigate }: DashboardProps) {
  const todayName = days[new Date().getDay()];
  const todayWorkout = workouts.find((w) => w.day === todayName);

  const bmi =
    profile?.weight_kg && profile?.height_cm
      ? (profile.weight_kg / Math.pow(profile.height_cm / 100, 2)).toFixed(1)
      : null;

  const toGoal =
    profile?.weight_kg && profile?.target_weight_kg
      ? (profile.weight_kg - profile.target_weight_kg).toFixed(1)
      : null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-7">
        <h2 className="text-3xl font-bold text-gray-900">
          {profile?.name ? `Welcome, ${profile.name.split(' ')[0]}!` : 'Welcome!'}
        </h2>
        <p className="text-gray-500 text-base mt-1">
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>

      {!profile && (
        <div
          className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-5 mb-6 cursor-pointer hover:border-orange-400 transition-colors"
          onClick={() => onNavigate('profile')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                <User size={20} className="text-orange-600" />
              </div>
              <div>
                <p className="font-bold text-orange-800">Set Up Your Profile</p>
                <p className="text-sm text-orange-600">Enter your age, weight, and goal to get started</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-orange-400" />
          </div>
        </div>
      )}

      {profile && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-4">
            <p className="text-xs text-gray-400 font-medium mb-1">Weight</p>
            <p className="text-xl font-bold text-gray-900">{profile.weight_kg}kg</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-4">
            <p className="text-xs text-gray-400 font-medium mb-1">BMI</p>
            <p className="text-xl font-bold text-gray-900">{bmi || '—'}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-4">
            <p className="text-xs text-gray-400 font-medium mb-1">To Goal</p>
            <p className={`text-xl font-bold ${toGoal && parseFloat(toGoal) > 0 ? 'text-orange-500' : 'text-emerald-600'}`}>
              {toGoal ? `${toGoal}kg` : '—'}
            </p>
          </div>
        </div>
      )}

      <div
        className={`rounded-2xl p-5 mb-4 cursor-pointer border-2 transition-all ${
          todayWorkout
            ? `${todayWorkout.bgColor} hover:shadow-md`
            : 'bg-gray-50 border-gray-200'
        }`}
        onClick={() => onNavigate('workout')}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Calendar size={18} className={todayWorkout ? todayWorkout.color : 'text-gray-400'} />
            <p className="text-sm font-bold text-gray-500">TODAY'S WORKOUT</p>
          </div>
          <ChevronRight size={18} className="text-gray-400" />
        </div>
        {todayWorkout ? (
          <>
            <p className={`text-2xl font-bold ${todayWorkout.color}`}>{todayWorkout.focus}</p>
            <p className="text-sm text-gray-500 mt-1">{todayWorkout.exercises.length} exercises • {todayWorkout.day}</p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {todayWorkout.exercises.slice(0, 3).map((ex) => (
                <span key={ex.name} className="text-xs bg-white border border-gray-200 text-gray-600 px-2.5 py-1 rounded-full">
                  {ex.name}
                </span>
              ))}
              {todayWorkout.exercises.length > 3 && (
                <span className="text-xs bg-white border border-gray-200 text-gray-400 px-2.5 py-1 rounded-full">
                  +{todayWorkout.exercises.length - 3} more
                </span>
              )}
            </div>
          </>
        ) : (
          <>
            <p className="text-2xl font-bold text-gray-400">Rest Day</p>
            <p className="text-sm text-gray-400 mt-1">It's {todayName} — time to recover and recharge</p>
          </>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div
          className="bg-white border border-gray-200 rounded-2xl p-4 cursor-pointer hover:border-emerald-300 hover:shadow-sm transition-all"
          onClick={() => onNavigate('protein')}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Apple size={16} className="text-emerald-600" />
            </div>
            <p className="text-sm font-bold text-gray-800">Nutrition</p>
          </div>
          <p className="text-sm text-gray-500">Indian high-protein meal guide</p>
          <p className="text-emerald-600 text-xs font-semibold mt-2 flex items-center gap-1">
            8 foods • Meal plan <ChevronRight size={12} />
          </p>
        </div>

        <div
          className="bg-white border border-gray-200 rounded-2xl p-4 cursor-pointer hover:border-sky-300 hover:shadow-sm transition-all"
          onClick={() => onNavigate('tracker')}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center">
              <TrendingUp size={16} className="text-sky-600" />
            </div>
            <p className="text-sm font-bold text-gray-800">Progress</p>
          </div>
          <p className="text-sm text-gray-500">Track your weight daily</p>
          <p className="text-sky-600 text-xs font-semibold mt-2 flex items-center gap-1">
            Log & chart <ChevronRight size={12} />
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-5 text-white">
        <div className="flex items-start gap-3">
          <Award size={24} className="text-orange-200 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-white text-base mb-1">Your 5-Day Split at a Glance</p>
            <div className="grid grid-cols-1 gap-1 mt-2">
              {workouts.map((w) => (
                <div key={w.day} className="flex items-center justify-between text-sm">
                  <span className="text-orange-200">{w.day}</span>
                  <span className="text-white font-medium">{w.focus}</span>
                </div>
              ))}
              <div className="flex items-center justify-between text-sm">
                <span className="text-orange-200">Sat & Sun</span>
                <span className="text-white font-medium">Rest & Recovery</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 bg-sky-50 border border-sky-200 rounded-2xl p-4">
        <div className="flex items-start gap-2">
          <Target size={16} className="text-sky-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-bold text-sky-800">Daily Protein Target: 120g</p>
            <p className="text-xs text-sky-600 mt-0.5">
              Older adults need 1.5–2g protein per kg to prevent muscle loss. See the Nutrition tab for Indian food sources.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
