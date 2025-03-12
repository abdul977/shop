import React, { useState, useEffect, useCallback, FC } from 'react';
import { useVideo } from '../context/VideoContext';

interface ProductCardProps {
  product: {
    image: string;
    video: string;
    title: string;
  };
}

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const observerRef = React.useRef<IntersectionObserver | null>(null);
  const videoId = React.useRef(`video-${Math.random().toString(36).substr(2, 9)}`);
  const { currentlyPlayingId, setCurrentlyPlaying } = useVideo();

  // Handle video playback
  const handleVideoPlayback = useCallback((shouldPlay: boolean) => {
    if (videoRef.current) {
      if (!shouldPlay) {
        videoRef.current.pause();
        setIsPlaying(false);
        setCurrentlyPlaying(null);
      } else {
        // Pause any other playing video first
        if (currentlyPlayingId && currentlyPlayingId !== videoId.current) {
          const prevVideo = document.getElementById(currentlyPlayingId) as HTMLVideoElement;
          if (prevVideo) {
            prevVideo.pause();
          }
        }
        
        videoRef.current.play().catch(error => {
          console.error('Error playing video:', error);
        });
        setIsPlaying(true);
        setCurrentlyPlaying(videoId.current);
      }
    }
  }, [setCurrentlyPlaying, currentlyPlayingId]);

  // Set up intersection observer
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            handleVideoPlayback(true);
          } else if (isPlaying) {
            handleVideoPlayback(false);
          }
        });
      },
      {
        threshold: 0.5, // Video must be 50% visible
      }
    );

    if (videoRef.current) {
      observerRef.current.observe(videoRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleVideoPlayback, isPlaying]);

  const togglePlay = () => {
    handleVideoPlayback(!isPlaying);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      // If unmuting this video, mute any other playing video
      if (isMuted && currentlyPlayingId && currentlyPlayingId !== videoId.current) {
        const prevVideo = document.getElementById(currentlyPlayingId) as HTMLVideoElement;
        if (prevVideo) {
          prevVideo.muted = true;
        }
      }
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-[1.02] active:scale-[0.98] duration-300">
      <h3 className="text-xl sm:text-2xl font-bold p-4 sm:p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">{product.title}</h3>
      <div className="flex flex-col gap-4 sm:gap-6 p-4 sm:p-6">
        <div className="rounded-xl overflow-hidden h-[300px] sm:h-[400px] md:h-[500px] shadow-md">
          <img 
            src={product.image} 
            alt={product.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="relative rounded-xl overflow-hidden h-[300px] sm:h-[400px] md:h-[500px] shadow-md">
          <video 
            ref={videoRef}
            id={videoId.current}
            loop
            muted={isMuted}
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
            src={product.video}
          />
          <div className="absolute bottom-4 right-4 flex gap-2">
            <button
              onClick={togglePlay}
              className="bg-black/70 hover:bg-black active:bg-black text-white p-3 sm:p-2 rounded-full transition-colors"
            >
              {isPlaying ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                </svg>
              )}
            </button>
            <button
              onClick={toggleMute}
              className="bg-black/70 hover:bg-black active:bg-black text-white p-3 sm:p-2 rounded-full transition-colors"
            >
              {isMuted ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
