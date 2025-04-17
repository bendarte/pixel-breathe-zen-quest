
import { useState, useEffect } from "react";
import PixelContainer from "@/components/PixelContainer";
import PixelButton from "@/components/PixelButton";
import DialogBox from "@/components/DialogBox";
import PixelCharacter from "@/components/PixelCharacter";
import BreathingExercise from "@/components/BreathingExercise";
import Journal from "@/components/Journal";
import ProgressTracker from "@/components/ProgressTracker";

const Index = () => {
  const [activeTab, setActiveTab] = useState<"breathe" | "journal" | "progress">("breathe");
  const [showIntro, setShowIntro] = useState(true);
  const [introStep, setIntroStep] = useState(0);
  
  // Check if it's the first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem("has-visited-mindfulness");
    if (hasVisited) {
      setShowIntro(false);
    } else {
      localStorage.setItem("has-visited-mindfulness", "true");
    }
  }, []);
  
  const introMessages = [
    "Welcome to Pixel Breathe! I'm Zen, your 8-bit mindfulness guide.",
    "This pixel world is designed to help you practice mindfulness and breathing exercises.",
    "Take a moment to breathe, reflect in your journal, and track your progress.",
    "Ready to begin your pixel mindfulness journey?",
  ];
  
  const handleIntroComplete = () => {
    if (introStep < introMessages.length - 1) {
      setIntroStep(prev => prev + 1);
    } else {
      setShowIntro(false);
    }
  };
  
  // Sound effect for tab switching
  const playMenuSound = () => {
    // This would normally play a sound, but we'll implement this in a future version
    console.log("Menu sound played");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#ace4aa] p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="game-screen pixel-border bg-[#5b6ee1] mb-4">
          <h1 className="text-2xl text-white font-pixel mb-0 text-center py-2">
            PIXEL BREATHE
          </h1>
        </div>
        
        {/* Intro Dialog */}
        {showIntro && (
          <PixelContainer className="mb-6 animate-pixel-fade-in">
            <div className="flex flex-col md:flex-row items-center">
              <PixelCharacter 
                type="guide" 
                animationState="talk"
                className="mb-4 md:mb-0 md:mr-4"
              />
              <DialogBox 
                text={introMessages[introStep]}
                onComplete={handleIntroComplete}
              />
            </div>
            {introStep === introMessages.length - 1 && (
              <div className="mt-4 text-right">
                <PixelButton onClick={() => setShowIntro(false)}>
                  Start
                </PixelButton>
              </div>
            )}
          </PixelContainer>
        )}
        
        {/* Main Content */}
        <div className="mb-4">
          <div className="flex justify-between mb-4">
            <PixelButton 
              className={activeTab === "breathe" ? "opacity-100" : "opacity-70"}
              onClick={() => {
                setActiveTab("breathe");
                playMenuSound();
              }}
            >
              Breathe
            </PixelButton>
            <PixelButton 
              className={activeTab === "journal" ? "opacity-100" : "opacity-70"}
              onClick={() => {
                setActiveTab("journal");
                playMenuSound();
              }}
            >
              Journal
            </PixelButton>
            <PixelButton 
              className={activeTab === "progress" ? "opacity-100" : "opacity-70"}
              onClick={() => {
                setActiveTab("progress");
                playMenuSound();
              }}
            >
              Progress
            </PixelButton>
          </div>
          
          <div className="animate-pixel-fade-in">
            {activeTab === "breathe" && <BreathingExercise />}
            {activeTab === "journal" && <Journal />}
            {activeTab === "progress" && <ProgressTracker />}
          </div>
        </div>
        
        {/* Footer */}
        <div className="text-center">
          <p className="text-xs font-pixel text-pixel-dark">
            PIXEL BREATHE v1.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
