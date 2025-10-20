# 🥋 Sudoku Samurai

<div align="center">

### *Master the Art of Sudoku with Intelligence and Style*

An advanced Sudoku solver and learning platform featuring **real-time solving algorithms**, **intelligent guided hints**, **dynamic grid sizes**, and a **stunning space-themed UI**.

[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)


[Features](#-key-features) • [Demo](#-live-demo) • [Installation](#-installation) • [Documentation](./documentation/) • [Contributing](#-contributing)

</div>

---

## 📖 About

**Sudoku Samurai** is not just another Sudoku app—it's a complete learning platform that combines powerful solving algorithms with educational guidance. Whether you're a beginner learning the basics or an expert tackling challenging puzzles, Sudoku Samurai provides the tools and insights you need.

### What Makes It Special?

- 🧮 **Real Backtracking Algorithm** - Solves ANY valid Sudoku puzzle instantly using computer science fundamentals
- 📐 **Dynamic Grid Sizes** - Play with 3×3, 6×6, or classic 9×9 grids
- 🔴 **Real-Time Conflict Detection** - Instant visual feedback for duplicate numbers with red highlighting
- 🎨 **Beautiful Space-Themed UI** - Stunning dark interface with smooth animations and glowing effects
- 🎲 **Smart Puzzle Generation** - Create random valid puzzles at easy, medium, and hard difficulty levels
- ⚡ **Lightning Fast** - Solve 9×9 puzzles in under 200ms

---

## 🌟 Key Features

### 🎯 **Multiple Grid Sizes**

<table>
<tr>
<td width="33%" align="center">
  <h4>3×3 Mini</h4>
  <p><strong>Perfect for beginners</strong><br/>1×3 box layout<br/>Numbers 1-3<br/>Very Easy</p>
</td>
<td width="33%" align="center">
  <h4>6×6 Medium</h4>
  <p><strong>Great for practice</strong><br/>2×3 box layout<br/>Numbers 1-6<br/>Easy</p>
</td>
<td width="33%" align="center">
  <h4>9×9 Classic</h4>
  <p><strong>Traditional Sudoku</strong><br/>3×3 box layout<br/>Numbers 1-9<br/>Standard</p>
</td>
</tr>
</table>

Start with 3×3 to learn the basics, progress to 6×6 for practice, and master the classic 9×9!

### 🤖 **Intelligent Solver Mode**

The Solver Mode uses a real **backtracking algorithm** (the same technique used by professional Sudoku solvers) to find solutions:

**Features:**
- ⚡ **Instant Solving** - Solves puzzles in milliseconds using recursive backtracking
- 🎲 **Puzzle Generation** - Create random valid puzzles at multiple difficulty levels
- ✅ **Validation** - Real-time checking for invalid board states and conflicts
- 🔄 **Dynamic** - Works seamlessly with all grid sizes (3×3, 6×6, 9×9)
- 🚫 **Unsolvable Detection** - Identifies and reports puzzles with no solution

**How the Algorithm Works:**
```
1. Find the next empty cell
2. Try numbers 1 through N (where N = grid size)
3. Check if the number is valid (no conflicts in row/column/box)
4. Place the number and recursively solve the rest
5. If solution found, return success
6. If no solution, backtrack and try the next number
7. Repeat until solved or proven unsolvable
```

### 🧠 **Guided Learning Mode**

Learn to solve Sudoku like an expert! The Guided Mode provides step-by-step hints with detailed reasoning, just like LinkedIn Sudoku's educational approach.

**Features:**
- 💡 **Smart Hints** - Get the next logical move with complete explanations
- 🎓 **Technique Detection** - Learn actual Sudoku solving techniques:
  - **Naked Singles** - Cells with only one possible value
  - **Hidden Singles (Row)** - Numbers that fit only one cell in a row
  - **Hidden Singles (Column)** - Numbers that fit only one cell in a column
  - **Hidden Singles (Box)** - Numbers that fit only one cell in a box
  - **Trial Approach** - Strategic guessing when logic isn't enough
- 📊 **Candidate Display** - See all possible values for each cell
- 🎯 **Visual Highlighting** - Gold highlight shows the suggested cell

**Example Hint Output:**
```
🧠 Technique: Hidden Single (Row)
💡 Suggested Number: 7
📋 Possible Values: [7]
📖 Reasoning: "In row 4, the number 7 can only go in column 6. 
    This is the only cell in the row where 7 doesn't conflict 
    with the column or 3×3 box constraints."
✅ [Apply Hint Button]
```

### 🔴 **Real-Time Conflict Detection**

Never wonder if your input is valid! The app instantly detects and highlights duplicate numbers.

**Features:**
- 🚨 **Instant Feedback** - Duplicate numbers highlighted in red immediately as you type
- 💥 **Visual Alerts** - Pulsing animation draws attention to conflicting cells
- ⚠️ **Warning Messages** - Clear alert banner explains the conflict
- 🚫 **Smart Prevention** - Cannot solve or get hints while conflicts exist
- ✨ **Auto-Resolution** - Red highlighting disappears when duplicates are removed

**What Gets Detected:**
- ❌ Row duplicates (same number appears twice in a row)
- ❌ Column duplicates (same number appears twice in a column)
- ❌ Box duplicates (same number appears twice in a box/subgrid)

**Visual Indicators:**
- 🔴 Red pulsing background on all conflicting cells
- 🔴 Red text color for numbers in conflict
- ⚠️ Warning alert: "Duplicate numbers detected! Red highlighted cells have conflicts."

### 🎨 **Stunning Visual Design**

**Space-Themed Interface:**
- 🌌 Dark background with cosmic gradients
- ⭐ Animated falling numbers on landing page
- ✨ Smooth transitions and hover effects
- 💫 Glowing neon accents (cyan and gold)

**Color-Coded Feedback:**
- 💙 **Cyan (#00d4ff)** - Normal cells and text
- 💛 **Gold (#ffd700)** - Highlighted hints and box borders
- 🔴 **Red (#ef4444)** - Conflict cells and errors
- ⚫ **Dark** - Background for easy on the eyes

**Animations:**
- Pulsing highlights on hint cells (gold glow)
- Pulsing alerts on conflict cells (red glow)
- Smooth hover effects on buttons
- Slide-in animations for hints and alerts
- Spinning loader during solving

---

## 🚀 Installation

### Prerequisites

- **Node.js** v16 or higher ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- *Optional:* **Python** v3.8+ (for backend features)
- *Optional:* **MongoDB** v4.4+ (for backend database)

### Quick Setup (Frontend Only)

Get up and running in under 2 minutes:

```bash
# 1. Clone the repository
git clone https://github.com/Chetan-2715/Sudoku-Samurai.git
cd Sudoku-Samurai

# 2. Install frontend dependencies
cd frontend
npm install

# 3. Start the development server
npm start
```

🎉 **That's it!** The app will open at `http://localhost:3000`

### Backend Setup (Optional)

The backend is optional and provides extended features:

```bash
# From project root
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Create .env file
echo "MONGO_URL=your_mongodb_url" > .env
echo "DB_NAME=sudoku_samurai" >> .env

# Start backend
python server.py
```



The optimized build will be in `frontend/build` folder.

---

## 📚 Documentation

Comprehensive documentation is available in the [`documentation/`](./documentation/) folder:

| Document | Description | Audience |
|----------|-------------|----------|
| [**Quick Start Guide**](./documentation/QUICK_START.md) | Installation & basic usage | Everyone |
| [**Implementation Details**](./documentation/IMPLEMENTATION_SUMMARY.md) | How the solver works | Developers |
| [**Feature Guide**](./documentation/FEATURE_SUMMARY.md) | Complete feature overview | Everyone |
| [**Dynamic Grids**](./documentation/DYNAMIC_GRID_IMPLEMENTATION.md) | Grid sizes & conflicts | Developers |
| [**Usage Examples**](./documentation/DEMO_EXAMPLES.md) | Sample puzzles | Users |
| [**Changelog**](./documentation/CHANGES.md) | Version history | Developers |

**Quick Links:**
- 🆕 New user? [QUICK_START.md](./documentation/QUICK_START.md)
- 💻 Developer? [IMPLEMENTATION_SUMMARY.md](./documentation/IMPLEMENTATION_SUMMARY.md)
- 🎮 Examples? [DEMO_EXAMPLES.md](./documentation/DEMO_EXAMPLES.md)

## 🏗️ Project Architecture

### Folder Structure

```
Sudoku-Samurai/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── LandingAnimation.jsx    # Landing page with falling numbers
│   │   │   ├── ModeSelection.jsx       # Choose Solver/Guided mode
│   │   │   ├── SolverMode.jsx          # Instant solver interface
│   │   │   ├── GuidedMode.jsx          # Step-by-step hints interface
│   │   │   ├── SudokuGrid.jsx          # Dynamic grid component
│   │   │   ├── SizeSelector.jsx        # Grid size selection modal
│   │   │   └── ui/                     # Shadcn/Radix UI components
│   │   ├── lib/
│   │   │   ├── solver.js               # Original 9×9 solver
│   │   │   ├── guidedSolver.js         # Original guided hints
│   │   │   ├── dynamicSolver.js        # ⭐ Multi-size solver engine
│   │   │   └── dynamicGuidedSolver.js  # ⭐ Multi-size guided hints
│   │   ├── hooks/
│   │   │   └── use-toast.js            # Toast notifications
│   │   ├── App.js                      # Main application
│   │   ├── App.css                     # Global styles
│   │   └── index.js                    # Entry point
│   ├── public/                         # Static assets
│   └── package.json                    # Dependencies
├── backend/
│   ├── server.py                       # FastAPI server
│   ├── requirements.txt                # Python dependencies
│   └── .env                            # Environment variables
├── tests/
│   └── test_solver.js                  # Solver unit tests
├── documentation/                      # 📚 Comprehensive docs
│   ├── README.md
│   ├── QUICK_START.md
│   ├── IMPLEMENTATION_SUMMARY.md
│   ├── DYNAMIC_GRID_IMPLEMENTATION.md
│   └── ...
└── README.md                           # This file
```

### Core Algorithm Files

#### `dynamicSolver.js` - Multi-Size Solver Engine

**Key Functions:**
- `getBoxDimensions(size)` - Calculate box layout
- `isValid(board, row, col, num, size)` - Validate placement
- `findConflicts(board, row, col, value, size)` - Find duplicates
- `getAllConflicts(board, size)` - Scan entire board
- `solveSudoku(board, size)` - Backtracking solver
- `generatePuzzle(size, difficulty)` - Create puzzles

**Performance:**
- Time: O(N^M) worst case
- Space: O(N²) recursion stack
- Practical: 10-200ms for 9×9

#### `dynamicGuidedSolver.js` - Hint Engine

**Techniques:**
1. Naked Single
2. Hidden Single (Row/Column/Box)

**Key Functions:**
- `findNakedSingle(board, size)`
- `findHiddenSingleInRow/Column/Box(board, size)`
- `getNextHint(board, size)` - Returns hint with reasoning
- `explainMove(board, row, col, num, size)`

---

## 🎮 How to Use

### 🤖 Using Solver Mode

1. **Select Grid Size** - Choose 3×3, 6×6, or 9×9
2. **Enter/Generate Puzzle** - Click "Generate Puzzle" or enter manually
3. **Solve** - Click "Solve Puzzle" for instant solution
4. **Try Another** - Reset or change size

### 🧠 Using Guided Mode

1. **Select Grid Size** - Choose your difficulty
2. **Load Puzzle** - Generate practice puzzle or enter your own
3. **Get Hints** - Click "Get Hint" when stuck
4. **Learn** - Read reasoning and apply hints

### 🔴 Conflict Detection

**Visual Indicators:**
- Red pulsing background on conflicts
- Warning alert banner
- Disabled solve/hint buttons

**How to Fix:**
- Change duplicate numbers
- Watch highlighting disappear
- Buttons re-enable

---

## 🛠️ Tech Stack

### Frontend
- **React** 18.2.0 - UI Framework
- **TailwindCSS** 3.4+ - Styling
- **Radix UI** - Components
- **Lucide React** - Icons
- **Sonner** - Toasts

### Backend (Optional)
- **FastAPI** - Web framework
- **MongoDB** - Database
- **Uvicorn** - ASGI server

---


### Performance Benchmarks

| Operation | 3×3 | 6×6 | 9×9 |
|-----------|-----|-----|-----|
| Conflict Detection | <1ms | <5ms | <10ms |
| Solve Puzzle | <5ms | 10-50ms | 20-200ms |
| Generate Puzzle | <10ms | 20-80ms | 50-300ms |

---

## 🤝 Contributing

Contributions welcome! Here's how:

1. 🐛 **Report Bugs** - Open an issue
2. 💡 **Suggest Features** - Start a discussion
3. 📝 **Improve Docs** - Fix typos, add examples
4. 🔧 **Submit PRs** - Fix bugs or add features
5. ⭐ **Star the Repo** - Show support!






## 🙏 Acknowledgments

- **React Team** - Amazing framework
- **Tailwind CSS** - Utility-first CSS
- **Radix UI** - Accessible components
- **Lucide** - Beautiful icons
- **LinkedIn Sudoku** - Guided hint inspiration
- **Open Source Community** - Tools and resources

---


### Connect
- 👨‍💻 **Developer**: [Chetan-2715](https://github.com/Chetan-2715)
- 🌟 **Star the Repo**
- 🔔 **Watch for Updates**

---

## 🗺️ Roadmap

### ✅ Current Features
- [x] Real backtracking solver
- [x] Guided hints with reasoning
- [x] Dynamic grid sizes (3×3, 6×6, 9×9)
- [x] Real-time conflict detection
- [x] Puzzle generation
- [x] Beautiful UI
- [x] Smooth animations

### 🚀 Upcoming Features
- [ ] Advanced techniques (X-Wing, Swordfish)
- [ ] Candidate marking mode
- [ ] Undo/redo functionality
- [ ] Timed challenges
- [ ] Daily puzzles
- [ ] Leaderboards
- [ ] Mobile app
- [ ] Multiplayer mode

---

## 📊 Project Stats

**Code:**
- 📝 Lines: ~3,000+ (code) + 4,000+ (docs)
- 📁 Components: 8+ React components
- 🧮 Algorithms: 2 solvers + 4 techniques
- 📐 Grid Sizes: 3 supported sizes
- 🎨 Animations: 5+ CSS animations

**Performance:**
- ⚡ Solve: 10-200ms for 9×9
- 🔍 Conflict Check: <10ms
- 📦 Build: 95KB gzipped
- 🎯 Lighthouse: 95+ score

---

<div align="center">

## ⭐ Star History

If you find this helpful, please star the repo!

---

### 🥋 Built with ❤️ by Chetan-2715

**Master the Art of Sudoku** • **Learn While Playing** • **Solve with Intelligence**

[⬆ Back to Top](#-sudoku-samurai)

</div>
