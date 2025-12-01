import React, { useState, useEffect } from 'react';
import './App.css';
import { Toaster } from './components/ui/toaster';
import LandingAnimation from './components/LandingAnimation';
import ModeSelection from './components/ModeSelection';
import SolverMode from './components/SolverMode';
import GuidedMode from './components/GuidedMode';

function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [selectedMode, setSelectedMode] = useState(null);

  useEffect(() => {
    console.log("✅ App Component Mounted");
  }, []);

  const handleGetStarted = () => {
    setCurrentView('modeSelection');
  };

  const handleSelectMode = (mode) => {
    setSelectedMode(mode);
    setCurrentView('game');
  };

  const handleBackToModes = () => {
    setSelectedMode(null);
    setCurrentView('modeSelection');
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
    setSelectedMode(null);
  };

  return (
    <div className="App">
      {currentView === 'landing' && (
        <LandingAnimation onGetStarted={handleGetStarted} />
      )}

      {currentView === 'modeSelection' && (
        <ModeSelection
          onSelectMode={handleSelectMode}
          onBack={handleBackToLanding}
        />
      )}

      {currentView === 'game' && selectedMode === 'solver' && (
        <SolverMode onBack={handleBackToModes} />
      )}

      {currentView === 'game' && selectedMode === 'guided' && (
        <GuidedMode onBack={handleBackToModes} />
      )}

      <Toaster />
    </div>
  );
}

export default App;