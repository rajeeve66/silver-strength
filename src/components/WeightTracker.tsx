import { useState, useEffect } from 'react';
import { TrendingDown, TrendingUp, Plus, Trash2, TrendingUp as ChartIcon, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Profile, WeightLog } from '../types';
import WeightChart from './WeightChart';

interface WeightTrackerProps {
  profile: Profile | null;
}

export default function WeightTracker({ profile }: WeightTrackerProps) {
  const [logs, setLogs] = useState<WeightLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [newWeight, setNewWeight] = useState('');
  const [newNote, setNewNote] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (profile?.id) {
      fetchLogs();
    } else {
      setLoading(false);
    }
  }, [profile]);

  async function fetchLogs() {
    setLoading(true);
    const { data } = await supabase
      .from('weight_logs')
      .select('*')
      .eq('profile_id', profile!.id)
      .order('logged_date', { ascending: false });
    setLogs(data || []);
    setLoading(false);
  }

  async function handleAdd() {
    if (!newWeight || isNaN(parseFloat(newWeight))) {
      setError('Please enter a valid weight.');
      return;
    }
    if (!profile?.id) {
      setError('Please set up your profile first.');
      return;
    }
    setError('');
    setSaving(true);

    const today = new Date().toISOString().split('T')[0];
    const existing = logs.find((l) => l.logged_date === today);

    if (existing) {
      const { error: err } = await supabase
        .from('weight_logs')
        .update({ weight_kg: parseFloat(newWeight), note: newNote })
        .eq('id', existing.id);
      if (!err) {
        setNewWeight('');
        setNewNote('');
        fetchLogs();
      }
    } else {
      const { error: err } = await supabase.from('weight_logs').insert({
        profile_id: profile.id,
        weight_kg: parseFloat(newWeight),
        note: newNote,
        logged_date: today,
      });
      if (!err) {
        setNewWeight('');
        setNewNote('');
        fetchLogs();
      }
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    await supabase.from('weight_logs').delete().eq('id', id);
    fetchLogs();
  }

  const sorted = [...logs].sort((a, b) => a.logged_date.localeCompare(b.logged_date));
  const latest = sorted[sorted.length - 1];
  const previous = sorted[sorted.length - 2];
  const change = latest && previous ? (latest.weight_kg - previous.weight_kg).toFixed(1) : null;
  const totalChange =
    sorted.length >= 2 ? (sorted[sorted.length - 1].weight_kg - sorted[0].weight_kg).toFixed(1) : null;

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  if (!profile?.id) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center">
          <AlertCircle size={32} className="text-amber-500 mx-auto mb-3" />
          <p className="text-amber-800 font-semibold text-lg">Profile Required</p>
          <p className="text-amber-700 text-sm mt-1">Please complete your profile setup before tracking weight.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center">
          <ChartIcon size={24} className="text-sky-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Weight Tracker</h2>
          <p className="text-gray-500 text-base">Log daily & monitor your progress</p>
        </div>
      </div>

      {logs.length >= 2 && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-4 text-center">
            <p className="text-xs text-gray-500 font-medium mb-1">Current</p>
            <p className="text-2xl font-bold text-gray-900">{latest?.weight_kg}kg</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-4 text-center">
            <p className="text-xs text-gray-500 font-medium mb-1">Since Last</p>
            {change !== null && (
              <div className="flex items-center justify-center gap-1">
                {parseFloat(change) < 0 ? (
                  <TrendingDown size={18} className="text-emerald-500" />
                ) : (
                  <TrendingUp size={18} className="text-red-400" />
                )}
                <p className={`text-2xl font-bold ${parseFloat(change) < 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                  {parseFloat(change) > 0 ? '+' : ''}{change}kg
                </p>
              </div>
            )}
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-4 text-center">
            <p className="text-xs text-gray-500 font-medium mb-1">Total Change</p>
            {totalChange !== null && (
              <p className={`text-2xl font-bold ${parseFloat(totalChange) < 0 ? 'text-emerald-600' : 'text-gray-700'}`}>
                {parseFloat(totalChange) > 0 ? '+' : ''}{totalChange}kg
              </p>
            )}
          </div>
        </div>
      )}

      {logs.length >= 1 && (
        <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-6">
          <h3 className="text-base font-bold text-gray-800 mb-4">Progress Chart</h3>
          <WeightChart logs={logs} targetWeight={profile.target_weight_kg} />
          <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-1 rounded bg-orange-500" />
              <span>Your weight</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-px border-t-2 border-dashed border-emerald-500" />
              <span>Target ({profile.target_weight_kg}kg)</span>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-6">
        <h3 className="text-base font-bold text-gray-800 mb-4">Log Today's Weight</h3>
        <div className="flex gap-3">
          <input
            type="number"
            value={newWeight}
            onChange={(e) => setNewWeight(e.target.value)}
            placeholder="Weight in kg"
            step="0.1"
            className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <button
            onClick={handleAdd}
            disabled={saving}
            className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold px-5 py-3 rounded-xl transition-colors flex items-center gap-2"
          >
            <Plus size={20} />
            {saving ? '...' : 'Log'}
          </button>
        </div>
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Optional note (e.g. after workout, morning)"
          className="w-full mt-3 border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        {error && (
          <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle size={14} /> {error}
          </p>
        )}
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-400">Loading logs...</div>
      ) : logs.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-2xl border border-gray-200">
          <p className="text-gray-400 text-base">No entries yet. Log your first weight above!</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-base font-bold text-gray-800">History</h3>
            <span className="text-sm text-gray-400">{logs.length} entries</span>
          </div>
          <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
            {logs.map((log) => (
              <div key={log.id} className="px-5 py-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div>
                  <p className="text-base font-bold text-gray-900">{log.weight_kg} kg</p>
                  <p className="text-sm text-gray-400">{formatDate(log.logged_date)}</p>
                  {log.note && <p className="text-xs text-gray-500 mt-0.5 italic">{log.note}</p>}
                </div>
                <button
                  onClick={() => handleDelete(log.id)}
                  className="text-gray-300 hover:text-red-400 transition-colors p-1.5 rounded-lg hover:bg-red-50"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
