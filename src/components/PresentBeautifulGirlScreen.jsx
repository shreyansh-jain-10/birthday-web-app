import React from 'react';
import Sparkles from './Sparkles.jsx';

export default function PresentBeautifulGirlScreen({ onNext }) {
  return (
    <section className="screen screen--centered present-beautiful-girl-screen">
      <Sparkles active={true} count={30} />
      <div className="screen-content">
        <div className="present-beautiful-girl-screen__content">
          <h1 className="present-beautiful-girl-screen__title">
            I repeat she is the most beautiful girl
          </h1>
          
          <div className="present-beautiful-girl-screen__photos">
            <div className="present-beautiful-girl-screen__photo-container">
              <img
                src="/her_photo_two/IMG_1538.jpg"
                alt="Beautiful girl"
                className="present-beautiful-girl-screen__photo"
                loading="eager"
                fetchPriority="high"
                onError={(e) => {
                  console.error('Failed to load image:', e.target.src);
                }}
              />
            </div>
            <div className="present-beautiful-girl-screen__photo-container">
              <img
                src="/her_photo_two/IMG_1527.jpg"
                alt="Beautiful girl"
                className="present-beautiful-girl-screen__photo"
                loading="eager"
                fetchPriority="high"
                onError={(e) => {
                  console.error('Failed to load image:', e.target.src);
                }}
              />
            </div>
          </div>
          
          {onNext && (
            <button
              type="button"
              className="primary-button"
              onClick={onNext}
              style={{ marginTop: '2rem' }}
            >
              Continue →
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

