import React from 'react';

// Final screen: curtains reveal a handwritten-style letter message.

const CURTAIN_ANIMATION_DURATION_MS = 900;

export default function CurtainMessage({ curtainsOpen, message, onToggleCurtains }) {
  const stageClassName = `message-stage ${curtainsOpen ? 'message-stage--open' : ''}`;
  const curtainClassName = curtainsOpen ? 'curtain curtain--open' : 'curtain';

  return (
    <section className="screen screen--centered message-screen">
      <div
        className={stageClassName}
        style={{
          '--curtain-duration': `${CURTAIN_ANIMATION_DURATION_MS}ms`,
        }}
      >
        <div
          className={`${curtainClassName} curtain--left`}
          onClick={onToggleCurtains}
        />
        <div
          className={`${curtainClassName} curtain--right`}
          onClick={onToggleCurtains}
        />

        <div
          className="message-stage__inner"
          onClick={onToggleCurtains}
        >
          <p className="tap-hint">
            {curtainsOpen ? 'Tap to feel it again ✨' : 'Tap to open the curtains'}
          </p>

          {curtainsOpen && (
            <article className="letter">
              <div className="letter__paper">
                <p className="letter__greeting">To my birthday star, Anushka 🎂</p>
                <p className="letter__body">
                  {message}
                </p>
                <p className="letter__signoff">Happy birthday, with all my love,</p>
                <p className="letter__signature">Your Shreyansh 💌</p>
              </div>
            </article>
          )}
        </div>
      </div>
    </section>
  );
}


