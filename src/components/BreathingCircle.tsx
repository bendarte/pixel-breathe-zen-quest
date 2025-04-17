
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

interface BreathingCircleProps {
  playing: boolean;
  breathInTime?: number;
  holdTime?: number;
  breathOutTime?: number;
  onCycleComplete?: () => void;
}

const BreathingCircle: React.FC<BreathingCircleProps> = ({
  playing,
  breathInTime = 4,
  holdTime = 4,
  breathOutTime = 4,
  onCycleComplete
}) => {
  const [phase, setPhase] = useState<'in' | 'hold' | 'out' | 'rest'>('rest');
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (!playing) {
      setPhase('rest');
      setCounter(0);
      return;
    }

    const interval = setInterval(() => {
      setCounter(c => {
        // Handle phase transitions
        if (phase === 'in' && c >= breathInTime) {
          setPhase('hold');
          return 0;
        } else if (phase === 'hold' && c >= holdTime) {
          setPhase('out');
          return 0;
        } else if (phase === 'out' && c >= breathOutTime) {
          setPhase('in');
          if (onCycleComplete) onCycleComplete();
          return 0;
        } else if (phase === 'rest') {
          setPhase('in');
          return 0;
        }
        return c + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [playing, phase, breathInTime, holdTime, breathOutTime, onCycleComplete]);

  // Get instructions based on current phase
  const getInstructions = () => {
    switch(phase) {
      case 'in': return `Breathe In (${breathInTime - counter})`;
      case 'hold': return `Hold (${holdTime - counter})`;
      case 'out': return `Breathe Out (${breathOutTime - counter})`;
      default: return "Get Ready";
    }
  };

  // Circle animation classes based on current phase
  const circleClasses = {
    'in': 'animate-breath-in',
    'hold': 'scale-[1.5] opacity-100',
    'out': 'animate-breath-out',
    'rest': 'scale-100 opacity-70'
  };

  return (
    <div className="relative flex flex-col items-center">
      <div 
        className={cn(
          "w-32 h-32 rounded-full bg-pixel-blue transition-all duration-1000 mb-4",
          circleClasses[phase]
        )}
      />
      <div className="pixel-text text-sm text-center mt-4">{getInstructions()}</div>
    </div>
  );
};

export default BreathingCircle;
