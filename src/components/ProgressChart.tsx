
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import useLocalStorage from '@/hooks/useLocalStorage';

interface CheckInEntry {
  id: string;
  date: string;
  mood: number;
  cravingLevel: number;
  notes: string;
}

const ProgressChart: React.FC = () => {
  const [checkIns] = useLocalStorage<CheckInEntry[]>('check-ins', []);
  
  // Sort check-ins by date
  const sortedCheckIns = [...checkIns].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  
  // Format data for the chart
  const chartData = sortedCheckIns.map(entry => ({
    date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    mood: entry.mood,
    cravingLevel: entry.cravingLevel,
  }));
  
  // If we have no check-ins, show a placeholder
  if (checkIns.length === 0) {
    return (
      <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 text-center">
        <h3 className="font-medium text-lg text-gray-700 mb-2">No data to display yet</h3>
        <p className="text-gray-500">Complete your first check-in to start tracking your progress.</p>
      </div>
    );
  }
  
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <h3 className="font-medium text-lg text-navy mb-6">Your Progress Over Time</h3>
      
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis 
              domain={[0, 10]} 
              ticks={[0, 2, 4, 6, 8, 10]} 
              tick={{ fontSize: 12 }}
            />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="mood"
              stroke="#3EABB8"
              strokeWidth={2}
              dot={{ stroke: '#3EABB8', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
              name="Mood"
            />
            <Line
              type="monotone"
              dataKey="cravingLevel"
              stroke="#FFCA58"
              strokeWidth={2}
              dot={{ stroke: '#FFCA58', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
              name="Craving Intensity"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 text-xs text-gray-500 text-center">
        <p>Track how your mood and cravings change over time</p>
      </div>
    </div>
  );
};

export default ProgressChart;
