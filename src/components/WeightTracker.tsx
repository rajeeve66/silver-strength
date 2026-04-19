import { useState, useEffect } from 'react';
import { supabase, getSessionId } from '../lib/supabase';
import { Profile, WeightLog } from '../types';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts';
import { Scale, TrendingDown, TrendingUp, Plus, Trash2 } from 'lucide-react';

interface WeightTrackerProps {
  profile: Profile | null;
}

export default function WeightTracker({ profile }: WeightTrackerProps) {
  const [logs, setLogs] = useState<WeightLog[]>([]);
  const [newWeight, setNewWeight] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (profile?.id) fetchLogs();
    else setLoading(false);
  }, [profile]);

  async function fetchLogs() {
    setLoading(true);
    const { data } = await supabase
      .from('weight_logs')
      .select('*')
      .eq('profile_id', profile!.id)
      .order('logged_date', { ascending: true })
      .limit(30);
    setLogs(data || []);
    setLoading(false);
  }

  async function addWeight() {
    if (!newWeight || !profile?.id) return;
    setSaving(true);
    const { error } = await supabase.from('weight_logs').insert({
      profile_id: profile.id,
      weight_kg: parseFloat(newWeight),
      note: note,
      logged_date: new Date().toISOString().split('T')[0],
    });
    if (!error) {
      setMessage('✅ Weight logged!');
      setNewWeight('');
      setNote('');
      fetchLogs();
      setTimeout(() => setMessage(''), 3000);
    }
    setSaving(false);
  }

  async function deleteLog(id: string) {
    await supabase.from('weight_logs').delete().eq('id', id);
    fetchLogs();
  }

  // Chart data
  const chartData = logs.map((log) => ({
    date: new Date(log.logged_date).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short'
    }),
    weight: log.weight_kg,
  }));

  // Stats
  const latest = logs[logs.length - 1]?.weight_kg;
  const first = logs[0]?.weight_kg;
  const change = latest && first ? (latest - first).toFixed(1) : null;
  const isLoss = change && parseFloat(change) < 0;

  if (!profile) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 text-center">
        <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-8">
          <Scale size={40} className="text-orange-400 mx-auto mb-3" />
          <p className="text-orange-800 font-bold text-lg">Set Up Your Profile First</p>
          <p className="text-orange-600 text-sm mt-1">
            Go to Profile tab to enter your details
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Weight Tracker</h2>
        <p className="text-gray-500 mt-1">Log daily and watch your progress</p>
      </div>

      {/* Stats Row */}
      {logs.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-4">
            <p className="text-xs text-gray-400 font-medium mb-1">Current</p>
            <p className="text-xl font-bold text-gray-900">{latest}kg</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-4">
            <p className="text-xs text-gray-400 font-medium mb-1">Target</p>
            <p className="text-xl font-bold text-orange-500">
              {profile.target_weight_kg}kg
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-4">
            <p className="text-xs text-gray-400 font-medium mb-1">Change</p>
            <div className="flex items-center gap-1">
              {isLoss
                ? <TrendingDown size={16} className="text-emerald-500" />
                : <TrendingUp size={16} className="text-orange-500" />
              }
              <p className={`text-xl font-bold ${isLoss ? 'text-emerald-600' : 'text-orange-500'}`}>
                {change}kg
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Chart */}
      {logs.length > 1 && (
        <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-6">
          <p className="font-bold text-gray-800 mb-4">📈 Weight Progress (Last 30 days)</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: '#9ca3af' }}
                tickLine={false}
              />
              <YAxis
                domain={['dataMin - 1', 'dataMax + 1']}
                tick={{ fontSize: 11, fill: '#9ca3af' }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                  fontSize: '13px'
                }}
                formatter={(value) => [`${value} kg`, 'Weight']}
              />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="#f97316"
                strokeWidth={2.5}
                dot={{ fill: '#f97316', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Log New Weight */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-6">
        <p className="font-bold text-gray-800 mb-4">➕ Log Today's Weight</p>
        <div className="flex gap-3 mb-3">
          <input
            type="number"
            step="0.1"
            placeholder="Weight in kg (e.g. 72.5)"
            value={newWeight}
            onChange={(e) => setNewWeight(e.target.value)}
            className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400"
          />
        </div>
        <input
          type="text"
          placeholder="Note (optional — e.g. after morning walk)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 mb-3"
        />
        <button
          onClick={addWeight}
          disabled={saving || !newWeight}
          className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold text-sm hover:bg-orange-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Plus size={18} />
          {saving ? 'Saving...' : 'Log Weight'}
        </button>
        {message && (
          <p className="text-emerald-600 text-sm font-medium mt-2 text-center">
            {message}
          </p>
        )}
      </div>

      {/* Log History */}
      {logs.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <p className="font-bold text-gray-800 mb-4">📋 History</p>
          <div className="space-y-2">
            {[...logs].reverse().map((log) => (
              <div
                key={log.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
              >
                <div>
                  <p className="font-bold text-gray-800 text-sm">{log.weight_kg} kg</p>
                  <p className="text-xs text-gray-400">
                    {new Date(log.logged_date).toLocaleDateString('en-IN', {
                      weekday: 'short', day: 'numeric', month: 'short'
                    })}
                    {log.note ? ` • ${log.note}` : ''}
                  </p>
                </div>
                <button
                  onClick={() => deleteLog(log.id)}
                  className="text-gray-300 hover:text-red-400 transition-colors p-1"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && logs.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          <Scale size={40} className="mx-auto mb-3 opacity-30" />
          <p className="font-medium">No weight logs yet</p>
          <p className="text-sm mt-1">Log your first weight above!</p>
        </div>
      )}

    </div>
  );
}