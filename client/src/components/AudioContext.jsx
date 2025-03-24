import { createContext, useContext, useState, useEffect, useRef } from "react";

// Tạo Context
const AudioContext = createContext();

// Provider quản lý trạng thái phát nhạc
export function AudioProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState();
  const audioRef = useRef(null); // Dùng useRef để giữ instance audio

  // Khởi tạo audio khi component mount
  useEffect(() => {
    audioRef.current = new Audio("nhac_nen_1.mp3");
    audioRef.current.loop = true; // Lặp lại nhạc

    return () => {
      // Cleanup khi component bị unmount
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Bật/tắt nhạc dựa vào trạng thái `isPlaying`
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch((err) => console.log("Không thể phát nhạc:", err));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <AudioContext.Provider value={{ isPlaying, setIsPlaying }}>
      {children}
    </AudioContext.Provider>
  );
}

// Hook để sử dụng AudioContext
export function useAudio() {
  return useContext(AudioContext);
}
