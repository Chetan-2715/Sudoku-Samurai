import React from 'react';
import { Input } from './ui/input';

const SudokuGrid = ({ grid, onCellChange, readOnly = false, highlightCell = null }) => {
  const handleInputChange = (row, col, value) => {
    if (readOnly) return;
    
    // Allow only numbers 1-9 or empty
    if (value === '' || (value >= '1' && value <= '9')) {
      onCellChange(row, col, value === '' ? 0 : parseInt(value));
    }
  };

  return (
    <div className="sudoku-grid-container">
      <div className="sudoku-grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="sudoku-row">
            {row.map((cell, colIndex) => {
              const isHighlighted =
                highlightCell &&
                highlightCell.row === rowIndex &&
                highlightCell.col === colIndex;
              
              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`sudoku-cell ${
                    (rowIndex + 1) % 3 === 0 && rowIndex !== 8
                      ? 'border-bottom-box'
                      : ''
                  } ${
                    (colIndex + 1) % 3 === 0 && colIndex !== 8
                      ? 'border-right-box'
                      : ''
                  } ${
                    isHighlighted ? 'highlighted-cell' : ''
                  }`}
                >
                  <Input
                    type="text"
                    maxLength="1"
                    value={cell === 0 ? '' : cell}
                    onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                    readOnly={readOnly}
                    className="sudoku-input"
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SudokuGrid;