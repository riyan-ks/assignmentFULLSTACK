import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import TaskBoard from './TaskBoard';
import GoalTracker from './GoalTracker';
import FocusTimer from './FocusTimer';
import MoodBoard from './MoodBoard';

export default function Dashboard() {
  // Persist the active navigation tab across refreshes
  const [activeSection, setActiveSection] = useLocalStorage('cipher_active_section', 'Dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'TaskBoard':
        return <TaskBoard />;
      case 'GoalTracker':
        return <GoalTracker />;
      case 'FocusTimer':
        return <FocusTimer />;
      case 'MoodBoard':
        return <MoodBoard />;
      default:
        return (
          <section>
            <p>Welcome to the Cipher MVP Dashboard!</p>
          </section>
        );
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      {/* Navigation Sidebar  */}
      <aside style={{
        width: '250px',
        background: '#1e293b',
        color: 'white',
        padding: '20px',
        height: '100vh',
        position: 'sticky',
        top: 0,
        overflowY: 'auto',
        boxSizing: 'border-box'
      }}>
        <h2 style={{ marginTop: 0 }}>Cipher MVP</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
          {['Dashboard', 'TaskBoard', 'GoalTracker', 'FocusTimer', 'MoodBoard'].map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              style={{
                display: 'block',
                width: '100%',
                padding: '10px',
                textAlign: 'left',
                background: activeSection === section ? '#3b82f6' : 'transparent',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {section}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content Window */}
      <main style={{ flex: 1, padding: '40px', background: '#f8fafc' }}>
        <header style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '10px', marginBottom: '20px' }}>
          <h1>{activeSection}</h1>
        </header>

        <section>
          {renderContent()}
        </section>
      </main>
    </div>
  );
}