import { useState } from 'react';
import { ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { Exercise } from '../types';

interface ExerciseCardProps {
  exercise: Exercise;
  index: number;
}

export default function ExerciseCard({ exercise, index }: ExerciseCardProps) {
  const [showTip, setShowTip] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <span className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center text-sm font-bold text-gray-600 flex-shrink-0 mt-0.5">
              {index + 1}
            </span>
            <div>
              <h4 className="text-base font-bold text-gray-900">{exercise.name}</h4>
              <p className="text-sm text-gray-500 mt-0.5">
                {exercise.sets} sets &times; {exercise.reps} reps
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowTip(!showTip)}
            className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors flex-shrink-0"
          >
            <ShieldCheck size={13} />
            Safe Form
            {showTip ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>
        </div>

        {showTip && (
          <div className="mt-3 ml-10 bg-emerald-50 border border-emerald-200 rounded-lg p-3">
            <p className="text-sm text-emerald-800 leading-relaxed">{exercise.safeFormTip}</p>
          </div>
        )}
      </div>
    </div>
  );
}
