import React from 'react';
import Sparkles from './Sparkles.jsx';

export default function SelfiesTogetherScreen({ onNext }) {
  return (
    <section className="screen screen--centered selfies-together-screen">
      <Sparkles active={true} count={30} />
      <div className="screen-content">
        <div className="selfies-together-screen__content">
          <p className="eyebrow">Memories together 💕</p>
          <h1 className="title">Selfies together</h1>
          
          <div className="selfies-together-screen__photos">
            <div className="selfies-together-screen__photo-container selfies-together-screen__photo-container--large">
              <img
                src="/selfies_together/IMG_0272.jpg"
                alt="Selfie together"
                className="selfies-together-screen__photo"
                loading="eager"
                fetchPriority="high"
                onError={(e) => {
                  console.error('Failed to load image:', e.target.src);
                }}
              />
            </div>
            <div className="selfies-together-screen__photos-row">
              <div className="selfies-together-screen__photo-container">
                <img
                  src="/selfies_together/IMG_5692.jpg"
                  alt="Selfie together"
                  className="selfies-together-screen__photo"
                  loading="eager"
                  fetchPriority="high"
                  onError={(e) => {
                    console.error('Failed to load image:', e.target.src);
                  }}
                />
              </div>
              <div className="selfies-together-screen__photo-container">
                <img
                  src="/selfies_together/IMG_1540.jpg"
                  alt="Selfie together"
                  className="selfies-together-screen__photo"
                  loading="eager"
                  fetchPriority="high"
                  onError={(e) => {
                    console.error('Failed to load image:', e.target.src);
                  }}
                />
              </div>
            </div>
          </div>
          
          {onNext && (
            <button
              type="button"
              className="primary-button"
              onClick={onNext}
              style={{ marginTop: '1.5rem' }}
            >
              Continue →
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

