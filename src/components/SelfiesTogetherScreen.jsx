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
                src="https://res.cloudinary.com/dd6gpvdcx/image/upload/v1766063198/IMG_0272_im7bal.jpg"
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
                  src="https://res.cloudinary.com/dd6gpvdcx/image/upload/v1766063184/IMG_5692_ex43oj.jpg"
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
                  src="https://res.cloudinary.com/dd6gpvdcx/image/upload/v1766063497/IMG_1540_ilfehu.jpg"
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

