
import { useState, useEffect } from "react";
import PixelContainer from "./PixelContainer";
import PixelButton from "./PixelButton";
import BreathingCircle from "./BreathingCircle";
import DialogBox from "./DialogBox";
import PixelCharacter from "./PixelCharacter";
import { Timer } from "lucide-react";

interface BreathingPattern {
  name: string;
  description: string;
  inTime: number;
  holdTime: number;
  outTime: number;
}

const breathingPatterns: BreathingPattern[] = [
  {
    name: "Box Breathing",
    description: "Breathe in for 4, hold for 4, exhale for 4. Great for relaxation.",
    inTime: 4,
    holdTime: 4,
    outTime: 4
  },
  {
    name: "4-7-8 Technique",
    description: "Breathe in for 4, hold for 7, exhale for 8. Helps reduce anxiety.",
    inTime: 4,
    holdTime: 7,
    outTime: 8
  },
  {
    name: "Calm Breath",
    description: "Breathe in for 5, hold for 2, exhale for 5. For focus and clarity.",
    inTime: 5,
    holdTime: 2,
    outTime: 5
  }
];

const BreathingExercise = () => {
  const [selectedPattern, setSelectedPattern] = useState<BreathingPattern>(breathingPatterns[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  
  // Calculate total time for the exercise
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [isPlaying]);
  
  // Handle exercise completion
  const handleComplete = () => {
    if (isPlaying) {
      setCycleCount(prev => prev + 1);
    }
  };
  
  const startExercise = () => {
    setIsPlaying(true);
    setCycleCount(0);
    setTimer(0);
  };
  
  const stopExercise = () => {
    setIsPlaying(false);
    setTotalTime(prev => prev + timer);
    
    // Dispatch event for progress tracking
    const minutes = Math.round(timer / 60);
    if (timer > 30) { // Only count if did at least 30 seconds
      const event = new CustomEvent('mindfulness-session-complete', {
        detail: { minutes: minutes > 0 ? minutes : 1 }
      });
      window.dispatchEvent(event);
    }
  };

  return (
    <PixelContainer className="w-full">
      <h2 className="pixel-text text-lg mb-4">Breathing Exercise</h2>
      
      {!isPlaying && (
        <div className="mb-4">
          <div className="mb-4">
            <label className="pixel-text text-xs block mb-2">Select a breathing pattern:</label>
            <select 
              className="w-full p-2 pixel-border bg-white font-pixel text-xs"
              value={selectedPattern.name}
              onChange={(e) => {
                const selected = breathingPatterns.find(p => p.name === e.target.value);
                if (selected) setSelectedPattern(selected);
              }}
            >
              {breathingPatterns.map(pattern => (
                <option key={pattern.name} value={pattern.name}>
                  {pattern.name}
                </option>
              ))}
            </select>
          </div>
          
          <DialogBox 
            text={selectedPattern.description}
            className="mb-4"
          />
          
          <PixelButton onClick={startExercise}>
            Start Exercise
          </PixelButton>
        </div>
      )}
      
      {isPlaying && (
        <div className="flex flex-col items-center">
          <div className="flex justify-between w-full items-center mb-4">
            <div className="pixel-text text-xs">
              Cycles: {cycleCount}
            </div>
            <div className="flex items-center pixel-text text-xs">
              <Timer className="w-4 h-4 mr-1" />
              {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}
            </div>
          </div>
          
          <div className="flex items-center justify-center mb-6">
            <PixelCharacter 
              type="meditation" 
              animationState="breathe"
              className="mr-6"
            />
            
            <BreathingCircle 
              playing={isPlaying}
              breathInTime={selectedPattern.inTime}
              holdTime={selectedPattern.holdTime}
              breathOutTime={selectedPattern.outTime}
              onCycleComplete={handleComplete}
            />
          </div>
          
          <PixelButton 
            variant="secondary"
            onClick={stopExercise}
          >
            End Session
          </PixelButton>
        </div>
      )}
    </PixelContainer>
  );
};

export default BreathingExercise;
