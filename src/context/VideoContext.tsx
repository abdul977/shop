import React, { createContext, useContext, useRef } from 'react';

interface VideoContextType {
  currentlyPlayingId: string | null;
  setCurrentlyPlaying: (id: string | null) => void;
}

const VideoContext = createContext<VideoContextType>({
  currentlyPlayingId: null,
  setCurrentlyPlaying: () => {},
});

export const VideoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const currentlyPlayingId = useRef<string | null>(null);

  const setCurrentlyPlaying = (id: string | null) => {
    currentlyPlayingId.current = id;
  };

  return (
    <VideoContext.Provider 
      value={{ 
        currentlyPlayingId: currentlyPlayingId.current, 
        setCurrentlyPlaying 
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = () => useContext(VideoContext);