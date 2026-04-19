import { Tab } from '../types';
import {
  LayoutDashboard, Dumbbell, Apple,
  TrendingUp, User, Flame
} from 'lucide-react';

interface NavigationProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const tabs: { id: Tab; label: string; icon: any }[] = [
  { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
  { id: 'workout', label: 'Workouts', icon: Dumbbell },
  { id: 'protein', label: 'Nutrition', icon: Apple },
  { id: 'tracker', label: 'Progress', icon: TrendingUp },
  { id: 'streak', label: 'Streak', icon: Flame },
  { id: 'profile', label: 'Profile', icon: User },
];

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <>
      {/* TOP HEADER */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center">
            <Dumbbell size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 leading-none">
              Silver Strength
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">Your 60+ Fitness Companion</p>
          </div>
        </div>
      </header>

      {/* BOTTOM NAV — Like WhatsApp */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-2xl mx-auto">
          <div className="flex">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onTabChange(id)}
                className={`flex-1 flex flex-col items-center justify-center py-2 px-1 transition-all ${
                  activeTab === id
                    ? 'text-orange-500'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <div className={`p-1.5 rounded-xl transition-all ${
                  activeTab === id ? 'bg-orange-50' : ''
                }`}>
                  <Icon size={22} />
                </div>
                <span className={`text-xs font-medium mt-0.5 ${
                  activeTab === id ? 'text-orange-500' : 'text-gray-400'
                }`}>
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}