
import { useState, useEffect } from "react";
import PixelContainer from "./PixelContainer";

interface ProgressData {
  consecutiveDays: number;
  lastCompleted: string | null;
  totalSessions: number;
  totalMinutes: number;
}

const ProgressTracker = () => {
  const [progress, setProgress] = useState<ProgressData>({
    consecutiveDays: 0,
    lastCompleted: null,
    totalSessions: 0,
    totalMinutes: 0
  });

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem("mindfulness-progress");
    if (savedProgress) {
      const parsed = JSON.parse(savedProgress);
      
      // Check if we need to reset the streak
      if (parsed.lastCompleted) {
        const lastDate = new Date(parsed.lastCompleted);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        
        // If last completion was before yesterday, reset streak
        if (lastDate < yesterday && lastDate.toDateString() !== yesterday.toDateString()) {
          parsed.consecutiveDays = 0;
        }
      }
      
      setProgress(parsed);
    }
  }, []);

  // Update progress with session completion
  useEffect(() => {
    const trackProgress = (minutes: number) => {
      const today = new Date().toISOString().split('T')[0];
      
      setProgress(prev => {
        // Only increment consecutive days if it's a new day
        let newConsecutiveDays = prev.consecutiveDays;
        if (prev.lastCompleted !== today) {
          newConsecutiveDays += 1;
        }
        
        const updated = {
          consecutiveDays: newConsecutiveDays,
          lastCompleted: today,
          totalSessions: prev.totalSessions + 1,
          totalMinutes: prev.totalMinutes + minutes
        };
        
        // Save to localStorage
        localStorage.setItem("mindfulness-progress", JSON.stringify(updated));
        
        return updated;
      });
    };
    
    // Listen for session completion event
    const handleSessionComplete = (e: CustomEvent) => {
      trackProgress(e.detail.minutes || 1);
    };
    
    window.addEventListener('mindfulness-session-complete' as any, handleSessionComplete as any);
    
    return () => {
      window.removeEventListener('mindfulness-session-complete' as any, handleSessionComplete as any);
    };
  }, []);

  return (
    <PixelContainer className="w-full">
      <h2 className="pixel-text text-lg mb-4">Your Progress</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-2 bg-white pixel-border text-center">
          <div className="text-2xl font-pixel text-pixel-blue">
            {progress.consecutiveDays}
          </div>
          <div className="text-xs font-pixel">Day Streak</div>
        </div>
        <div className="p-2 bg-white pixel-border text-center">
          <div className="text-2xl font-pixel text-pixel-green">
            {progress.totalSessions}
          </div>
          <div className="text-xs font-pixel">Sessions</div>
        </div>
        <div className="p-2 bg-white pixel-border text-center col-span-2">
          <div className="text-2xl font-pixel text-pixel-purple">
            {progress.totalMinutes}
          </div>
          <div className="text-xs font-pixel">Total Minutes</div>
        </div>
      </div>
    </PixelContainer>
  );
};

export default ProgressTracker;
