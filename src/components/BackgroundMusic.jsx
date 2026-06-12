"use client";

import { useEffect, useRef, useState } from "react";

const BackgroundMusic = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.3;
      audio.muted = false;
      audio.loop = true; // Programmatic loop
      
      const handleEnded = () => {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      };
      
      audio.addEventListener("ended", handleEnded);
      
      audio.play().catch(() => {
        // Fallback if autoplay fails due to browser policies
      });
      setIsPlaying(true);
      
      return () => {
        audio.removeEventListener("ended", handleEnded);
      };
    }
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/ati242.mp3"
        loop
        autoPlay
        style={{ display: "none" }}
      />
      <button
        onClick={toggleMute}
        className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors shadow-lg"
        title={isMuted ? "Unmute music" : "Mute music"}
      >
        {isMuted ? "🔇" : "🔊"}
      </button>
    </>
  );
};

export default BackgroundMusic;
