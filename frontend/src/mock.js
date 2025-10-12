// Mock data for Sudoku Samurai

export const mockSudokuPuzzles = [
  {
    puzzle: [
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ],
    solution: [
      [5, 3, 4, 6, 7, 8, 9, 1, 2],
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, 7, 9]
    ]
  }
];

// Mock AI solver - returns solution for any input
export const mockSolveSudoku = (puzzle) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // For now, return the predefined solution
      resolve({
        success: true,
        solution: mockSudokuPuzzles[0].solution,
        message: "Sudoku solved successfully!"
      });
    }, 1500);
  });
};

// Mock AI guided hints
export const mockGetHint = (puzzle, row, col) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const hints = [
        {
          number: 4,
          reasoning: "This cell must be 4 because it's the only number missing in this row, and it doesn't conflict with the column or 3x3 box."
        },
        {
          number: 7,
          reasoning: "Looking at the column, 7 is the only number that can fit here. All other possibilities are already present in this 3x3 box."
        },
        {
          number: 2,
          reasoning: "By elimination, 2 is the only valid number. The row already has 1,3,4,5,6,7,8,9, and this box needs a 2 in this position."
        },
        {
          number: 9,
          reasoning: "This 3x3 box is missing only 9. Checking the row and column confirms no conflicts - 9 is the answer."
        },
        {
          number: 1,
          reasoning: "The naked single technique reveals 1 here. It's the only remaining candidate after checking row, column, and box constraints."
        }
      ];
      
      const randomHint = hints[Math.floor(Math.random() * hints.length)];
      resolve({
        success: true,
        hint: randomHint
      });
    }, 800);
  });
};

// Mock validate Sudoku
export const mockValidateSudoku = (puzzle) => {
  return {
    valid: true,
    errors: []
  };
};