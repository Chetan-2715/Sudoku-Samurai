/**
 * Test suite for Sudoku Solver
 * Run with Node.js to verify solver functionality
 */

// Import solver functions (you may need to adjust the path)
const solver = require('../frontend/src/lib/solver.js');

// Test puzzle (solvable)
const testPuzzle = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

const expectedSolution = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9]
];

console.log('🧪 Testing Sudoku Solver...\n');

// Test 1: Validation
console.log('Test 1: Board Validation');
const validation = solver.validateBoard(testPuzzle);
console.log('Valid:', validation.valid ? '✅' : '❌');
console.log('Errors:', validation.errors.length === 0 ? 'None ✅' : validation.errors);
console.log();

// Test 2: Finding empty cells
console.log('Test 2: Finding Empty Cells');
const emptyCell = solver.findEmptyCell(testPuzzle);
console.log('First empty cell:', emptyCell, emptyCell ? '✅' : '❌');
console.log();

// Test 3: Getting candidates
console.log('Test 3: Getting Candidates');
if (emptyCell) {
  const [row, col] = emptyCell;
  const candidates = solver.getCandidates(testPuzzle, row, col);
  console.log(`Candidates for cell (${row}, ${col}):`, candidates, '✅');
}
console.log();

// Test 4: Solving
console.log('Test 4: Solving Puzzle');
const result = solver.solve(testPuzzle);
console.log('Success:', result.success ? '✅' : '❌');
console.log('Message:', result.message);

// Verify solution
if (result.success) {
  let correct = true;
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (result.solution[i][j] !== expectedSolution[i][j]) {
        correct = false;
        break;
      }
    }
  }
  console.log('Solution matches expected:', correct ? '✅' : '❌');
}
console.log();

// Test 5: Puzzle generation
console.log('Test 5: Puzzle Generation');
const generatedPuzzle = solver.generatePuzzle('medium');
const emptyCells = solver.countEmptyCells(generatedPuzzle);
console.log('Generated puzzle with', emptyCells, 'empty cells');
console.log('Valid puzzle:', solver.validateBoard(generatedPuzzle).valid ? '✅' : '❌');
console.log('Solvable:', solver.isSolvable(generatedPuzzle) ? '✅' : '❌');
console.log();

console.log('✅ All tests completed!');
