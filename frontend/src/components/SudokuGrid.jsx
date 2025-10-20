import React from 'react';
import { Input } from './ui/input';
import { getAllConflicts, getBoxDimensions } from '../lib/dynamicSolver';

const SudokuGrid = ({ 
  grid, 
  onCellChange, 
  readOnly = false, 
  highlightCell = null,
  size = 9,
  showConflicts = true 
}) => {
  const handleInputChange = (row, col, value) => {
    if (readOnly) return;
    
    // Allow only numbers 1-size or empty
    if (value === '' || (value >= '1' && value <= String(size))) {
      onCellChange(row, col, value === '' ? 0 : parseInt(value));
    }
  };

  // Get conflict cells
  const conflicts = showConflicts ? getAllConflicts(grid, size) : new Set();
  
  // Get box dimensions
  const { boxRows, boxCols } = getBoxDimensions(size);

  return (
    <div className="sudoku-grid-container">
      <div 
        className="sudoku-grid"
        style={{
          gridTemplateColumns: `repeat(${size}, 1fr)`,
          gridTemplateRows: `repeat(${size}, 1fr)`,
          maxWidth: size === 3 ? '300px' : size === 6 ? '450px' : '600px',
          maxHeight: size === 3 ? '300px' : size === 6 ? '450px' : '600px'
        }}
      >
        {grid.map((row, rowIndex) => (
          row.map((cell, colIndex) => {
            const isHighlighted =
              highlightCell &&
              highlightCell.row === rowIndex &&
              highlightCell.col === colIndex;
            
            const hasConflict = conflicts.has(`${rowIndex},${colIndex}`);
            
            // Determine box borders based on size
            const isBoxBottomBorder = (rowIndex + 1) % boxRows === 0 && rowIndex !== size - 1;
            const isBoxRightBorder = (colIndex + 1) % boxCols === 0 && colIndex !== size - 1;
            
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`sudoku-cell ${
                  isBoxBottomBorder ? 'border-bottom-box' : ''
                } ${
                  isBoxRightBorder ? 'border-right-box' : ''
                } ${
                  isHighlighted ? 'highlighted-cell' : ''
                } ${
                  hasConflict ? 'conflict-cell' : ''
                }`}
              >
                <Input
                  type="text"
                  maxLength="1"
                  value={cell === 0 ? '' : cell}
                  onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                  readOnly={readOnly}
                  className={`sudoku-input ${hasConflict ? 'conflict-input' : ''}`}
                />
              </div>
            );
          })
        ))}
      </div>
    </div>
  );
};

export default SudokuGrid;