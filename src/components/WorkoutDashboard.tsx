import { useState } from 'react';
import { Dumbbell, Calendar, ChevronDown, ChevronUp, Coffee } from 'lucide-react';
import { workouts } from '../data/workouts';
import ExerciseCard from './ExerciseCard';

const dayColors: Record<string, string> = {
  Monday: 'border-orange-400 bg-orange-500',
  Tuesday: 'border-sky-400 bg-sky-500',
  Wednesday: 'border-emerald-400 bg-emerald-500',
  Thursday: 'border-amber-400 bg-amber-500',
  Friday: 'border-teal-400 bg-teal-500',
};

const restDays = ['Saturday', 'Sunday'];

export default function WorkoutDashboard() {
  const [expandedDay, setExpandedDay] = useState<string | null>('Monday');

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
          <Dumbbell size={24} className="text-orange-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">5-Day Workout Plan</h2>
          <p className="text-gray-500 text-base">Joint-safe weight training for 60+</p>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6">
        <div className="flex items-start gap-2">
          <Calendar size={18} className="text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-bold text-amber-800">Weekly Schedule</p>
            <p className="text-sm text-amber-700 mt-0.5">
              Mon–Fri: Training &nbsp;|&nbsp; Sat–Sun: Full Rest &amp; Recovery
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {workouts.map((workout) => (
          <div
            key={workout.day}
            className={`rounded-2xl border-2 overflow-hidden transition-all ${workout.bgColor}`}
          >
            <button
              className="w-full p-4 flex items-center justify-between text-left"
              onClick={() => setExpandedDay(expandedDay === workout.day ? null : workout.day)}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm ${dayColors[workout.day]}`}
                >
                  {workout.day.slice(0, 3).toUpperCase()}
                </div>
                <div>
                  <p className="text-base font-bold text-gray-900">{workout.day}</p>
                  <p className={`text-sm font-semibold ${workout.color}`}>{workout.focus}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 bg-white border border-gray-200 px-2 py-1 rounded-full">
                  {workout.exercises.length} exercises
                </span>
                {expandedDay === workout.day ? (
                  <ChevronUp size={18} className="text-gray-500" />
                ) : (
                  <ChevronDown size={18} className="text-gray-500" />
                )}
              </div>
            </button>

            {expandedDay === workout.day && (
              <div className="px-4 pb-4 space-y-2.5 border-t border-gray-200 pt-3">
                {workout.exercises.map((exercise, idx) => (
                  <ExerciseCard key={exercise.name} exercise={exercise} index={idx} />
                ))}
                <div className="mt-3 bg-white border border-gray-200 rounded-xl p-3 flex items-start gap-2">
                  <Calendar size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-gray-500">
                    Rest 60–90 seconds between sets. Warm up for 5 minutes before starting (light walk or shoulder rolls).
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}

        {restDays.map((day) => (
          <div key={day} className="rounded-2xl border-2 border-gray-200 bg-gray-50 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gray-200 text-gray-500 font-bold text-sm">
                {day.slice(0, 3).toUpperCase()}
              </div>
              <div className="flex items-center gap-2">
                <div>
                  <p className="text-base font-bold text-gray-700">{day}</p>
                  <p className="text-sm text-gray-400">Rest & Recovery Day</p>
                </div>
                <Coffee size={16} className="text-gray-400 ml-2" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-sky-50 border border-sky-200 rounded-2xl p-5">
        <h3 className="font-bold text-sky-800 text-base mb-3">General Safety Guidelines</h3>
        <ul className="space-y-2 text-sm text-sky-700">
          <li className="flex items-start gap-2"><span className="font-bold mt-0.5">•</span> Always warm up for 5–10 minutes before training</li>
          <li className="flex items-start gap-2"><span className="font-bold mt-0.5">•</span> Prioritize form over heavy weight — especially for joints</li>
          <li className="flex items-start gap-2"><span className="font-bold mt-0.5">•</span> Stop immediately if you feel sharp joint pain (not muscle burn)</li>
          <li className="flex items-start gap-2"><span className="font-bold mt-0.5">•</span> Stay well-hydrated — drink water before, during, and after</li>
          <li className="flex items-start gap-2"><span className="font-bold mt-0.5">•</span> Consult your doctor before starting if you have heart or joint conditions</li>
        </ul>
      </div>
    </div>
  );
}
