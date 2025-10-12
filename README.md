# 🥋 Sudoku Samurai

> An AI-powered Sudoku solver and learning platform with stunning visuals and intelligent gameplay assistance.

<div align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
</div>

## ✨ Features

### 🤖 **AI Solver Mode**
- **Instant Solutions**: Let the AI samurai solve your Sudoku puzzles instantly
- **Smart Input**: Interactive grid with real-time validation
- **Visual Feedback**: Beautiful animations and color-coded responses

### 🧠 **Guided Learning Mode**
- **Step-by-Step Hints**: Get intelligent hints with logical reasoning
- **Educational Approach**: Learn Sudoku techniques while playing
- **Progressive Assistance**: Hints adapt to your skill level

### 🎨 **Stunning Interface**
- **Cinematic Design**: Space-themed UI with animated elements
- **Responsive Layout**: Works perfectly on desktop and mobile
- **Smooth Animations**: Falling numbers and glowing effects
- **Dark Theme**: Easy on the eyes with cyan and gold accents

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **MongoDB** (v4.4 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/sudoku-samurai.git
   cd sudoku-samurai
   ```

2. **Setup Backend**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```



### Running the Application


1. **Start Backend Server**
   ```bash
   cd backend
   python server.py
   ```
   Backend runs on: `http://127.0.0.1:9000`

2. **Start Frontend Development Server**
   ```bash
   cd frontend
   npm start
   ```
   Frontend runs on: `http://localhost:3000`

## 🏗️ Architecture

### Backend (`/backend`)
```
backend/
├── server.py          # FastAPI application
├── requirements.txt   # Python dependencies
└── .env              # Environment variables
```


### Frontend (`/frontend`)
```
frontend/
├── src/
│   ├── components/
│   │   ├── LandingAnimation.jsx    # Animated landing page
│   │   ├── ModeSelection.jsx       # Game mode chooser
│   │   ├── SolverMode.jsx         # AI solver interface
│   │   ├── GuidedMode.jsx         # Learning mode
│   │   └── ui/                    # Reusable UI components
│   ├── hooks/                     # Custom React hooks
│   ├── lib/                       # Utility functions
│   └── App.js                     # Main application
├── package.json
└── tailwind.config.js
```


## 🎮 How to Play

### 1. **AI Solver Mode**
   - Enter your Sudoku puzzle numbers in the grid
   - Click "Solve Puzzle" to get instant solution
   - Watch the AI fill in the missing numbers
   - Use "Reset" to clear the grid and try again

### 2. **Guided Learning Mode**
   - Enter your puzzle and get stuck on a number
   - Click "Get Hint" for step-by-step guidance
   - Read the logical reasoning behind each suggestion
   - Apply hints to learn solving techniques

## 🛠️ Technologies Used

### Frontend
- **React 19** - Modern React with latest features
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **React Hook Form** - Form validation
- **Sonner** - Toast notifications

### Backend
- **FastAPI** - Modern, fast web framework for Python
- **Pydantic** - Data validation using Python type hints
- **Motor** - Async MongoDB driver
- **python-dotenv** - Environment variable management
- **Uvicorn** - ASGI server implementation

### Database
- **MongoDB** - Document-oriented NoSQL database
