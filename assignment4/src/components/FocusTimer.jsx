import React from 'react';
import useTimer from '../hooks/useTimer';

export default function FocusTimer() {
  const { secondsRemaining, isRunning, startTimer, pauseTimer, resetTimer } = useTimer(1500); // 25 Min default

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <h2>⏱️ Focus Countdown</h2>
      <div style={{ fontSize: '80px', fontWeight: 'bold', margin: '20px 0', fontFamily: 'monospace', color: '#1e1e2f' }}>
        {formatTime(secondsRemaining)}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
        {!isRunning ? (
          <button onClick={startTimer} style={{ padding: '12px 30px', fontSize: '18px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Start</button>
        ) : (
          <button onClick={pauseTimer} style={{ padding: '12px 30px', fontSize: '18px', background: '#f59e0b', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Pause</button>
        )}
        <button onClick={() => resetTimer(1500)} style={{ padding: '12px 30px', fontSize: '18px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Reset</button>
      </div>
    </div>
  );
}