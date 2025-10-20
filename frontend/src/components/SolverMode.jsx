import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { ArrowLeft, Wand2, RotateCcw, Sparkles, AlertTriangle } from 'lucide-react';
import SudokuGrid from './SudokuGrid';
import SizeSelector from './SizeSelector';
import { solve, generatePuzzle, createEmptyBoard, getAllConflicts } from '../lib/dynamicSolver';
import { toast } from '../hooks/use-toast';

const SolverMode = ({ onBack }) => {
  const [size, setSize] = useState(9);
  const [showSizeSelector, setShowSizeSelector] = useState(true);
  const [grid, setGrid] = useState(
    Array(9).fill(null).map(() => Array(9).fill(0))
  );
  const [solving, setSolving] = useState(false);
  const [solved, setSolved] = useState(false);
  const [hasConflicts, setHasConflicts] = useState(false);

  // Check for conflicts whenever grid changes
  useEffect(() => {
    const conflicts = getAllConflicts(grid, size);
    setHasConflicts(conflicts.size > 0);
  }, [grid, size]);

  const handleSizeSelect = (selectedSize) => {
    setSize(selectedSize);
    setGrid(createEmptyBoard(selectedSize));
    setSolved(false);
    setShowSizeSelector(false);
    toast({
      title: `🎯 ${selectedSize}×${selectedSize} Grid Selected`,
      description: `Ready to solve ${selectedSize}×${selectedSize} puzzles!`,
    });
  };

  const handleCellChange = (row, col, value) => {
    const newGrid = grid.map(r => [...r]);
    newGrid[row][col] = value;
    setGrid(newGrid);
    setSolved(false);
  };

  const handleSolve = async () => {
    if (hasConflicts) {
      toast({
        title: "❌ Cannot Solve",
        description: "Please resolve duplicate numbers before solving.",
        variant: "destructive"
      });
      return;
    }

    setSolving(true);

    try {
      // Add a small delay for UX (shows solving animation)
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const result = solve(grid, size);

      if (result.success) {
        setGrid(result.solution);
        setSolved(true);
        toast({
          title: "✅ Puzzle Solved!",
          description: result.message,
        });
      } else {
        toast({
          title: "❌ Unable to Solve",
          description: result.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to solve the puzzle: " + error.message,
        variant: "destructive"
      });
    } finally {
      setSolving(false);
    }
  };

  const handleReset = () => {
    setGrid(createEmptyBoard(size));
    setSolved(false);
  };

  const handleGeneratePuzzle = () => {
    const difficulty = size === 3 ? 'easy' : 'medium';
    const newPuzzle = generatePuzzle(size, difficulty);
    setGrid(newPuzzle);
    setSolved(false);
    toast({
      title: "🎲 New Puzzle Generated",
      description: `Try solving this ${size}×${size} ${difficulty} puzzle!`,
    });
  };

  const handleChangeSize = () => {
    setShowSizeSelector(true);
  };

  return (
    <div className="solver-mode-container">
      <SizeSelector 
        open={showSizeSelector} 
        onOpenChange={setShowSizeSelector}
        onSelectSize={handleSizeSelect}
      />

      <div className="solver-header">
        <Button
          variant="ghost"
          onClick={onBack}
          className="back-button"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <Card className="solver-card">
        <CardHeader>
          <CardTitle className="solver-title">
            <Bot className="inline-block mr-2 h-6 w-6 text-cyan-400 align-middle" />
            Solve with the Bot ({size}×{size})
          </CardTitle>
          <p className="solver-description">Enter your Sudoku puzzle numbers below and let the AI samurai solve it instantly</p>
        </CardHeader>
        <CardContent>
          {hasConflicts && (
            <Alert variant="destructive" className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                ⚠️ <strong>Duplicate numbers detected!</strong> Red highlighted cells have conflicts in their row, column, or box. Please correct them before solving.
              </AlertDescription>
            </Alert>
          )}

          <SudokuGrid
            grid={grid}
            onCellChange={handleCellChange}
            readOnly={solved}
            size={size}
            showConflicts={true}
          />

          <div className="solver-actions">
            <Button
              onClick={handleSolve}
              disabled={solving || solved}
              className="solve-button"
              size="lg"
            >
              {solving ? (
                <>
                  <div className="spinner"></div>
                  Solving...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Solve Puzzle
                </>
              )}
            </Button>

            <Button
              onClick={handleGeneratePuzzle}
              variant="secondary"
              className="generate-button"
              size="lg"
              disabled={solving}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Puzzle
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

            <Button
              onClick={handleChangeSize}
              variant="outline"
              className="change-size-button"
              size="lg"
              disabled={solving}
            >
              Change Size
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const Bot = ({ className }) => (
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
    <path d="M12 8V4H8" />
    <rect width="16" height="12" x="4" y="8" rx="2" />
    <path d="M2 14h2" />
    <path d="M20 14h2" />
    <path d="M15 13v2" />
    <path d="M9 13v2" />
  </svg>
);

export default SolverMode;
