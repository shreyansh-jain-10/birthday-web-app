import React from 'react';

export default function MessageIntroScreen({ onNext }) {
  return (
    <section className="screen screen--centered message-intro-screen">
      <div className="screen-content">
        <h1 className="title">
          Last but not the least I have wrote a message for you love
        </h1>
        
        {onNext && (
          <button
            type="button"
            className="primary-button"
            onClick={onNext}
            style={{ marginTop: '2rem' }}
          >
            See the message →
          </button>
        )}
      </div>
    </section>
  );
}

