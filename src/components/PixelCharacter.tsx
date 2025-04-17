
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface PixelCharacterProps {
  type: "guide" | "player" | "meditation";
  className?: string;
  animationState?: "idle" | "talk" | "breathe";
}

const PixelCharacter = ({ 
  type, 
  className,
  animationState = "idle" 
}: PixelCharacterProps) => {
  // ASCII art for different character types
  const characters = {
    guide: [
      "  ⬜⬛⬛⬛⬛⬜  ",
      " ⬜⬛⬜⬜⬛⬛⬜ ",
      "⬜⬛⬜⬜⬜⬜⬛⬜",
      "⬜⬛⬜⬜⬜⬜⬛⬜",
      "⬜⬛⬜⬛⬜⬛⬛⬜",
      " ⬜⬛⬜⬜⬛⬛⬜ ",
      "  ⬜⬛⬛⬛⬛⬜  ",
      "   ⬜⬛⬛⬜    ",
      "  ⬛⬜⬜⬜⬛   ",
      " ⬛⬜⬜⬜⬜⬜⬛  ",
      " ⬛⬜⬛⬜⬛⬜⬛  ",
      " ⬛⬜⬜⬜⬜⬜⬛  ",
      "  ⬛⬛⬛⬛⬛⬛   "
    ],
    player: [
      "    ⬜⬜⬜⬜   ",
      "   ⬜⬛⬛⬛⬜  ",
      "  ⬜⬛⬜⬜⬛⬜  ",
      "  ⬜⬛⬜⬜⬛⬜  ",
      "  ⬜⬛⬛⬛⬜   ",
      "   ⬜⬛⬛⬜    ",
      "  ⬜⬜⬜⬜⬜   ",
      " ⬜⬛⬜⬜⬜⬛⬜  ",
      " ⬜⬛⬜⬜⬜⬛⬜  ",
      " ⬜⬛⬜⬜⬜⬛⬜  ",
      "  ⬜⬛⬛⬛⬜   ",
      "   ⬜⬜⬜⬜    "
    ],
    meditation: [
      "    ⬜⬜⬜⬜   ",
      "   ⬜⬛⬛⬛⬜  ",
      "  ⬜⬛⬜⬜⬛⬜  ",
      "  ⬜⬛⬜⬜⬛⬜  ",
      "  ⬜⬛⬛⬛⬜   ",
      "   ⬜⬛⬛⬜    ",
      "  ⬜⬜⬜⬜⬜   ",
      " ⬜⬛⬜⬜⬜⬛⬜  ",
      " ⬜⬜⬛⬛⬛⬜⬜  ",
      " ⬜⬜⬜⬜⬜⬜⬜  ",
      "  ⬜⬜⬜⬜⬜⬜   ",
      "   ⬜⬜⬜⬜⬜    "
    ]
  };
  
  const [frame, setFrame] = useState(0);
  
  useEffect(() => {
    if (animationState === "idle") {
      const interval = setInterval(() => {
        setFrame(prev => (prev === 0 ? 1 : 0));
      }, 1000);
      return () => clearInterval(interval);
    }
    
    if (animationState === "talk") {
      const interval = setInterval(() => {
        setFrame(prev => (prev === 0 ? 1 : 0));
      }, 200);
      return () => clearInterval(interval);
    }
    
    if (animationState === "breathe") {
      const interval = setInterval(() => {
        setFrame(prev => (prev + 1) % 4);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [animationState]);

  return (
    <div className={cn("font-mono text-2xl whitespace-pre animate-float", className)}>
      {characters[type].map((line, i) => (
        <div key={i} className={animationState === "breathe" ? (
          frame === 0 || frame === 3 ? "scale-100 transition-transform duration-1000" :
          frame === 1 ? "scale-110 transition-transform duration-1000" :
          "scale-105 transition-transform duration-1000"
        ) : ""}>
          {line}
        </div>
      ))}
    </div>
  );
};

export default PixelCharacter;
