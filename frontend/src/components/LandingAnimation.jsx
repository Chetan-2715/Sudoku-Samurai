import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Sparkles, Zap } from 'lucide-react';

const LandingAnimation = ({ onGetStarted }) => {
  const [showGrid, setShowGrid] = useState(false);
  const [fallingNumbers, setFallingNumbers] = useState([]);
  const [showTitle, setShowTitle] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Start grid animation after 1 second
    const gridTimer = setTimeout(() => {
      setShowGrid(true);
    }, 1000);

    // Start falling numbers after 2 seconds
    const numbersTimer = setTimeout(() => {
      const numbers = [];
      const positions = [];
      
      // Generate 18 random unique positions
      while (positions.length < 18) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        const key = `${row}-${col}`;
        
        if (!positions.includes(key)) {
          positions.push(key);
          numbers.push({
            value: Math.floor(Math.random() * 9) + 1,
            row,
            col,
            delay: Math.random() * 2
          });
        }
      }
      
      setFallingNumbers(numbers);
    }, 2000);

    // Show title after falling animation
    const titleTimer = setTimeout(() => {
      setShowTitle(true);
    }, 5000);

    // Show button last
    const buttonTimer = setTimeout(() => {
      setShowButton(true);
    }, 5800);

    return () => {
      clearTimeout(gridTimer);
      clearTimeout(numbersTimer);
      clearTimeout(titleTimer);
      clearTimeout(buttonTimer);
    };
  }, []);

  return (
    <div className="landing-container">
      {/* Animated stars background */}
      <div className="stars-background">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Sudoku grid */}
      <div className={`sudoku-landing-grid ${showGrid ? 'visible' : ''}`}>
        {[...Array(9)].map((_, row) => (
          <div key={row} className="grid-row">
            {[...Array(9)].map((_, col) => {
              const number = fallingNumbers.find(
                n => n.row === row && n.col === col
              );
              
              return (
                <div
                  key={`${row}-${col}`}
                  className={`grid-cell ${
                    (row + 1) % 3 === 0 && row !== 8 ? 'border-bottom-thick' : ''
                  } ${
                    (col + 1) % 3 === 0 && col !== 8 ? 'border-right-thick' : ''
                  }`}
                >
                  {number && (
                    <span
                      className="falling-number"
                      style={{ animationDelay: `${number.delay}s` }}
                    >
                      {number.value}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Title */}
      <div className={`landing-title ${showTitle ? 'visible' : ''}`}>
        <h1 className="title-text">
          <Sparkles className="title-icon" />
          Sudoku Samurai
          <Sparkles className="title-icon" />
        </h1>
        <div className="title-glow"></div>
      </div>

      {/* Get Started Button */}
      {showButton && (
        <div className="landing-button-container">
          <Button
            onClick={onGetStarted}
            className="get-started-button"
            size="lg"
          >
            Get Started
            <Zap className="ml-2 h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default LandingAnimation;