import { useState } from 'react';
import { User, Save, AlertCircle } from 'lucide-react';
import { supabase, getSessionId } from '../lib/supabase';
import { Profile } from '../types';

interface ProfileSetupProps {
  profile: Profile | null;
  onSave: (profile: Profile) => void;
}

export default function ProfileSetup({ profile, onSave }: ProfileSetupProps) {
  const [form, setForm] = useState({
    name: profile?.name || '',
    age: profile?.age?.toString() || '60',
    weight_kg: profile?.weight_kg?.toString() || '',
    target_weight_kg: profile?.target_weight_kg?.toString() || '',
    height_cm: profile?.height_cm?.toString() || '170',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const bmi =
    form.weight_kg && form.height_cm
      ? (parseFloat(form.weight_kg) / Math.pow(parseFloat(form.height_cm) / 100, 2)).toFixed(1)
      : null;

  const bmiLabel = bmi
    ? parseFloat(bmi) < 18.5
      ? 'Underweight'
      : parseFloat(bmi) < 25
      ? 'Healthy Weight'
      : parseFloat(bmi) < 30
      ? 'Overweight'
      : 'Obese'
    : null;

  const bmiColor = bmi
    ? parseFloat(bmi) < 18.5
      ? 'text-sky-600'
      : parseFloat(bmi) < 25
      ? 'text-emerald-600'
      : parseFloat(bmi) < 30
      ? 'text-amber-600'
      : 'text-red-600'
    : '';

  async function handleSave() {
    if (!form.name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!form.weight_kg || !form.target_weight_kg) {
      setError('Please enter your current and target weight.');
      return;
    }
    setError('');
    setSaving(true);
    const sessionId = getSessionId();
    const payload = {
      session_id: sessionId,
      name: form.name.trim(),
      age: parseInt(form.age),
      weight_kg: parseFloat(form.weight_kg),
      target_weight_kg: parseFloat(form.target_weight_kg),
      height_cm: parseInt(form.height_cm),
      updated_at: new Date().toISOString(),
    };

    let data: Profile | null = null;
    let err = null;

    if (profile?.id) {
      // Update existing profile
      const result = await supabase
        .from('profiles')
        .update(payload)
        .eq('id', profile.id)
        .select()
        .maybeSingle();
      data = result.data;
      err = result.error;
    } else {
      // Create new profile using upsert to avoid duplicate errors
      const result = await supabase
        .from('profiles')
        .upsert(payload, { onConflict: 'session_id' })
        .select()
        .maybeSingle();
      data = result.data;
      err = result.error;
    }

    setSaving(false);
    if (err) {
      console.error('Save error:', err);
      setError('Failed to save profile. Please try again.');
    } else if (data) {
      setSuccess(true);
      onSave(data);
      setTimeout(() => setSuccess(false), 3000);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
          <User size={24} className="text-orange-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Your Profile</h2>
          <p className="text-gray-500 text-base">Set your goals and track your journey</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-6">
        <div>
          <label className="block text-base font-semibold text-gray-800 mb-2">Full Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="e.g. Rajesh Kumar"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-base font-semibold text-gray-800 mb-2">Age (years)</label>
            <input
              type="number"
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
              min={40}
              max={90}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <label className="block text-base font-semibold text-gray-800 mb-2">Height (cm)</label>
            <input
              type="number"
              value={form.height_cm}
              onChange={(e) => setForm({ ...form, height_cm: e.target.value })}
              min={130}
              max={220}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-base font-semibold text-gray-800 mb-2">Current Weight (kg)</label>
            <input
              type="number"
              value={form.weight_kg}
              onChange={(e) => setForm({ ...form, weight_kg: e.target.value })}
              placeholder="e.g. 82"
              step="0.1"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <label className="block text-base font-semibold text-gray-800 mb-2">Target Weight (kg)</label>
            <input
              type="number"
              value={form.target_weight_kg}
              onChange={(e) => setForm({ ...form, target_weight_kg: e.target.value })}
              placeholder="e.g. 74"
              step="0.1"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
        </div>

        {bmi && (
          <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Your Current BMI</p>
              <p className={`text-3xl font-bold ${bmiColor}`}>{bmi}</p>
            </div>
            <div className="text-right">
              <span className={`text-base font-semibold ${bmiColor}`}>{bmiLabel}</span>
              <p className="text-sm text-gray-400 mt-0.5">Based on your height & weight</p>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-xl p-3">
            <AlertCircle size={18} />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl p-3">
            <Save size={18} />
            <span className="text-sm font-medium">Profile saved successfully! ✅</span>
          </div>
        )}

        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold text-lg py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <Save size={20} />
          {saving ? 'Saving...' : 'Save Profile'}
        </button>
      </div>

      <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-5">
        <h3 className="font-bold text-amber-800 text-base mb-2">
          Healthy Weight Range for Indian Men (60+)
        </h3>
        <ul className="space-y-1 text-sm text-amber-700">
          <li>• BMI between 22–25 is considered ideal for older adults in India</li>
          <li>• Aim for 0.5–1 kg of fat loss per week — slow and sustainable</li>
          <li>• Muscle weighs more than fat — celebrate strength gains, not just scale numbers</li>
        </ul>
      </div>
    </div>
  );
}