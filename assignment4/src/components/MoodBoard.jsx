import React, { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export default function MoodBoard() {
  const [items, setItems] = useLocalStorage('cipher_mooditems', []);
  const [inputVal, setInputVal] = useState('');

  const addItem = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    
    // Simple verification helper to check if text format looks like an image link or a hex code
    const isHex = /^#([0-9A-F]{3}){1,2}$/i.test(inputVal.trim());
    
    setItems([...items, {
      id: crypto.randomUUID(),
      type: isHex ? 'color' : 'image',
      value: inputVal.trim()
    }]);
    setInputVal('');
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div>
      <h2>🎨 Mood Board</h2>
      <form onSubmit={addItem} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Paste image URL or valid Hex color code (#ff0000)..." 
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '10px 20px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '4px' }}>Add Element</button>
      </form>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '15px' }}>
        {items.map(item => (
          <div 
            key={item.id}
            onClick={() => removeItem(item.id)}
            style={{
              height: '180px',
              borderRadius: '8px',
              cursor: 'pointer',
              overflow: 'hidden',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              backgroundColor: item.type === 'color' ? item.value : '#fff',
              backgroundImage: item.type === 'image' ? `url(${item.value})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              transition: 'transform 0.2s'
            }}
            title="Click item to delete"
          >
            {item.type === 'color' && (
              <span style={{ color: '#fff', background: 'rgba(0,0,0,0.4)', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
                {item.value}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}