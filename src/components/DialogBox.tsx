
import { ReactNode, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface DialogBoxProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
  autoPlay?: boolean;
}

const DialogBox = ({ 
  text, 
  speed = 50, 
  className,
  onComplete,
  autoPlay = true
}: DialogBoxProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(autoPlay);

  useEffect(() => {
    if (isTyping && currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      
      return () => clearTimeout(timer);
    } else if (currentIndex >= text.length && isTyping) {
      setIsTyping(false);
      onComplete?.();
    }
  }, [currentIndex, isTyping, onComplete, speed, text]);

  const handleClick = () => {
    if (isTyping) {
      // Fast forward to complete text
      setDisplayedText(text);
      setCurrentIndex(text.length);
      setIsTyping(false);
      onComplete?.();
    } else if (currentIndex < text.length) {
      // Start typing if not started
      setIsTyping(true);
    }
  };

  return (
    <div 
      className={cn("dialog-box", className)}
      onClick={handleClick}
    >
      {displayedText}
      {isTyping && <span className="inline-block animate-pulse">▶</span>}
    </div>
  );
};

export default DialogBox;
