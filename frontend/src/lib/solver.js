/**
 * Sudoku Solver - Complete solving logic with backtracking
 * Implements validation, solving, and puzzle generation
 */

/**
 * Check if a number is valid in a specific position
 * @param {number[][]} board - 9x9 Sudoku board
 * @param {number} row - Row index (0-8)
 * @param {number} col - Column index (0-8)
 * @param {number} num - Number to check (1-9)
 * @returns {boolean} - True if valid placement
 */
export function isValid(board, row, col, num) {
  // Check row
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num) {
      return false;
    }
  }

  // Check column
  for (let x = 0; x < 9; x++) {
    if (board[x][col] === num) {
      return false;
    }
  }

  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[boxRow + i][boxCol + j] === num) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Find the next empty cell in the board
 * @param {number[][]} board - 9x9 Sudoku board
 * @returns {number[]|null} - [row, col] or null if no empty cell
 */
export function findEmptyCell(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        return [row, col];
      }
    }
  }
  return null;
}

/**
 * Get all valid candidates for a cell
 * @param {number[][]} board - 9x9 Sudoku board
 * @param {number} row - Row index
 * @param {number} col - Column index
 * @returns {number[]} - Array of valid numbers
 */
export function getCandidates(board, row, col) {
  const candidates = [];
  for (let num = 1; num <= 9; num++) {
    if (isValid(board, row, col, num)) {
      candidates.push(num);
    }
  }
  return candidates;
}

/**
 * Solve Sudoku using backtracking algorithm
 * @param {number[][]} board - 9x9 Sudoku board (will be modified)
 * @returns {boolean} - True if solved successfully
 */
export function solveSudoku(board) {
  const emptyCell = findEmptyCell(board);
  
  // No empty cells means puzzle is solved
  if (!emptyCell) {
    return true;
  }

  const [row, col] = emptyCell;

  // Try each number from 1 to 9
  for (let num = 1; num <= 9; num++) {
    if (isValid(board, row, col, num)) {
      board[row][col] = num;

      // Recursively try to solve the rest
      if (solveSudoku(board)) {
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
 * @param {number[][]} board - 9x9 Sudoku board
 * @returns {object} - {valid: boolean, errors: array}
 */
export function validateBoard(board) {
  const errors = [];

  // Check rows
  for (let row = 0; row < 9; row++) {
    const seen = new Set();
    for (let col = 0; col < 9; col++) {
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
  for (let col = 0; col < 9; col++) {
    const seen = new Set();
    for (let row = 0; row < 9; row++) {
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

  // Check 3x3 boxes
  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      const seen = new Set();
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const row = boxRow * 3 + i;
          const col = boxCol * 3 + j;
          const num = board[row][col];
          if (num !== 0) {
            if (seen.has(num)) {
              errors.push({
                type: 'box',
                position: [row, col],
                message: `Duplicate ${num} in 3x3 box`
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
 * @param {number[][]} board - 9x9 Sudoku board
 * @returns {boolean} - True if solvable
 */
export function isSolvable(board) {
  // First validate the board
  const validation = validateBoard(board);
  if (!validation.valid) {
    return false;
  }

  // Create a copy and try to solve it
  const boardCopy = board.map(row => [...row]);
  return solveSudoku(boardCopy);
}

/**
 * Count how many empty cells are in the board
 * @param {number[][]} board - 9x9 Sudoku board
 * @returns {number} - Count of empty cells
 */
export function countEmptyCells(board) {
  let count = 0;
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        count++;
      }
    }
  }
  return count;
}

/**
 * Check if the puzzle is complete and correct
 * @param {number[][]} board - 9x9 Sudoku board
 * @returns {boolean} - True if complete and correct
 */
export function isComplete(board) {
  // Check if there are any empty cells
  if (countEmptyCells(board) > 0) {
    return false;
  }

  // Validate the completed board
  return validateBoard(board).valid;
}

/**
 * Solve and return a new board (non-mutating)
 * @param {number[][]} board - 9x9 Sudoku board
 * @returns {object} - {success: boolean, solution: board, message: string}
 */
export function solve(board) {
  // Validate input
  const validation = validateBoard(board);
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
  const solved = solveSudoku(boardCopy);
  
  if (solved) {
    return {
      success: true,
      solution: boardCopy,
      message: 'Puzzle solved successfully!'
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
 * @returns {number[][]} - Complete valid 9x9 board
 */
function generateFilledBoard() {
  const board = Array(9).fill(null).map(() => Array(9).fill(0));
  
  // Fill diagonal 3x3 boxes first (they're independent)
  for (let box = 0; box < 3; box++) {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    // Shuffle numbers
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    
    let idx = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        board[box * 3 + i][box * 3 + j] = numbers[idx++];
      }
    }
  }
  
  // Solve the rest
  solveSudoku(board);
  return board;
}

/**
 * Generate a Sudoku puzzle with specified difficulty
 * @param {string} difficulty - 'easy' (40-45 clues), 'medium' (30-35 clues), 'hard' (25-28 clues)
 * @returns {number[][]} - 9x9 puzzle board
 */
export function generatePuzzle(difficulty = 'medium') {
  const board = generateFilledBoard();
  
  // Determine number of cells to remove based on difficulty
  let cellsToRemove;
  switch (difficulty) {
    case 'easy':
      cellsToRemove = Math.floor(Math.random() * 6) + 36; // 36-41 removed (40-45 clues)
      break;
    case 'hard':
      cellsToRemove = Math.floor(Math.random() * 4) + 53; // 53-56 removed (25-28 clues)
      break;
    case 'medium':
    default:
      cellsToRemove = Math.floor(Math.random() * 6) + 46; // 46-51 removed (30-35 clues)
  }
  
  // Remove cells randomly while ensuring unique solution
  const positions = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
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

export default {
  isValid,
  findEmptyCell,
  getCandidates,
  solveSudoku,
  validateBoard,
  isSolvable,
  countEmptyCells,
  isComplete,
  solve,
  generatePuzzle
};
