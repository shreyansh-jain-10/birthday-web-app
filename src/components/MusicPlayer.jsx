import React, { useEffect, useRef } from 'react';

export default function MusicPlayer({ play, loop = true, volume = 0.5, musicUrl }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (play && audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log('Audio play failed:', error);
          // Some browsers require user interaction before playing audio
          // This is normal and expected - the user clicking "Let's Celebrate" provides that interaction
        });
      }
    } else if (!play && audioRef.current) {
      audioRef.current.pause();
    }
  }, [play]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.loop = loop;
    }
  }, [volume, loop]);

  // Handle errors when the audio file fails to load
  const handleError = (e) => {
    console.warn('Music file could not be loaded. Make sure you have uploaded the music to Cloudinary and added the URL in App.jsx.');
  };

  // Don't render if no music URL is provided
  if (!musicUrl || musicUrl === 'YOUR_CLOUDINARY_MUSIC_URL_HERE') {
    return null;
  }

  return (
    <audio
      ref={audioRef}
      src={musicUrl}
      preload="auto"
      onError={handleError}
    />
  );
}

