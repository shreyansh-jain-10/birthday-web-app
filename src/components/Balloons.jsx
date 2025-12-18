import React from 'react';

// Simple floating balloons with configurable count and speed.
// `fast` makes them move quicker for party mode.

const BALLOON_COUNT = 18;
const BALLOON_COLORS = ['#FF4444', '#FF6B6B', '#CC0000', '#FF8888', '#8B0000'];

function Balloon({ index, fast }) {
  const color = BALLOON_COLORS[index % BALLOON_COLORS.length];

  return (
    <div
      className={`balloon ${fast ? 'balloon--fast' : ''}`}
      style={{
        '--i': index,
        '--balloon-color': color,
      }}
    />
  );
}

export default function Balloons({ count = BALLOON_COUNT, fast = false }) {
  return (
    <div className="balloons">
      {Array.from({ length: count }).map((_, index) => (
        <Balloon key={index} index={index} fast={fast} />
      ))}
    </div>
  );
}


