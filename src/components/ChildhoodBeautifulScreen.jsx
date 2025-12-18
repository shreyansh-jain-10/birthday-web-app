import React from 'react';
import Sparkles from './Sparkles.jsx';

export default function ChildhoodBeautifulScreen({ onNext }) {
  return (
    <section className="screen screen--centered childhood-beautiful-screen">
      <Sparkles active={true} count={30} />
      <div className="screen-content">
        <div className="childhood-beautiful-screen__content">
          <h1 className="childhood-beautiful-screen__title">
            P.S. She has been beautiful since childhood
          </h1>
          
          <div className="childhood-beautiful-screen__photos">
            <div className="childhood-beautiful-screen__photo-container">
              <img
                src="/her_kid_photos/IMG_4802.jpg"
                alt="Beautiful girl as a child"
                className="childhood-beautiful-screen__photo"
                loading="eager"
                fetchPriority="high"
                onError={(e) => {
                  console.error('Failed to load image:', e.target.src);
                }}
              />
            </div>
            <div className="childhood-beautiful-screen__photo-container">
              <img
                src="/her_kid_photos/IMG_4804.PNG"
                alt="Beautiful girl as a child"
                className="childhood-beautiful-screen__photo"
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

