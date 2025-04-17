
import { useState, useEffect } from "react";
import PixelContainer from "./PixelContainer";
import PixelButton from "./PixelButton";

interface JournalEntry {
  date: string;
  text: string;
}

const Journal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [newEntry, setNewEntry] = useState("");
  const [isWriting, setIsWriting] = useState(false);

  // Load journal entries from localStorage
  useEffect(() => {
    const savedEntries = localStorage.getItem("journal-entries");
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  // Save entries to localStorage when they change
  useEffect(() => {
    localStorage.setItem("journal-entries", JSON.stringify(entries));
  }, [entries]);

  const handleSaveEntry = () => {
    if (newEntry.trim() === "") return;
    
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    
    setEntries([
      {
        date: formattedDate,
        text: newEntry.trim()
      },
      ...entries
    ]);
    
    setNewEntry("");
    setIsWriting(false);
  };

  return (
    <PixelContainer className="w-full max-h-[400px] overflow-auto">
      <h2 className="pixel-text text-lg mb-4">Reflection Journal</h2>
      
      {isWriting ? (
        <div className="mb-4">
          <textarea
            className="w-full h-24 p-2 pixel-border bg-white font-pixel text-xs resize-none"
            placeholder="What are you grateful for today?"
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
          />
          <div className="flex gap-2 mt-2">
            <PixelButton onClick={handleSaveEntry}>Save</PixelButton>
            <PixelButton 
              variant="secondary"
              onClick={() => {
                setNewEntry("");
                setIsWriting(false);
              }}
            >
              Cancel
            </PixelButton>
          </div>
        </div>
      ) : (
        <PixelButton 
          className="mb-4"
          onClick={() => setIsWriting(true)}
        >
          New Entry
        </PixelButton>
      )}
      
      {entries.length === 0 ? (
        <p className="pixel-text text-xs text-center my-8">No journal entries yet. Start reflecting!</p>
      ) : (
        <div className="space-y-3">
          {entries.map((entry, index) => (
            <div key={index} className="p-2 bg-white pixel-border">
              <div className="text-xs font-pixel text-pixel-purple mb-1">{entry.date}</div>
              <div className="text-xs font-pixel">{entry.text}</div>
            </div>
          ))}
        </div>
      )}
    </PixelContainer>
  );
};

export default Journal;
