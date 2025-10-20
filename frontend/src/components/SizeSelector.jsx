import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Grid3x3, Grid2X2, LayoutGrid } from 'lucide-react';

const SizeSelector = ({ open, onOpenChange, onSelectSize }) => {
  const sizes = [
    {
      value: 3,
      label: '3×3 Mini',
      description: 'Perfect for beginners',
      icon: Grid2X2,
      difficulty: 'Very Easy',
      color: 'text-green-400'
    },
    {
      value: 6,
      label: '6×6 Medium',
      description: 'Great for practice',
      icon: Grid3x3,
      difficulty: 'Easy',
      color: 'text-blue-400'
    },
    {
      value: 9,
      label: '9×9 Classic',
      description: 'Traditional Sudoku',
      icon: LayoutGrid,
      difficulty: 'Standard',
      color: 'text-purple-400'
    }
  ];

  const handleSelect = (size) => {
    onSelectSize(size);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Choose Grid Size
          </DialogTitle>
          <DialogDescription className="text-center">
            Select the Sudoku board size you'd like to play
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {sizes.map((size) => {
            const Icon = size.icon;
            return (
              <Button
                key={size.value}
                onClick={() => handleSelect(size.value)}
                variant="outline"
                className="h-auto py-6 flex flex-col items-center gap-3 hover:bg-slate-800/50 hover:border-cyan-400 transition-all"
              >
                <Icon className={`h-12 w-12 ${size.color}`} />
                <div className="flex flex-col items-center">
                  <span className="text-lg font-bold">{size.label}</span>
                  <span className="text-sm text-slate-400">{size.description}</span>
                  <span className={`text-xs mt-1 ${size.color}`}>
                    {size.difficulty}
                  </span>
                </div>
              </Button>
            );
          })}
        </div>

        <div className="mt-4 p-4 bg-slate-800/30 rounded-lg">
          <p className="text-sm text-slate-400 text-center">
            💡 <strong>Tip:</strong> Start with 3×3 to learn the basics, then progress to larger grids!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SizeSelector;
