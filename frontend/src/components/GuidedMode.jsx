import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { ArrowLeft, Lightbulb, RotateCcw, CheckCircle2 } from 'lucide-react';
import SudokuGrid from './SudokuGrid';
import { mockGetHint } from '../mock';

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
    // Find first empty cell
    let emptyCell = null;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (grid[i][j] === 0) {
          emptyCell = { row: i, col: j };
          break;
        }
      }
      if (emptyCell) break;
    }

    if (!emptyCell) {
      setHint({
        number: null,
        reasoning: "Congratulations! Your Sudoku is complete. Check if all numbers are correctly placed."
      });
      return;
    }

    setLoading(true);
    setSelectedCell(emptyCell);

    try {
      const result = await mockGetHint(grid, emptyCell.row, emptyCell.col);
      if (result.success) {
        setHint(result.hint);
      }
    } catch (error) {
      setHint({
        number: null,
        reasoning: "Error getting hint. Please try again."
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
            <Brain className="inline-block mr-2 h-2 w-2" />
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
                {hint.number && (
                  <div className="hint-number-container">
                    <span className="hint-label">Suggested Number:</span>
                    <span className="hint-number">{hint.number}</span>
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