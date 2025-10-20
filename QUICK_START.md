# 🚀 Quick Start Guide - Sudoku Samurai

## Installation & Setup

### 1. Install Dependencies

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies (optional)
cd ../backend
pip install -r requirements.txt
```

### 2. Start the Application

#### Frontend Only (Recommended for Testing)
```bash
cd frontend
npm start
```
The app will open at `http://localhost:3000`

#### Full Stack (Frontend + Backend)
```bash
# Terminal 1 - Backend
cd backend
python server.py

# Terminal 2 - Frontend
cd frontend
npm start
```

---

## 🎮 Using the Application

### Solver Mode - Instant Solutions

1. **Click "Solve with the Bot"** from mode selection
2. **Enter your puzzle** by clicking cells and typing numbers
3. **OR Click "Generate Puzzle"** for a random puzzle
4. **Click "Solve Puzzle"** to get instant solution
5. **Click "Reset"** to start over

**Example:**
```
Input:  5 3 _ | _ 7 _ | _ _ _
        6 _ _ | 1 9 5 | _ _ _
        ...

Output: Complete solved puzzle in < 1 second!
```

---

### Guided Mode - Learn Step-by-Step

1. **Click "Guided Mode"** from mode selection
2. **Click "Practice Puzzle"** for an easy puzzle
3. **OR Enter your own puzzle** manually
4. **Click "Get Hint"** for next logical move
5. **Read the reasoning** and technique explanation
6. **Click "Apply Hint"** or enter manually
7. **Repeat** until puzzle is solved

**Example Hint:**
```
🧠 Technique: Hidden Single (Row)

💡 Number: 7
📋 Candidates: [7]

📖 In row 4, the number 7 can only go in column 6. 
   This is the only cell in the row where 7 doesn't 
   conflict with the column or 3x3 box constraints.

✅ [Apply Hint]
```

---

## 🎯 Quick Examples

### Example 1: Solve a Puzzle
```javascript
// The solver automatically handles this in the UI!
// Just enter numbers and click "Solve Puzzle"
```

### Example 2: Get a Hint
```javascript
// Click "Get Hint" in Guided Mode
// The system will:
// 1. Find the best next move
// 2. Explain why it's the right move
// 3. Show which technique was used
```

### Example 3: Generate Random Puzzle
```javascript
// Click "Generate Puzzle" in Solver Mode
// Or "Practice Puzzle" in Guided Mode
// Instant random valid puzzle!
```

---

## 📝 Sample Puzzle (Copy & Paste)

Easy puzzle to try:
```
Row 1: 5 3 _ _ 7 _ _ _ _
Row 2: 6 _ _ 1 9 5 _ _ _
Row 3: _ 9 8 _ _ _ _ 6 _
Row 4: 8 _ _ _ 6 _ _ _ 3
Row 5: 4 _ _ 8 _ 3 _ _ 1
Row 6: 7 _ _ _ 2 _ _ _ 6
Row 7: _ 6 _ _ _ _ 2 8 _
Row 8: _ _ _ 4 1 9 _ _ 5
Row 9: _ _ _ _ 8 _ _ 7 9
```

---

## 🛠️ Development Commands

### Run Development Server
```bash
cd frontend
npm start
```

### Build for Production
```bash
cd frontend
npm run build
```

### Run Tests
```bash
cd tests
node test_solver.js
```

### Lint Code
```bash
cd frontend
npm run test
```

---

## 🔧 Configuration

### Environment Variables

Frontend (`.env.production`):
```env
REACT_APP_API_URL=http://127.0.0.1:9000
```

Backend (`.env`):
```env
MONGO_URL=your_mongodb_connection_string
DB_NAME=sudoku_samurai
CORS_ORIGINS=http://localhost:3000
```

---

## 📦 Project Structure

```
Sudoku-Samurai/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── SolverMode.jsx       ✅ Updated
│   │   │   ├── GuidedMode.jsx       ✅ Updated
│   │   │   └── SudokuGrid.jsx
│   │   ├── lib/
│   │   │   ├── solver.js            ⭐ NEW
│   │   │   └── guidedSolver.js      ⭐ NEW
│   │   └── App.js
│   └── package.json
├── backend/
│   ├── server.py
│   └── requirements.txt
├── tests/
│   └── test_solver.js               ⭐ NEW
├── IMPLEMENTATION_SUMMARY.md        ⭐ NEW
├── DEMO_EXAMPLES.md                 ⭐ NEW
├── CHANGES.md                       ⭐ NEW
└── QUICK_START.md                   ⭐ NEW (this file)
```

---

## 🚨 Troubleshooting

### Build Errors
**Problem:** Module not found
**Solution:** 
```bash
cd frontend
npm install
```

### Runtime Errors
**Problem:** "Unable to solve" message
**Solution:** Check that your input puzzle:
- Has no duplicate numbers in rows
- Has no duplicate numbers in columns
- Has no duplicate numbers in 3x3 boxes

### Blank Screen
**Problem:** Nothing shows after npm start
**Solution:**
1. Clear browser cache
2. Check console for errors
3. Try `npm install` again

---

## 💡 Tips for Best Experience

1. **Start with Guided Mode** to learn the logic
2. **Use Practice Puzzle** for easy learning puzzles
3. **Read the reasoning** carefully to understand techniques
4. **Try Solver Mode** when you just need quick answers
5. **Generate Puzzles** for unlimited practice

---

## 🎓 Learning Path

### Beginner (Week 1)
- Use Guided Mode exclusively
- Generate easy practice puzzles
- Apply hints manually (don't auto-apply)
- Read each reasoning explanation

### Intermediate (Week 2-3)
- Try to solve without hints first
- Use hints only when stuck
- Learn to recognize Naked Singles
- Practice identifying Hidden Singles

### Advanced (Week 4+)
- Use Solver Mode for verification only
- Generate medium/hard puzzles
- Time yourself
- Minimize hint usage

---

## 📚 Additional Resources

- **Technical Details**: See `IMPLEMENTATION_SUMMARY.md`
- **Usage Examples**: See `DEMO_EXAMPLES.md`
- **Change Log**: See `CHANGES.md`
- **API Documentation**: See `CHANGES.md` (API section)

---

## 🆘 Need Help?

### Common Questions

**Q: How do I enter a puzzle?**
A: Click each cell and type a number 1-9. Press Backspace to clear.

**Q: What if my puzzle won't solve?**
A: Check for duplicate numbers or invalid initial state.

**Q: Can I solve Samurai Sudoku (5-grid)?**
A: Currently supports standard 9x9 only. Samurai coming soon!

**Q: How do hints work?**
A: Hints use logical deduction techniques, not brute force.

**Q: Are generated puzzles unique?**
A: Yes, each has a unique solution guaranteed.

---

## ✅ Verification

Build successful? Run this command:
```bash
cd frontend
npm run build
```

Should output:
```
✅ Compiled successfully.
```

---

## 🎉 You're Ready!

Everything is set up and ready to use. Start with:
```bash
cd frontend
npm start
```

Then navigate to `http://localhost:3000` and enjoy! 🧩

---

*For more details, see the other documentation files.*
*Last updated: October 20, 2025*
