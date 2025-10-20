/**
 * Dynamic Sudoku Solver - Supports 3x3, 6x6, and 9x9 grids
 * Implements validation, solving, and puzzle generation for multiple sizes
 */

/**
 * Get box dimensions for a given grid size
 * @param {number} size - Grid size (3, 6, or 9)
 * @returns {object} - {boxRows, boxCols}
 */
export function getBoxDimensions(size) {
  switch (size) {
    case 3:
      return { boxRows: 1, boxCols: 3 }; // 1x3 boxes for 3x3
    case 6:
      return { boxRows: 2, boxCols: 3 }; // 2x3 boxes for 6x6
    case 9:
      return { boxRows: 3, boxCols: 3 }; // 3x3 boxes for 9x9
    default:
      return { boxRows: 3, boxCols: 3 };
  }
}

/**
 * Check if a number is valid in a specific position
 * @param {number[][]} board - Sudoku board
 * @param {number} row - Row index
 * @param {number} col - Column index
 * @param {number} num - Number to check
 * @param {number} size - Grid size (3, 6, or 9)
 * @returns {boolean} - True if valid placement
 */
export function isValid(board, row, col, num, size) {
  // Check row
  for (let x = 0; x < size; x++) {
    if (board[row][x] === num) {
      return false;
    }
  }

  // Check column
  for (let x = 0; x < size; x++) {
    if (board[x][col] === num) {
      return false;
    }
  }

  // Check box based on size
  const { boxRows, boxCols } = getBoxDimensions(size);
  const boxRow = Math.floor(row / boxRows) * boxRows;
  const boxCol = Math.floor(col / boxCols) * boxCols;
  
  for (let i = 0; i < boxRows; i++) {
    for (let j = 0; j < boxCols; j++) {
      if (board[boxRow + i][boxCol + j] === num) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Find conflicts for a specific cell
 * @param {number[][]} board - Sudoku board
 * @param {number} row - Row index
 * @param {number} col - Column index
 * @param {number} value - Value to check
 * @param {number} size - Grid size
 * @returns {array} - Array of conflict positions [[row, col], ...]
 */
export function findConflicts(board, row, col, value, size) {
  if (!value || value === 0) return [];
  
  const conflicts = [];

  // Check row
  for (let c = 0; c < size; c++) {
    if (c !== col && board[row][c] === value) {
      conflicts.push([row, c]);
    }
  }

  // Check column
  for (let r = 0; r < size; r++) {
    if (r !== row && board[r][col] === value) {
      conflicts.push([r, col]);
    }
  }

  // Check box
  const { boxRows, boxCols } = getBoxDimensions(size);
  const boxRow = Math.floor(row / boxRows) * boxRows;
  const boxCol = Math.floor(col / boxCols) * boxCols;
  
  for (let i = 0; i < boxRows; i++) {
    for (let j = 0; j < boxCols; j++) {
      const r = boxRow + i;
      const c = boxCol + j;
      if (!(r === row && c === col) && board[r][c] === value) {
        conflicts.push([r, c]);
      }
    }
  }

  return conflicts;
}

/**
 * Get all conflicts in the entire board
 * @param {number[][]} board - Sudoku board
 * @param {number} size - Grid size
 * @returns {Set} - Set of conflict cell keys "row,col"
 */
export function getAllConflicts(board, size) {
  const conflictSet = new Set();

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const value = board[row][col];
      if (value !== 0) {
        const conflicts = findConflicts(board, row, col, value, size);
        if (conflicts.length > 0) {
          // Add the current cell
          conflictSet.add(`${row},${col}`);
          // Add all conflicting cells
          conflicts.forEach(([r, c]) => conflictSet.add(`${r},${c}`));
        }
      }
    }
  }

  return conflictSet;
}

/**
 * Find the next empty cell in the board
 * @param {number[][]} board - Sudoku board
 * @param {number} size - Grid size
 * @returns {number[]|null} - [row, col] or null if no empty cell
 */
export function findEmptyCell(board, size) {
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (board[row][col] === 0) {
        return [row, col];
      }
    }
  }
  return null;
}

/**
 * Get all valid candidates for a cell
 * @param {number[][]} board - Sudoku board
 * @param {number} row - Row index
 * @param {number} col - Column index
 * @param {number} size - Grid size
 * @returns {number[]} - Array of valid numbers
 */
export function getCandidates(board, row, col, size) {
  const candidates = [];
  for (let num = 1; num <= size; num++) {
    if (isValid(board, row, col, num, size)) {
      candidates.push(num);
    }
  }
  return candidates;
}

/**
 * Solve Sudoku using backtracking algorithm
 * @param {number[][]} board - Sudoku board (will be modified)
 * @param {number} size - Grid size
 * @returns {boolean} - True if solved successfully
 */
export function solveSudoku(board, size) {
  const emptyCell = findEmptyCell(board, size);
  
  // No empty cells means puzzle is solved
  if (!emptyCell) {
    return true;
  }

  const [row, col] = emptyCell;

  // Try each number from 1 to size
  for (let num = 1; num <= size; num++) {
    if (isValid(board, row, col, num, size)) {
      board[row][col] = num;

      // Recursively try to solve the rest
      if (solveSudoku(board, size)) {
        return true;
      }

      // Backtrack if solution not found
      board[row][col] = 0;
    }
  }

  return false;
}

/**
 * Validate if the current board state is valid (no conflicts)
 * @param {number[][]} board - Sudoku board
 * @param {number} size - Grid size
 * @returns {object} - {valid: boolean, errors: array}
 */
export function validateBoard(board, size) {
  const errors = [];

  // Check rows
  for (let row = 0; row < size; row++) {
    const seen = new Set();
    for (let col = 0; col < size; col++) {
      const num = board[row][col];
      if (num !== 0) {
        if (seen.has(num)) {
          errors.push({
            type: 'row',
            position: [row, col],
            message: `Duplicate ${num} in row ${row + 1}`
          });
        }
        seen.add(num);
      }
    }
  }

  // Check columns
  for (let col = 0; col < size; col++) {
    const seen = new Set();
    for (let row = 0; row < size; row++) {
      const num = board[row][col];
      if (num !== 0) {
        if (seen.has(num)) {
          errors.push({
            type: 'column',
            position: [row, col],
            message: `Duplicate ${num} in column ${col + 1}`
          });
        }
        seen.add(num);
      }
    }
  }

  // Check boxes
  const { boxRows, boxCols } = getBoxDimensions(size);
  const boxCountRow = size / boxRows;
  const boxCountCol = size / boxCols;
  
  for (let boxRow = 0; boxRow < boxCountRow; boxRow++) {
    for (let boxCol = 0; boxCol < boxCountCol; boxCol++) {
      const seen = new Set();
      for (let i = 0; i < boxRows; i++) {
        for (let j = 0; j < boxCols; j++) {
          const row = boxRow * boxRows + i;
          const col = boxCol * boxCols + j;
          const num = board[row][col];
          if (num !== 0) {
            if (seen.has(num)) {
              errors.push({
                type: 'box',
                position: [row, col],
                message: `Duplicate ${num} in box`
              });
            }
            seen.add(num);
          }
        }
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Check if the puzzle is solvable
 * @param {number[][]} board - Sudoku board
 * @param {number} size - Grid size
 * @returns {boolean} - True if solvable
 */
export function isSolvable(board, size) {
  // First validate the board
  const validation = validateBoard(board, size);
  if (!validation.valid) {
    return false;
  }

  // Create a copy and try to solve it
  const boardCopy = board.map(row => [...row]);
  return solveSudoku(boardCopy, size);
}

/**
 * Count how many empty cells are in the board
 * @param {number[][]} board - Sudoku board
 * @param {number} size - Grid size
 * @returns {number} - Count of empty cells
 */
export function countEmptyCells(board, size) {
  let count = 0;
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (board[row][col] === 0) {
        count++;
      }
    }
  }
  return count;
}

/**
 * Check if the puzzle is complete and correct
 * @param {number[][]} board - Sudoku board
 * @param {number} size - Grid size
 * @returns {boolean} - True if complete and correct
 */
export function isComplete(board, size) {
  // Check if there are any empty cells
  if (countEmptyCells(board, size) > 0) {
    return false;
  }

  // Validate the completed board
  return validateBoard(board, size).valid;
}

/**
 * Solve and return a new board (non-mutating)
 * @param {number[][]} board - Sudoku board
 * @param {number} size - Grid size
 * @returns {object} - {success: boolean, solution: board, message: string}
 */
export function solve(board, size) {
  // Validate input
  const validation = validateBoard(board, size);
  if (!validation.valid) {
    return {
      success: false,
      solution: null,
      message: 'Invalid puzzle: ' + validation.errors[0].message
    };
  }

  // Create a copy to solve
  const boardCopy = board.map(row => [...row]);
  
  // Try to solve
  const solved = solveSudoku(boardCopy, size);
  
  if (solved) {
    return {
      success: true,
      solution: boardCopy,
      message: `${size}×${size} puzzle solved successfully!`
    };
  } else {
    return {
      success: false,
      solution: null,
      message: 'No solution exists for this puzzle'
    };
  }
}

/**
 * Generate a random filled Sudoku board
 * @param {number} size - Grid size (3, 6, or 9)
 * @returns {number[][]} - Complete valid board
 */
function generateFilledBoard(size) {
  const board = Array(size).fill(null).map(() => Array(size).fill(0));
  
  const { boxRows, boxCols } = getBoxDimensions(size);
  const boxCountRow = size / boxRows;
  const boxCountCol = size / boxCols;
  
  // Fill diagonal boxes first (they're independent)
  for (let boxIdx = 0; boxIdx < Math.min(boxCountRow, boxCountCol); boxIdx++) {
    const numbers = Array.from({ length: size }, (_, i) => i + 1);
    // Shuffle numbers
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    
    let idx = 0;
    for (let i = 0; i < boxRows; i++) {
      for (let j = 0; j < boxCols; j++) {
        board[boxIdx * boxRows + i][boxIdx * boxCols + j] = numbers[idx++];
      }
    }
  }
  
  // Solve the rest
  solveSudoku(board, size);
  return board;
}

/**
 * Generate a Sudoku puzzle with specified difficulty
 * @param {number} size - Grid size (3, 6, or 9)
 * @param {string} difficulty - 'easy', 'medium', 'hard'
 * @returns {number[][]} - Puzzle board
 */
export function generatePuzzle(size, difficulty = 'medium') {
  const board = generateFilledBoard(size);
  
  const totalCells = size * size;
  
  // Determine number of cells to remove based on difficulty and size
  let cellsToRemove;
  switch (difficulty) {
    case 'easy':
      cellsToRemove = Math.floor(totalCells * 0.4); // Keep 60% clues
      break;
    case 'hard':
      cellsToRemove = Math.floor(totalCells * 0.7); // Keep 30% clues
      break;
    case 'medium':
    default:
      cellsToRemove = Math.floor(totalCells * 0.55); // Keep 45% clues
  }
  
  // Remove cells randomly
  const positions = [];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      positions.push([i, j]);
    }
  }
  
  // Shuffle positions
  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }
  
  // Remove cells
  for (let i = 0; i < cellsToRemove && i < positions.length; i++) {
    const [row, col] = positions[i];
    board[row][col] = 0;
  }
  
  return board;
}

/**
 * Create an empty board of specified size
 * @param {number} size - Grid size (3, 6, or 9)
 * @returns {number[][]} - Empty board
 */
export function createEmptyBoard(size) {
  return Array(size).fill(null).map(() => Array(size).fill(0));
}

export default {
  getBoxDimensions,
  isValid,
  findConflicts,
  getAllConflicts,
  findEmptyCell,
  getCandidates,
  solveSudoku,
  validateBoard,
  isSolvable,
  countEmptyCells,
  isComplete,
  solve,
  generatePuzzle,
  createEmptyBoard
};
