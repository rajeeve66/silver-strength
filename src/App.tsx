import { useState, useEffect } from 'react';
import { supabase, getSessionId } from './lib/supabase';
import { Profile, Tab } from './types';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import WorkoutDashboard from './components/WorkoutDashboard';
import ProteinGuide from './components/ProteinGuide';
import WeightTracker from './components/WeightTracker';
import ProfileSetup from './components/ProfileSetup';
import StreakTracker from './components/StreakTracker';
import RecipeGuide from './components/RecipeGuide';
export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    const sessionId = getSessionId();
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('session_id', sessionId)
      .maybeSingle();
    setProfile(data);
    setLoadingProfile(false);
  }

  if (loadingProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Loading Silver Strength...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="pb-20">
        {activeTab === 'dashboard' && (
          <Dashboard profile={profile} onNavigate={setActiveTab} />
        )}
        {activeTab === 'workout' && <WorkoutDashboard />}
        {activeTab === 'streak' && <StreakTracker profile={profile} />}
        {activeTab === 'recipes' && <RecipeGuide profile={profile} />}
        {activeTab === 'protein' && <ProteinGuide />}
        {activeTab === 'tracker' && <WeightTracker profile={profile} />}
        {activeTab === 'profile' && (
          <ProfileSetup profile={profile} onSave={setProfile} />
        )}
      </main>
    </div>
  );
}
