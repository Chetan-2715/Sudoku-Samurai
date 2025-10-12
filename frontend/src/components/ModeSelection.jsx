import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Bot, Brain, ArrowLeft } from 'lucide-react';

const ModeSelection = ({ onSelectMode, onBack }) => {
  return (
    <div className="mode-selection-container">
      <div className="mode-header">
        <Button
          variant="ghost"
          onClick={onBack}
          className="back-button"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h2 className="mode-title">Choose Your Path</h2>
      </div>

      <div className="mode-cards">
        <Card
          className="mode-card mode-card-solver"
          onClick={() => onSelectMode('solver')}
        >
          <CardHeader>
            <div className="mode-icon-container">
              <Bot className="mode-icon" />
            </div>
            <CardTitle className="mode-card-title">Solve with the Bot</CardTitle>
            <CardDescription className="mode-card-description">
              Enter your Sudoku puzzle and let the AI samurai solve it instantly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="mode-select-button" variant="outline">
              Start Solving
            </Button>
          </CardContent>
        </Card>

        <Card
          className="mode-card mode-card-guided"
          onClick={() => onSelectMode('guided')}
        >
          <CardHeader>
            <div className="mode-icon-container">
              <Brain className="mode-icon" />
            </div>
            <CardTitle className="mode-card-title">Guided Mode</CardTitle>
            <CardDescription className="mode-card-description">
              Learn step-by-step with hints and logical reasoning from the AI sensei
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="mode-select-button" variant="outline">
              Start Learning
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ModeSelection;