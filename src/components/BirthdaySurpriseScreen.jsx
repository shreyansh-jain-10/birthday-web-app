import React from 'react';
import Sparkles from './Sparkles.jsx';

const GIFT_PULSE_DURATION_MS = 1400;

export default function BirthdaySurpriseScreen({ onNext }) {
  return (
    <section className="screen screen--centered birthday-surprise-screen">
      <Sparkles active={true} count={30} />
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
      <div className="screen-content">
        <div className="birthday-surprise-screen__content">
          <h1 className="birthday-surprise-screen__title">
            A birthday surprise, wrapped just for you 🎁
          </h1>
          <p className="birthday-surprise-screen__subtitle">
            It's a small birthday surprise, made with all my love for you, Anushka.
          </p>
          
          {onNext && (
            <button
              type="button"
              className="primary-button"
              onClick={onNext}
              style={{ marginTop: '2rem' }}
            >
              Open your surprise →
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

