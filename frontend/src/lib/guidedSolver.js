/**
 * Guided Sudoku Solver - Step-by-step solving with reasoning explanations
 * Implements LinkedIn Sudoku style guidance with logical explanations
 */

import { isValid, getCandidates, findEmptyCell, validateBoard } from './solver';

/**
 * Find cells with only one possible candidate (Naked Singles)
 * @param {number[][]} board - 9x9 Sudoku board
 * @returns {object|null} - {row, col, number, reasoning}
 */
function findNakedSingle(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        const candidates = getCandidates(board, row, col);
        if (candidates.length === 1) {
          const num = candidates[0];
          return {
            row,
            col,
            number: num,
            technique: 'Naked Single',
            reasoning: `Cell (${row + 1}, ${col + 1}) can only be ${num}. It's the only number that doesn't conflict with the row, column, and 3x3 box constraints.`
          };
        }
      }
    }
  }
  return null;
}

/**
 * Find numbers that can only go in one cell in a row (Hidden Singles in Row)
 * @param {number[][]} board - 9x9 Sudoku board
 * @returns {object|null} - {row, col, number, reasoning}
 */
function findHiddenSingleInRow(board) {
  for (let row = 0; row < 9; row++) {
    for (let num = 1; num <= 9; num++) {
      // Check if this number is already in the row
      if (board[row].includes(num)) continue;

      // Find all possible positions for this number in the row
      const possibleCols = [];
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0 && isValid(board, row, col, num)) {
          possibleCols.push(col);
        }
      }

      // If only one position is possible, we found a hidden single
      if (possibleCols.length === 1) {
        const col = possibleCols[0];
        return {
          row,
          col,
          number: num,
          technique: 'Hidden Single (Row)',
          reasoning: `In row ${row + 1}, the number ${num} can only go in column ${col + 1}. All other cells in this row either already have values or would violate constraints if ${num} were placed there.`
        };
      }
    }
  }
  return null;
}

/**
 * Find numbers that can only go in one cell in a column (Hidden Singles in Column)
 * @param {number[][]} board - 9x9 Sudoku board
 * @returns {object|null} - {row, col, number, reasoning}
 */
function findHiddenSingleInColumn(board) {
  for (let col = 0; col < 9; col++) {
    for (let num = 1; num <= 9; num++) {
      // Check if this number is already in the column
      let alreadyExists = false;
      for (let row = 0; row < 9; row++) {
        if (board[row][col] === num) {
          alreadyExists = true;
          break;
        }
      }
      if (alreadyExists) continue;

      // Find all possible positions for this number in the column
      const possibleRows = [];
      for (let row = 0; row < 9; row++) {
        if (board[row][col] === 0 && isValid(board, row, col, num)) {
          possibleRows.push(row);
        }
      }

      // If only one position is possible, we found a hidden single
      if (possibleRows.length === 1) {
        const row = possibleRows[0];
        return {
          row,
          col,
          number: num,
          technique: 'Hidden Single (Column)',
          reasoning: `In column ${col + 1}, the number ${num} can only go in row ${row + 1}. This is the only cell in the column where ${num} doesn't conflict with the row or 3x3 box constraints.`
        };
      }
    }
  }
  return null;
}

/**
 * Find numbers that can only go in one cell in a 3x3 box (Hidden Singles in Box)
 * @param {number[][]} board - 9x9 Sudoku board
 * @returns {object|null} - {row, col, number, reasoning}
 */
function findHiddenSingleInBox(board) {
  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      for (let num = 1; num <= 9; num++) {
        // Check if this number is already in the box
        let alreadyExists = false;
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (board[boxRow * 3 + i][boxCol * 3 + j] === num) {
              alreadyExists = true;
              break;
            }
          }
          if (alreadyExists) break;
        }
        if (alreadyExists) continue;

        // Find all possible positions for this number in the box
        const possiblePositions = [];
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            const row = boxRow * 3 + i;
            const col = boxCol * 3 + j;
            if (board[row][col] === 0 && isValid(board, row, col, num)) {
              possiblePositions.push({ row, col });
            }
          }
        }

        // If only one position is possible, we found a hidden single
        if (possiblePositions.length === 1) {
          const { row, col } = possiblePositions[0];
          const boxNumber = boxRow * 3 + boxCol + 1;
          return {
            row,
            col,
            number: num,
            technique: 'Hidden Single (Box)',
            reasoning: `In 3x3 box #${boxNumber}, the number ${num} can only fit in cell (${row + 1}, ${col + 1}). All other cells in this box either have values or would create conflicts in their respective rows or columns.`
          };
        }
      }
    }
  }
  return null;
}

/**
 * Explain why a specific number fits in a cell
 * @param {number[][]} board - 9x9 Sudoku board
 * @param {number} row - Row index
 * @param {number} col - Column index
 * @param {number} num - Number to explain
 * @returns {string} - Explanation
 */
export function explainMove(board, row, col, num) {
  const candidates = getCandidates(board, row, col);
  
  if (candidates.length === 0) {
    return `No valid numbers can be placed in cell (${row + 1}, ${col + 1}).`;
  }
  
  if (!candidates.includes(num)) {
    return `Number ${num} cannot be placed in cell (${row + 1}, ${col + 1}) because it conflicts with existing numbers in the same row, column, or 3x3 box.`;
  }
  
  if (candidates.length === 1) {
    return `Number ${num} is the only valid option for cell (${row + 1}, ${col + 1}). All other numbers (1-9) would create conflicts.`;
  }
  
  return `Number ${num} fits in cell (${row + 1}, ${col + 1}) because it doesn't appear in row ${row + 1}, column ${col + 1}, or the corresponding 3x3 box. Other possible values: ${candidates.filter(n => n !== num).join(', ')}.`;
}

/**
 * Get the next best hint with reasoning
 * @param {number[][]} board - 9x9 Sudoku board
 * @returns {object|null} - {row, col, number, technique, reasoning, candidates}
 */
export function getNextHint(board) {
  // Validate the board first
  const validation = validateBoard(board);
  if (!validation.valid) {
    return {
      row: null,
      col: null,
      number: null,
      technique: 'Error',
      reasoning: `Invalid board state: ${validation.errors[0].message}`,
      candidates: []
    };
  }

  // Check if puzzle is complete
  const emptyCell = findEmptyCell(board);
  if (!emptyCell) {
    return {
      row: null,
      col: null,
      number: null,
      technique: 'Complete',
      reasoning: 'Congratulations! The puzzle is complete. All cells are filled correctly.',
      candidates: []
    };
  }

  // Try techniques in order of simplicity
  // 1. Naked Single (most obvious)
  let hint = findNakedSingle(board);
  if (hint) {
    hint.candidates = [hint.number];
    return hint;
  }

  // 2. Hidden Single in Row
  hint = findHiddenSingleInRow(board);
  if (hint) {
    hint.candidates = getCandidates(board, hint.row, hint.col);
    return hint;
  }

  // 3. Hidden Single in Column
  hint = findHiddenSingleInColumn(board);
  if (hint) {
    hint.candidates = getCandidates(board, hint.row, hint.col);
    return hint;
  }

  // 4. Hidden Single in Box
  hint = findHiddenSingleInBox(board);
  if (hint) {
    hint.candidates = getCandidates(board, hint.row, hint.col);
    return hint;
  }

  // If no logical technique found, provide the first empty cell with its candidates
  const [row, col] = emptyCell;
  const candidates = getCandidates(board, row, col);
  
  if (candidates.length === 0) {
    return {
      row,
      col,
      number: null,
      technique: 'Error',
      reasoning: `Cell (${row + 1}, ${col + 1}) has no valid candidates. The puzzle may be unsolvable or contains errors.`,
      candidates: []
    };
  }

  // Provide a hint with trial and error approach
  return {
    row,
    col,
    number: candidates[0],
    technique: 'Trial Approach',
    reasoning: `Cell (${row + 1}, ${col + 1}) has ${candidates.length} possible values: ${candidates.join(', ')}. Try ${candidates[0]} first. If it leads to a contradiction, backtrack and try the next candidate.`,
    candidates
  };
}

/**
 * Get all possible hints for the current board state
 * @param {number[][]} board - 9x9 Sudoku board
 * @param {number} maxHints - Maximum number of hints to return
 * @returns {array} - Array of hint objects
 */
export function getAllHints(board, maxHints = 5) {
  const hints = [];
  const boardCopy = board.map(row => [...row]);
  
  for (let i = 0; i < maxHints; i++) {
    const hint = getNextHint(boardCopy);
    if (!hint || hint.row === null) break;
    
    hints.push(hint);
    
    // Apply the hint to get the next one
    boardCopy[hint.row][hint.col] = hint.number;
  }
  
  return hints;
}

/**
 * Get detailed analysis of a specific cell
 * @param {number[][]} board - 9x9 Sudoku board
 * @param {number} row - Row index
 * @param {number} col - Column index
 * @returns {object} - Analysis with candidates and constraints
 */
export function analyzeCellDetails(board, row, col) {
  if (board[row][col] !== 0) {
    return {
      hasValue: true,
      value: board[row][col],
      analysis: `Cell (${row + 1}, ${col + 1}) already contains ${board[row][col]}.`
    };
  }

  const candidates = getCandidates(board, row, col);
  const rowNumbers = board[row].filter(n => n !== 0);
  const colNumbers = [];
  for (let i = 0; i < 9; i++) {
    if (board[i][col] !== 0) colNumbers.push(board[i][col]);
  }
  
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  const boxNumbers = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const num = board[boxRow + i][boxCol + j];
      if (num !== 0) boxNumbers.push(num);
    }
  }

  return {
    hasValue: false,
    candidates,
    constraints: {
      row: rowNumbers,
      column: colNumbers,
      box: boxNumbers
    },
    analysis: candidates.length === 0 
      ? `Cell (${row + 1}, ${col + 1}) has no valid candidates.`
      : `Cell (${row + 1}, ${col + 1}) can be: ${candidates.join(', ')}. Row has: ${rowNumbers.join(', ') || 'none'}. Column has: ${colNumbers.join(', ') || 'none'}. Box has: ${boxNumbers.join(', ') || 'none'}.`
  };
}

/**
 * Solve step by step and return the sequence
 * @param {number[][]} board - 9x9 Sudoku board
 * @param {number} maxSteps - Maximum steps to generate
 * @returns {array} - Array of steps with reasoning
 */
export function getSolvingSteps(board, maxSteps = 20) {
  const steps = [];
  const boardCopy = board.map(row => [...row]);
  
  for (let i = 0; i < maxSteps; i++) {
    const hint = getNextHint(boardCopy);
    if (!hint || hint.row === null || hint.number === null) break;
    
    steps.push({
      step: i + 1,
      row: hint.row,
      col: hint.col,
      number: hint.number,
      technique: hint.technique,
      reasoning: hint.reasoning,
      boardState: boardCopy.map(row => [...row])
    });
    
    // Apply the move
    boardCopy[hint.row][hint.col] = hint.number;
  }
  
  return steps;
}

export default {
  getNextHint,
  getAllHints,
  explainMove,
  analyzeCellDetails,
  getSolvingSteps
};
