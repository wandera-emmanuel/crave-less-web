
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { CheckCircle, Calendar } from 'lucide-react';
import { toast } from "@/components/ui/sonner";
import useLocalStorage from '@/hooks/useLocalStorage';

interface CheckInEntry {
  id: string;
  date: string;
  mood: number;
  cravingLevel: number;
  notes: string;
}

const DailyCheckIn: React.FC = () => {
  const [checkIns, setCheckIns] = useLocalStorage<CheckInEntry[]>('check-ins', []);
  const [mood, setMood] = useState<number>(5);
  const [cravingLevel, setCravingLevel] = useState<number>(5);
  const [notes, setNotes] = useState<string>('');
  const [hasCheckedIn, setHasCheckedIn] = useLocalStorage<boolean>('has-checked-in-today', false);

  const todayFormatted = new Date().toISOString().split('T')[0];

  const handleSubmit = () => {
    const newCheckIn: CheckInEntry = {
      id: crypto.randomUUID(),
      date: todayFormatted,
      mood,
      cravingLevel,
      notes,
    };
    
    setCheckIns([...checkIns, newCheckIn]);
    setHasCheckedIn(true);
    setNotes('');
    
    toast("Check-in complete", {
      description: "Great job on your daily reflection!",
    });
  };

  const resetCheckIn = () => {
    setHasCheckedIn(false);
    setMood(5);
    setCravingLevel(5);
    setNotes('');
  };

  const getMoodEmoji = (moodValue: number) => {
    if (moodValue <= 2) return '😞';
    if (moodValue <= 4) return '😕';
    if (moodValue <= 6) return '😐';
    if (moodValue <= 8) return '🙂';
    return '😄';
  };

  const getCravingEmoji = (cravingValue: number) => {
    if (cravingValue <= 2) return '🙌';
    if (cravingValue <= 4) return '👍';
    if (cravingValue <= 6) return '👋';
    if (cravingValue <= 8) return '😬';
    return '😰';
  };

  return (
    <section id="check-in" className="py-12 bg-gradient-to-b from-white to-light-blue/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center gradient-heading">Daily Check-In</h2>
        
        <div className="max-w-2xl mx-auto">
          {hasCheckedIn ? (
            <div className="bg-white rounded-xl p-8 shadow-sm text-center border border-green/30">
              <CheckCircle className="mx-auto h-16 w-16 text-green mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">You've checked in today!</h3>
              <p className="text-gray-600 mb-6">
                Great job on maintaining your daily mindfulness practice. Come back tomorrow for your next check-in.
              </p>
              <Button onClick={resetCheckIn} variant="outline">
                Reset (For Demo)
              </Button>
            </div>
          ) : (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="h-5 w-5 text-teal" />
                <h3 className="font-semibold text-lg">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</h3>
              </div>
              
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">How are you feeling today?</label>
                    <span className="text-2xl">{getMoodEmoji(mood)}</span>
                  </div>
                  <Slider
                    value={[mood]}
                    min={1}
                    max={10}
                    step={1}
                    onValueChange={(vals) => setMood(vals[0])}
                    className="my-4"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Not great</span>
                    <span>Amazing</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">Craving intensity</label>
                    <span className="text-2xl">{getCravingEmoji(cravingLevel)}</span>
                  </div>
                  <Slider
                    value={[cravingLevel]}
                    min={1}
                    max={10}
                    step={1}
                    onValueChange={(vals) => setCravingLevel(vals[0])}
                    className="my-4"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>None</span>
                    <span>Very intense</span>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Notes (triggers, feelings, accomplishments)
                  </label>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="What's on your mind today? Any triggers or victories to note?"
                    className="min-h-32"
                  />
                </div>
                
                <Button 
                  onClick={handleSubmit} 
                  className="w-full bg-teal hover:bg-teal/90"
                >
                  Complete Daily Check-In
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DailyCheckIn;
