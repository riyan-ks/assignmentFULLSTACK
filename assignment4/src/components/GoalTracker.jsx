import React, { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export default function GoalTracker() {
  const [goals, setGoals] = useLocalStorage('cipher_goals', []);
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [editingGoalId, setEditingGoalId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');

  const addGoal = (e) => {
    e.preventDefault();
    if (!newGoalTitle.trim()) return;
    setGoals([...goals, { id: crypto.randomUUID(), title: newGoalTitle.trim(), progress: 0, targetDate: '' }]);
    setNewGoalTitle('');
  };

  const updateProgress = (id, amount) => {
    setGoals(goals.map(g => g.id === id ? { ...g, progress: Math.min(100, Math.max(0, g.progress + amount)) } : g));
  };

  const updateTargetDate = (id, date) => {
    setGoals(goals.map(g => g.id === id ? { ...g, targetDate: date } : g));
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  return (
    <div>
      <h2>🎯 Goal Tracker</h2>
      <form onSubmit={addGoal} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Track a new milestone goal..." 
          value={newGoalTitle} 
          onChange={(e) => setNewGoalTitle(e.target.value)}
          style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '10px 20px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '4px' }}>Add Goal</button>
      </form>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {goals.map(goal => (
          <div key={goal.id} style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            {editingGoalId === goal.id ? (
              <input 
                value={editingTitle} 
                onChange={(e) => setEditingTitle(e.target.value)}
                onBlur={() => {
                  setGoals(goals.map(g => g.id === goal.id ? { ...g, title: editingTitle } : g));
                  setEditingGoalId(null);
                }}
                autoFocus
                style={{ width: '100%', padding: '4px', marginBottom: '10px' }}
              />
            ) : (
              <h4 onClick={() => { setEditingGoalId(goal.id); setEditingTitle(goal.title); }} style={{ margin: '0 0 10px 0', cursor: 'pointer' }}>{goal.title}</h4>
            )}
            
            <div style={{ marginBottom: '10px' }}>
              <input 
                type="date" 
                value={goal.targetDate} 
                onChange={(e) => updateTargetDate(goal.id, e.target.value)}
                style={{ padding: '4px', fontSize: '12px' }}
              />
            </div>

            {/* Progress Meter Bar */}
            <div style={{ background: '#e5e7eb', height: '10px', borderRadius: '5px', overflow: 'hidden', marginBottom: '10px' }}>
              <div style={{ background: '#10b981', width: `${goal.progress}%`, height: '100%', transition: 'width 0.2s' }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{goal.progress}%</span>
              <div style={{ display: 'flex', gap: '5px' }}>
                <button onClick={() => updateProgress(goal.id, -10)} style={{ padding: '2px 8px' }}>-10%</button>
                <button onClick={() => updateProgress(goal.id, 10)} style={{ padding: '2px 8px' }}>+10%</button>
                <button onClick={() => deleteGoal(goal.id)} style={{ padding: '2px 8px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px' }}>✕</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}