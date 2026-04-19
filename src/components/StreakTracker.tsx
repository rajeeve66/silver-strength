import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Profile } from '../types';
import { Flame, Trophy, Calendar, CheckCircle } from 'lucide-react';

interface StreakTrackerProps {
  profile: Profile | null;
}

export default function StreakTracker({ profile }: StreakTrackerProps) {
  const [completedDates, setCompletedDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [marking, setMarking] = useState(false);
  const [message, setMessage] = useState('');

  const today = new Date().toISOString().split('T')[0];
  const todayCompleted = completedDates.includes(today);

  useEffect(() => {
    if (profile?.id) fetchStreaks();
    else setLoading(false);
  }, [profile]);

  async function fetchStreaks() {
    setLoading(true);
    const { data } = await supabase
      .from('workout_streaks')
      .select('workout_date')
      .eq('profile_id', profile!.id)
      .order('workout_date', { ascending: false });
    setCompletedDates((data || []).map((d) => d.workout_date));
    setLoading(false);
  }

  async function markToday() {
    if (!profile?.id || todayCompleted) return;
    setMarking(true);
    await supabase.from('workout_streaks').insert({
      profile_id: profile.id,
      workout_date: today,
      completed: true,
    });
    setMessage('🔥 Workout marked as done!');
    fetchStreaks();
    setTimeout(() => setMessage(''), 3000);
    setMarking(false);
  }

  async function unmarkToday() {
    if (!profile?.id || !todayCompleted) return;
    await supabase
      .from('workout_streaks')
      .delete()
      .eq('profile_id', profile.id)
      .eq('workout_date', today);
    setMessage('Unmarked today');
    fetchStreaks();
    setTimeout(() => setMessage(''), 2000);
  }

  // Calculate current streak
  function calcStreak() {
    if (completedDates.length === 0) return 0;
    let streak = 0;
    const sorted = [...completedDates].sort((a, b) => b.localeCompare(a));
    let check = new Date();
    // Allow today or yesterday to start streak
    const todayStr = new Date().toISOString().split('T')[0];
    const yesterdayStr = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (!sorted.includes(todayStr) && !sorted.includes(yesterdayStr)) return 0;
    if (!sorted.includes(todayStr)) check = new Date(Date.now() - 86400000);
    for (let i = 0; i < 365; i++) {
      const dateStr = check.toISOString().split('T')[0];
      if (sorted.includes(dateStr)) {
        streak++;
        check = new Date(check.getTime() - 86400000);
      } else {
        break;
      }
    }
    return streak;
  }

  // Last 14 days for calendar view
  function getLast14Days() {
    const days = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000);
      days.push({
        date: d.toISOString().split('T')[0],
        label: d.toLocaleDateString('en-IN', { weekday: 'short' }),
        day: d.getDate(),
      });
    }
    return days;
  }

  const currentStreak = calcStreak();
  const bestStreak = completedDates.length;
  const last14 = getLast14Days();

  if (!profile) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 text-center">
        <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-8">
          <Flame size={40} className="text-orange-400 mx-auto mb-3" />
          <p className="text-orange-800 font-bold text-lg">Set Up Your Profile First</p>
          <p className="text-orange-600 text-sm mt-1">Go to Profile tab to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Workout Streak</h2>
        <p className="text-gray-500 mt-1">Stay consistent — every day counts!</p>
      </div>

      {/* Streak Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-4 text-center">
          <Flame size={24} className="text-orange-500 mx-auto mb-1" />
          <p className="text-3xl font-bold text-orange-500">{currentStreak}</p>
          <p className="text-xs text-gray-400 font-medium mt-1">Current Streak</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-4 text-center">
          <Trophy size={24} className="text-yellow-500 mx-auto mb-1" />
          <p className="text-3xl font-bold text-yellow-500">{bestStreak}</p>
          <p className="text-xs text-gray-400 font-medium mt-1">Total Workouts</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-4 text-center">
          <Calendar size={24} className="text-sky-500 mx-auto mb-1" />
          <p className="text-3xl font-bold text-sky-500">
            {completedDates.filter(d => d.startsWith(
              new Date().toISOString().slice(0, 7)
            )).length}
          </p>
          <p className="text-xs text-gray-400 font-medium mt-1">This Month</p>
        </div>
      </div>

      {/* Mark Today Button */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-6">
        <p className="font-bold text-gray-800 mb-3">
          Today — {new Date().toLocaleDateString('en-IN', {
            weekday: 'long', day: 'numeric', month: 'long'
          })}
        </p>
        {todayCompleted ? (
          <div>
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl p-3 mb-3">
              <CheckCircle size={20} className="text-emerald-600" />
              <p className="text-emerald-700 font-bold">Workout Done! 🔥</p>
            </div>
            <button
              onClick={unmarkToday}
              className="text-sm text-gray-400 hover:text-red-400 transition-colors"
            >
              Undo mark
            </button>
          </div>
        ) : (
          <button
            onClick={markToday}
            disabled={marking}
            className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Flame size={22} />
            {marking ? 'Marking...' : 'Mark Workout as Done!'}
          </button>
        )}
        {message && (
          <p className="text-center text-sm font-medium text-emerald-600 mt-2">{message}</p>
        )}
      </div>

      {/* Last 14 Days Calendar */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-6">
        <p className="font-bold text-gray-800 mb-4">📅 Last 14 Days</p>
        <div className="grid grid-cols-7 gap-2">
          {last14.map(({ date, label, day }) => {
            const done = completedDates.includes(date);
            const isToday = date === today;
            return (
              <div key={date} className="text-center">
                <p className="text-xs text-gray-400 mb-1">{label}</p>
                <div className={`w-9 h-9 rounded-full flex items-center justify-center mx-auto text-sm font-bold
                  ${done
                    ? 'bg-orange-500 text-white'
                    : isToday
                    ? 'border-2 border-orange-400 text-orange-500'
                    : 'bg-gray-100 text-gray-400'
                  }`}>
                  {done ? '🔥' : day}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Motivation */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-5 text-white">
        <p className="font-bold text-lg mb-1">
          {currentStreak === 0 && '💪 Start your streak today!'}
          {currentStreak === 1 && '🔥 Great start! Keep going!'}
          {currentStreak >= 2 && currentStreak < 5 && `🔥 ${currentStreak} days strong!`}
          {currentStreak >= 5 && currentStreak < 10 && `🏆 Amazing! ${currentStreak} day streak!`}
          {currentStreak >= 10 && `🌟 Incredible! ${currentStreak} days in a row!`}
        </p>
        <p className="text-orange-100 text-sm">
          At 60+, consistency beats intensity. Even 20 minutes daily transforms your health!
        </p>
      </div>

    </div>
  );
}