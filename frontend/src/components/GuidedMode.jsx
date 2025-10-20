import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { ArrowLeft, Lightbulb, RotateCcw, CheckCircle2, Sparkles, Info } from 'lucide-react';
import SudokuGrid from './SudokuGrid';
import { getNextHint, analyzeCellDetails } from '../lib/guidedSolver';
import { generatePuzzle } from '../lib/solver';
import { toast } from '../hooks/use-toast';

const Brain = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
    <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
    <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
    <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
    <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
    <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
    <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
    <path d="M6 18a4 4 0 0 1-1.967-.516" />
    <path d="M19.967 17.484A4 4 0 0 1 18 18" />
  </svg>
);

const GuidedMode = ({ onBack }) => {
  const [grid, setGrid] = useState(
    Array(9).fill(null).map(() => Array(9).fill(0))
  );
  const [selectedCell, setSelectedCell] = useState(null);
  const [hint, setHint] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCellChange = (row, col, value) => {
    const newGrid = grid.map(r => [...r]);
    newGrid[row][col] = value;
    setGrid(newGrid);
    setHint(null);
  };

  const handleGetHint = async () => {
    setLoading(true);

    try {
      // Add a small delay for UX
      await new Promise(resolve => setTimeout(resolve, 400));
      
      const hintResult = getNextHint(grid);
      
      if (hintResult.row !== null && hintResult.col !== null) {
        setSelectedCell({ row: hintResult.row, col: hintResult.col });
        setHint({
          number: hintResult.number,
          reasoning: hintResult.reasoning,
          technique: hintResult.technique,
          candidates: hintResult.candidates
        });
      } else {
        // Puzzle is complete or has errors
        setSelectedCell(null);
        setHint({
          number: null,
          reasoning: hintResult.reasoning,
          technique: hintResult.technique
        });
      }
    } catch (error) {
      setHint({
        number: null,
        reasoning: "Error getting hint: " + error.message,
        technique: 'Error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApplyHint = () => {
    if (hint && hint.number && selectedCell) {
      const newGrid = grid.map(r => [...r]);
      newGrid[selectedCell.row][selectedCell.col] = hint.number;
      setGrid(newGrid);
      setHint(null);
      setSelectedCell(null);
    }
  };

  const handleReset = () => {
    setGrid(Array(9).fill(null).map(() => Array(9).fill(0)));
    setHint(null);
    setSelectedCell(null);
  };

  const handleGeneratePuzzle = () => {
    const newPuzzle = generatePuzzle('easy');
    setGrid(newPuzzle);
    setHint(null);
    setSelectedCell(null);
    toast({
      title: "🎲 Practice Puzzle Generated",
      description: "Try solving this easy puzzle with guided hints!",
    });
  };

  return (
    <div className="guided-mode-container">
      <div className="guided-header">
        <Button
          variant="ghost"
          onClick={onBack}
          className="back-button"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <Card className="guided-card">
        <CardHeader>
          <CardTitle className="guided-title">
            <Brain className="inline-block mr-2 h-6 w-6 text-amber-400 align-middle" />
            Guided Mode
          </CardTitle>
          <p className="guided-description">
            Enter your puzzle and get step-by-step hints with logical reasoning
          </p>
        </CardHeader>
        <CardContent>
          <SudokuGrid
            grid={grid}
            onCellChange={handleCellChange}
            highlightCell={selectedCell}
          />

          <div className="guided-actions">
            <Button
              onClick={handleGetHint}
              disabled={loading}
              className="hint-button"
              size="lg"
            >
              {loading ? (
                <>
                  <div className="spinner"></div>
                  Getting Hint...
                </>
              ) : (
                <>
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Get Hint
                </>
              )}
            </Button>

            <Button
              onClick={handleGeneratePuzzle}
              variant="secondary"
              className="generate-button"
              size="lg"
              disabled={loading}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Practice Puzzle
            </Button>

            <Button
              onClick={handleReset}
              variant="outline"
              className="reset-button"
              size="lg"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>

          {hint && (
            <Alert className="hint-alert">
              <Lightbulb className="h-4 w-4" />
              <AlertDescription className="hint-content">
                {hint.technique && (
                  <div className="hint-technique-container" style={{ marginBottom: '12px' }}>
                    <Badge variant="outline" className="technique-badge">
                      <Info className="mr-1 h-3 w-3" />
                      {hint.technique}
                    </Badge>
                  </div>
                )}
                {hint.number && (
                  <div className="hint-number-container">
                    <span className="hint-label">Suggested Number:</span>
                    <span className="hint-number">{hint.number}</span>
                  </div>
                )}
                {hint.candidates && hint.candidates.length > 0 && (
                  <div style={{ marginTop: '8px', marginBottom: '8px', fontSize: '0.875rem', color: '#94a3b8' }}>
                    <strong>Possible values:</strong> {hint.candidates.join(', ')}
                  </div>
                )}
                <p className="hint-reasoning">{hint.reasoning}</p>
                {hint.number && (
                  <Button
                    onClick={handleApplyHint}
                    className="apply-hint-button"
                    size="sm"
                  >
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Apply Hint
                  </Button>
                )}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GuidedMode;