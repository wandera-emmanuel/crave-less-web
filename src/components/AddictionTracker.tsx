
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Plus } from 'lucide-react';
import useLocalStorage from '@/hooks/useLocalStorage';

interface Addiction {
  id: string;
  name: string;
  lastUsed: string | null;
  streakDays: number;
}

const AddictionTracker: React.FC = () => {
  const [addictions, setAddictions] = useLocalStorage<Addiction[]>('addictions', []);
  const [newAddiction, setNewAddiction] = useState('');

  const addAddiction = () => {
    if (newAddiction.trim() === '') return;
    
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    
    const newItem: Addiction = {
      id: crypto.randomUUID(),
      name: newAddiction.trim(),
      lastUsed: today,
      streakDays: 0,
    };
    
    setAddictions([...addictions, newItem]);
    setNewAddiction('');
  };

  const removeAddiction = (id: string) => {
    setAddictions(addictions.filter(addiction => addiction.id !== id));
  };

  const resetStreak = (id: string) => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    
    setAddictions(addictions.map(addiction => 
      addiction.id === id ? { ...addiction, lastUsed: today, streakDays: 0 } : addiction
    ));
  };

  const incrementStreak = (id: string) => {
    setAddictions(addictions.map(addiction => 
      addiction.id === id ? { ...addiction, streakDays: addiction.streakDays + 1 } : addiction
    ));
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  const calculateDaysSince = (dateString: string | null) => {
    if (!dateString) return 0;
    
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  return (
    <section id="tracker" className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center gradient-heading">Track Your Progress</h2>
        
        <div className="max-w-2xl mx-auto bg-light-blue/30 rounded-xl p-6 shadow-sm">
          <div className="flex gap-2 mb-6">
            <div className="flex-grow">
              <Label htmlFor="new-addiction" className="sr-only">Add new habit to track</Label>
              <Input
                id="new-addiction"
                type="text"
                placeholder="Enter habit to overcome..."
                value={newAddiction}
                onChange={(e) => setNewAddiction(e.target.value)}
                className="w-full"
              />
            </div>
            <Button onClick={addAddiction} className="bg-teal hover:bg-teal/90">
              <Plus className="mr-1 h-4 w-4" /> Add
            </Button>
          </div>
          
          <div className="space-y-4">
            {addictions.length === 0 && (
              <div className="text-center py-6 text-gray-500">
                <p>No habits being tracked yet. Add your first one above!</p>
              </div>
            )}
            
            {addictions.map((addiction) => (
              <div 
                key={addiction.id} 
                className="p-4 bg-white rounded-lg border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex-1">
                  <h3 className="font-medium text-navy">{addiction.name}</h3>
                  <p className="text-sm text-gray-500">
                    Last relapse: {formatDate(addiction.lastUsed)}
                  </p>
                </div>
                
                <div className="flex-none text-center">
                  <div className="text-2xl font-bold text-teal">{addiction.streakDays}</div>
                  <div className="text-xs text-gray-500">days clean</div>
                </div>
                
                <div className="flex flex-wrap gap-2 justify-end">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => resetStreak(addiction.id)}
                  >
                    Reset
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => incrementStreak(addiction.id)}
                    className="bg-green/10 text-green hover:bg-green/20 border-green/20"
                  >
                    + Day
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => removeAddiction(addiction.id)}
                    className="text-red-500 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddictionTracker;
