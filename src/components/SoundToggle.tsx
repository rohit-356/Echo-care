import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export const SoundToggle = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  // This refers to the file in your 'public' folder
  const audioRef = useRef(new Audio("/background.mp3"));

  useEffect(() => {
    // Configure audio settings
    audioRef.current.loop = true; // Loop the music
    audioRef.current.volume = 0.5; // Set volume to 50%

    // Cleanup when leaving the site
    return () => {
      audioRef.current.pause();
    };
  }, []);

  const toggleSound = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // Browsers require a user interaction to play audio
      audioRef.current.play().catch((error) => {
        console.error("Audio playback failed:", error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button
      onClick={toggleSound}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full glass-button shadow-lg transition-transform hover:scale-110 active:scale-95 group"
      aria-label="Toggle background sound"
    >
      {isPlaying ? (
        <Volume2 className="w-6 h-6 text-white animate-pulse" />
      ) : (
        <VolumeX className="w-6 h-6 text-white/80" />
      )}
      
      {/* Tooltip hint */}
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {isPlaying ? "Pause Ambient Sound" : "Play Ambient Sound"}
      </span>
    </button>
  );
};