import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface JournalEntry {
  id: number;
  timestamp: string;
  text: string;
  mood: string;
  risk_score: number;
  ai_response: string;
}

interface PatternData {
  status: string;
  message: string;
  color: string;
  breakdown: { good: number; stress: number; risk: number };
}

const InsightsPage = () => {
  const [history, setHistory] = useState<JournalEntry[]>([]);
  const [pattern, setPattern] = useState<PatternData | null>(null);

  // Function to load data
  const loadData = () => {
    fetch('http://127.0.0.1:8001/history')
      .then(res => res.json())
      .then(data => setHistory(data))
      .catch(err => console.error("History Error:", err));

    fetch('http://127.0.0.1:8001/pattern')
      .then(res => res.json())
      .then(data => setPattern(data))
      .catch(err => console.error("Pattern Error:", err));
  };

  useEffect(() => {
    loadData();
  }, []);

  // Function to DELETE data with Debug Alerts
  const handleClearHistory = async () => {
    // 1. Ask for confirmation
    if (!confirm("Are you sure you want to delete ALL history? This cannot be undone.")) {
      return; // Stop if they click Cancel
    }

    try {
      // 2. Send Delete Command
      const response = await fetch('http://127.0.0.1:8001/clear_data', { 
        method: 'DELETE' 
      });

      // 3. Check the result
      if (response.ok) {
        alert("✅ Success: Database deleted!");
        setHistory([]); // Wipe the list instantly
        setPattern(null); // Wipe the colored box
      } else {
        alert("❌ Server Error: " + response.status + " " + response.statusText);
      }
    } catch (error) {
      alert("❌ Connection Failed: Is the Python terminal running?");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">My Mental Health Log</h1>
            <p className="text-slate-500">Tracking your journey, one conversation at a time.</p>
          </div>
          
          {/* RESET BUTTON */}
          <button 
            onClick={handleClearHistory}
            className="bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-100 transition-colors"
          >
            🗑 Clear History
          </button>
        </div>

        {/* --- PATTERN CARD --- */}
        {pattern && (
          <div className={`mb-8 p-6 rounded-2xl border-l-8 shadow-sm bg-white
            ${pattern.color === 'red' ? 'border-red-500' : 
              pattern.color === 'orange' ? 'border-orange-400' : 
              pattern.color === 'green' ? 'border-green-500' : 'border-slate-300'}`}>
            
            <h2 className="text-xl font-bold text-slate-800 mb-1">
              Weekly Pattern: <span className={
                pattern.color === 'red' ? 'text-red-600' : 
                pattern.color === 'orange' ? 'text-orange-500' : 
                pattern.color === 'green' ? 'text-green-600' : 'text-slate-600'
              }>{pattern.status}</span>
            </h2>
            <p className="text-slate-600 mb-4">{pattern.message}</p>
            
            <div className="flex gap-4 text-sm font-bold opacity-80">
              <span className="text-green-600">Positive: {pattern.breakdown.good}</span>
              <span className="text-orange-500">Stress: {pattern.breakdown.stress}</span>
              <span className="text-red-600">Risk: {pattern.breakdown.risk}</span>
            </div>
          </div>
        )}

        {/* --- GRAPH --- */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8">
          <h3 className="text-lg font-bold text-slate-700 mb-4">7-Day Stress Level</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={history.slice().reverse()}>
                <XAxis dataKey="timestamp" tick={false} />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Line type="monotone" dataKey="risk_score" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* --- LOGS LIST --- */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-700">Recent Logs</h3>
          {history.length === 0 && <p className="text-slate-400">No data found.</p>}
          
          {history.map((entry) => (
            <div key={entry.id} className="bg-white p-5 rounded-xl border border-slate-200">
              <div className="flex justify-between items-start mb-2">
                 <span className="text-xs font-bold text-slate-400 uppercase">
                    {new Date(entry.timestamp).toLocaleString()}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-slate-100 text-slate-600">
                    {entry.mood}
                  </span>
              </div>
              <p className="text-slate-800">"{entry.text}"</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default InsightsPage;