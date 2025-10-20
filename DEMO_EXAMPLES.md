# 🎮 Sudoku Samurai - Demo Examples

## Quick Demo Guide

This document provides example puzzles and demonstrates how to use both Solver Mode and Guided Mode.

---

## 📝 Sample Puzzles

### Easy Puzzle
```
5 3 _ | _ 7 _ | _ _ _
6 _ _ | 1 9 5 | _ _ _
_ 9 8 | _ _ _ | _ 6 _
------+-------+------
8 _ _ | _ 6 _ | _ _ 3
4 _ _ | 8 _ 3 | _ _ 1
7 _ _ | _ 2 _ | _ _ 6
------+-------+------
_ 6 _ | _ _ _ | 2 8 _
_ _ _ | 4 1 9 | _ _ 5
_ _ _ | _ 8 _ | _ 7 9
```

**How to Use:**
1. Navigate to **Solver Mode** or **Guided Mode**
2. Click the cells and enter the numbers shown (skip the underscores)
3. In **Solver Mode**: Click "Solve Puzzle" for instant solution
4. In **Guided Mode**: Click "Get Hint" for step-by-step guidance

---

### Medium Puzzle
```
_ _ _ | 2 6 _ | 7 _ 1
6 8 _ | _ 7 _ | _ 9 _
1 9 _ | _ _ 4 | 5 _ _
------+-------+------
8 2 _ | 1 _ _ | _ 4 _
_ _ 4 | 6 _ 2 | 9 _ _
_ 5 _ | _ _ 3 | _ 2 8
------+-------+------
_ _ 9 | 3 _ _ | _ 7 4
_ 4 _ | _ 5 _ | _ 3 6
7 _ 3 | _ 1 8 | _ _ _
```

---

### Hard Puzzle
```
_ _ _ | 6 _ _ | 4 _ _
7 _ _ | _ _ 3 | 6 _ _
_ _ _ | _ 9 1 | _ 8 _
------+-------+------
_ _ _ | _ _ 8 | 1 _ 2
_ _ _ | _ 6 _ | _ _ _
1 _ 2 | 5 _ _ | _ _ _
------+-------+------
_ 8 _ | 2 1 _ | _ _ _
_ _ 5 | 4 _ _ | _ _ 7
_ _ 4 | _ _ 9 | _ _ _
```

---

## 🤖 Solver Mode Demo

### Step-by-Step Usage:

1. **Start Fresh**
   - Click "Reset" to clear the grid
   - Or click "Generate Puzzle" for a random puzzle

2. **Enter Your Puzzle**
   - Click each cell
   - Type numbers 1-9
   - Press Backspace to clear a cell

3. **Solve It**
   - Click "Solve Puzzle"
   - Watch the algorithm fill in the solution
   - Toast notification confirms success

4. **Try Another**
   - Click "Generate Puzzle" for a new challenge
   - Click "Reset" to enter a custom puzzle

### Example Output:
```
✅ Puzzle Solved!
Puzzle solved successfully!
```

---

## 🧠 Guided Mode Demo

### Step-by-Step Usage:

1. **Load a Puzzle**
   - Click "Practice Puzzle" for an easy puzzle
   - Or enter your own puzzle manually

2. **Get Your First Hint**
   - Click "Get Hint"
   - The system highlights a cell
   - Shows the suggested number
   - Displays the solving technique used

3. **Read the Reasoning**
   - Understand WHY that number fits
   - See all possible candidates
   - Learn the logical technique

4. **Apply or Continue**
   - Click "Apply Hint" to fill the cell automatically
   - Or manually enter the number yourself
   - Click "Get Hint" again for the next step

### Example Hint Display:

```
🧠 Technique: Naked Single

💡 Suggested Number: 5

📋 Possible values: 5

📖 Reasoning:
Cell (4, 3) can only be 5. It's the only number that 
doesn't conflict with the row, column, and 3x3 box 
constraints.

✅ [Apply Hint]
```

---

## 🎓 Learning Examples

### Technique 1: Naked Single
**Definition**: A cell that has only one possible candidate.

**Example:**
```
Row 5: [4, _, _, 8, _, 3, _, _, 1]
Column 2: [3, _, _, _, _, _, 6, _, _]
Box: Has [4, 8, 3, 1, 6, 7, 9]

Missing in box: [2, 5]
Cell candidates after checking row/column: [5]

Result: Must be 5!
```

---

### Technique 2: Hidden Single (Row)
**Definition**: A number that can only fit in one cell within a row.

**Example:**
```
Row 3 needs the number 7

Checking each empty cell:
- Cell (3, 2): Conflicts with column
- Cell (3, 5): Conflicts with box
- Cell (3, 8): No conflicts! ✅

Result: 7 must go in (3, 8)
```

---

### Technique 3: Hidden Single (Column)
**Definition**: A number that can only fit in one cell within a column.

**Example:**
```
Column 6 needs the number 4

Checking each empty cell:
- Cell (1, 6): Conflicts with row
- Cell (4, 6): Conflicts with box
- Cell (7, 6): No conflicts! ✅

Result: 4 must go in (7, 6)
```

---

### Technique 4: Hidden Single (Box)
**Definition**: A number that can only fit in one cell within a 3x3 box.

**Example:**
```
Box #5 (center box) needs the number 2

Checking each empty cell:
- Cell (3, 4): Conflicts with row
- Cell (4, 3): Conflicts with column
- Cell (5, 5): No conflicts! ✅

Result: 2 must go in (5, 5)
```

---

## 🎯 Tips for Best Experience

### For Beginners:
1. Start with **Guided Mode**
2. Use "Practice Puzzle" for easy puzzles
3. Read each hint's reasoning carefully
4. Try to predict the next move before clicking "Get Hint"
5. Apply hints manually to reinforce learning

### For Intermediate:
1. Use **Guided Mode** when stuck
2. Try to solve as much as possible manually
3. Use hints only when needed
4. Learn to recognize patterns (naked singles, etc.)

### For Advanced:
1. Use **Solver Mode** to verify solutions
2. Generate hard puzzles for practice
3. Time yourself
4. Try to minimize hint usage

---

## 🔍 Troubleshooting

### "Unable to Solve" Error
**Causes:**
- Invalid puzzle (duplicate numbers in row/column/box)
- Unsolvable puzzle (no valid solution exists)
- Contradictory clues

**Solution:**
- Check for duplicate numbers
- Verify the puzzle is copied correctly
- Try "Reset" and re-enter

---

### No Hints Available
**Causes:**
- Puzzle is complete
- Board has errors

**Solution:**
- Check if all cells are filled
- Look for conflicts (red highlighting)

---

## 🚀 Quick Start Commands

### Generate a Random Puzzle:
1. Go to Solver Mode
2. Click "Generate Puzzle"
3. Medium difficulty puzzle appears

### Practice with Hints:
1. Go to Guided Mode
2. Click "Practice Puzzle"
3. Click "Get Hint"
4. Read reasoning
5. Apply or enter manually

### Solve Your Own Puzzle:
1. Go to Solver Mode
2. Enter your puzzle numbers
3. Click "Solve Puzzle"
4. View solution

---

## 📊 Feature Comparison

| Feature | Solver Mode | Guided Mode |
|---------|-------------|-------------|
| **Instant Solve** | ✅ | ❌ |
| **Step-by-Step** | ❌ | ✅ |
| **Reasoning** | ❌ | ✅ |
| **Technique Names** | ❌ | ✅ |
| **Auto Solve** | ✅ | ❌ |
| **Learning Focus** | ❌ | ✅ |
| **Difficulty** | Medium | Easy |
| **Best For** | Quick answers | Learning |

---

## 🎨 Visual Guide

### Cell States:
- **Empty (White)**: Ready for input
- **Filled (Cyan)**: User-entered number
- **Highlighted (Yellow/Gold)**: Suggested move
- **Solution (Cyan Glow)**: Solved cells

### Button States:
- **Primary (Cyan)**: Main action (Solve, Get Hint)
- **Secondary (Gray)**: Generate/Practice
- **Outline (White Border)**: Reset

### Notifications:
- **Green Toast**: Success ✅
- **Red Toast**: Error ❌
- **Blue Toast**: Information ℹ️

---

## 💡 Pro Tips

1. **Use Keyboard**: Tab between cells for faster entry
2. **Double-Check**: Always verify your input before solving
3. **Learn Patterns**: Recognize common sudoku patterns
4. **Practice Daily**: Use "Practice Puzzle" for daily training
5. **Experiment**: Try different solving orders in Guided Mode

---

## 🎓 Educational Resources

### Sudoku Techniques (Implemented):
- ✅ Naked Singles
- ✅ Hidden Singles (Row/Column/Box)

### Advanced Techniques (Not Yet Implemented):
- Naked Pairs/Triples
- Hidden Pairs/Triples
- Pointing Pairs
- Box/Line Reduction
- X-Wing
- Swordfish
- Y-Wing
- XYZ-Wing

---

## 🆘 Support

If you encounter issues:
1. Check this demo guide
2. Verify your input
3. Try resetting the board
4. Check browser console for errors
5. Report issues on GitHub

---

## 🎉 Have Fun!

Sudoku Samurai combines powerful AI solving with educational guidance. Whether you want instant solutions or step-by-step learning, we've got you covered!

**Remember**: The journey of solving is as important as the solution itself. Take your time, understand the logic, and enjoy the puzzle! 🧩
