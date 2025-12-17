import React from 'react';

// Primary CTA used on the countdown screen.
// Disabled until the countdown has fully completed.

export default function CelebrateButton({ disabled, onClick }) {
  const label = disabled ? 'Waiting for the magic…' : "Let’s Celebrate 🎉";

  return (
    <button
      className={`primary-button celebrate-button ${disabled ? 'is-disabled' : ''}`}
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      <span className="celebrate-button__glow" />
      <span className="celebrate-button__label">{label}</span>
    </button>
  );
}


