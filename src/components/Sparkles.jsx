import React from 'react';

// Magical sparkles that appear and twinkle across the screen
const SPARKLE_COUNT = 30;
const SPARKLE_COLORS = ['#FF4444', '#FF6B6B', '#CC0000', '#FF8888', '#8B0000', '#FFFFFF'];

function Sparkle({ index, active }) {
  // Use index to create consistent but varied positions
  const top = (index * 23.7) % 100; // Pseudo-random but consistent
  const left = (index * 37.3) % 100;

  const color = SPARKLE_COLORS[index % SPARKLE_COLORS.length];
  const delay = (index * 0.3) % 2;
  const duration = 2 + ((index * 0.5) % 2);

  if (!active) return null;

  return (
    <div
      className="sparkle"
      style={{
        '--sparkle-color': color,
        '--sparkle-delay': `${delay}s`,
        '--sparkle-duration': `${duration}s`,
        top: `${top}%`,
        left: `${left}%`,
        '--sparkle-index': index,
      }}
    >
      <div className="sparkle__core" />
      <div className="sparkle__ray sparkle__ray--1" />
      <div className="sparkle__ray sparkle__ray--2" />
      <div className="sparkle__ray sparkle__ray--3" />
      <div className="sparkle__ray sparkle__ray--4" />
    </div>
  );
}

export default function Sparkles({ active = true, count = SPARKLE_COUNT }) {
  return (
    <div className={`sparkles ${active ? 'sparkles--active' : ''}`}>
      {Array.from({ length: count }).map((_, index) => (
        <Sparkle key={index} index={index} active={active} />
      ))}
    </div>
  );
}

