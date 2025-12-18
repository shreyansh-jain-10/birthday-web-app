import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

// Enhanced fireworks effect that creates multiple bursts
export default function Fireworks({ trigger, intensity = 'normal' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!trigger) return;

    const count = intensity === 'high' ? 200 : intensity === 'medium' ? 100 : 50;
    const burstCount = intensity === 'high' ? 5 : intensity === 'medium' ? 3 : 2;

    // Create multiple bursts from different positions
    const bursts = [];
    for (let i = 0; i < burstCount; i++) {
      const delay = i * 300;
      bursts.push(
        setTimeout(() => {
          // Burst from left
          confetti({
            particleCount: count,
            angle: 60 + Math.random() * 20,
            spread: 55,
            origin: { x: 0.2 + Math.random() * 0.1, y: 0.5 + Math.random() * 0.2 },
            colors: ['#FF4444', '#FF6B6B', '#CC0000', '#FF8888', '#8B0000'],
          });

          // Burst from right
          confetti({
            particleCount: count,
            angle: 120 - Math.random() * 20,
            spread: 55,
            origin: { x: 0.8 - Math.random() * 0.1, y: 0.5 + Math.random() * 0.2 },
            colors: ['#FF4444', '#FF6B6B', '#CC0000', '#FF8888', '#8B0000'],
          });

          // Center burst
          confetti({
            particleCount: count,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FF4444', '#FF6B6B', '#CC0000', '#FF8888', '#8B0000'],
          });
        }, delay)
      );
    }

    return () => {
      bursts.forEach(clearTimeout);
    };
  }, [trigger, intensity]);

  return null;
}

