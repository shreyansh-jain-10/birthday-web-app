import React from 'react';

// Third screen: party mode with lights and faster balloons.

const LIGHT_COUNT = 14;

export default function PartyScreen({ partyOn, onTurnLightsOn, onShowMessage }) {
  return (
    <section className="screen screen--centered party-screen">
      <div className="party-screen__lights">
        {Array.from({ length: LIGHT_COUNT }).map((_, index) => (
          <span
            key={index}
            className="party-light"
            style={{
              '--light-index': index,
            }}
          />
        ))}
      </div>

      <div className="screen-content">
        <h1 className="title">
          Happy Birthday, Anushka! 🎉 Let&rsquo;s start your party!
        </h1>

        <p className="subtitle">
          The candles are ready, the music is waiting, and the whole room is here just to celebrate
          you. Let&rsquo;s light it all up and make a wish.
        </p>

        <div className="party-screen__buttons">
          {!partyOn && (
            <button
              type="button"
              className="primary-button"
              onClick={onTurnLightsOn}
            >
              Turn the lights on
            </button>
          )}

          {partyOn && (
            <button
              type="button"
              className="secondary-button"
              onClick={onShowMessage}
            >
              I have a message for you
            </button>
          )}
        </div>

        {/* Optional music hook (not autoplay by default). Uncomment and add your audio file if desired. */}
        {/*
        <audio src="/party-song.mp3" controls />
        */}
      </div>
    </section>
  );
}


