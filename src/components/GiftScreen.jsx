import React from 'react';

// Second screen: a gentle reveal that there is a gift prepared.

const GIFT_PULSE_DURATION_MS = 1400;

export default function GiftScreen({ onNext }) {
  return (
    <section className="screen screen--centered gift-screen">
      <div
        className="gift-screen__box"
        style={{
          '--gift-pulse-duration': `${GIFT_PULSE_DURATION_MS}ms`,
        }}
      >
        <div className="gift-screen__box-lid" />
        <div className="gift-screen__box-body" />
        <div className="gift-screen__box-ribbon-vertical" />
        <div className="gift-screen__box-ribbon-horizontal" />
      </div>

      <div className="screen-content gift-screen__content">
        <h1 className="title">A birthday surprise, wrapped just for you 🎁</h1>
        <p className="subtitle">
          It’s a small birthday surprise, made with all my love and every happy wish for you,
          Anushka.
        </p>

        <button
          type="button"
          className="primary-button"
          onClick={onNext}
        >
          Next →
        </button>
      </div>
    </section>
  );
}


