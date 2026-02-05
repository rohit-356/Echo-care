import React, { useState } from 'react';

const CarePage = () => {
  const [journalText, setJournalText] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved" | "error">("idle");

  const prompts = [
    "What emotion have I been carrying today?",
    "What is one thing I can forgive myself for?",
    "Who is someone I am grateful for and why?",
    "What would I tell a friend who felt this way?",
    "What is a small win I had this week?"
  ];

  const [currentPrompt, setCurrentPrompt] = useState(0);

  const handleNextPrompt = () => {
    setCurrentPrompt((prev) => (prev + 1) % prompts.length);
    setSaveStatus("idle");
  };

  const handleSaveEntry = async () => {
    if (!journalText.trim()) return;

    setIsSaving(true);
    setSaveStatus("idle");

    try {
      // Send to backend to analyze (get mood/risk) and save to DB
      const response = await fetch('http://127.0.0.1:8001/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: journalText }),
      });

      if (response.ok) {
        setSaveStatus("saved");
        setJournalText(""); // Clear box after saving
        setTimeout(() => handleNextPrompt(), 1500);
      } else {
        setSaveStatus("error");
      }
    } catch (error) {
      console.error("Failed to save:", error);
      setSaveStatus("error");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex flex-col items-center">
      
      <div className="max-w-2xl w-full text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Care & Support Tools</h1>
        <p className="text-slate-500">Gentle exercises to help you feel grounded and at peace.</p>
      </div>

      {/* --- GUIDED JOURNALING CARD --- */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 w-full max-w-2xl mb-8">
        <h2 className="text-2xl font-serif text-slate-800 mb-6 text-center">Guided Journaling</h2>
        
        <div className="mb-6">
          <p className="text-slate-500 text-sm uppercase tracking-wide font-bold mb-2 text-center">
            Reflect on this prompt: There's no right answer — just your truth.
          </p>
          <p className="text-xl font-medium text-slate-700 italic text-center">
            "{prompts[currentPrompt]}"
          </p>
        </div>

        <textarea
          className="w-full h-40 p-4 rounded-xl border border-slate-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none resize-none text-slate-700 text-lg mb-4"
          placeholder="I am feeling..."
          value={journalText}
          onChange={(e) => setJournalText(e.target.value)}
        />

        {/* --- BUTTONS SECTION --- */}
        <div className="flex items-center justify-between gap-4">
          <button 
            onClick={handleNextPrompt}
            className="text-slate-500 hover:text-slate-700 font-medium px-4 py-2"
          >
            Skip / Next Prompt
          </button>

          <button
            onClick={handleSaveEntry}
            disabled={isSaving || !journalText.trim()}
            className={`px-6 py-2 rounded-full font-bold text-white transition-all
              ${saveStatus === 'saved' ? 'bg-green-500' : 
                saveStatus === 'error' ? 'bg-red-500' : 
                'bg-purple-600 hover:bg-purple-700 disabled:opacity-50'}`}
          >
            {isSaving ? "Saving..." : 
             saveStatus === 'saved' ? "Saved ✓" : 
             saveStatus === 'error' ? "Error ✕" : "Save to Journal"}
          </button>
        </div>
      </div>

    </div>
  );
};

export default CarePage;