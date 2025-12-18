import React from 'react';
import Sparkles from './Sparkles.jsx';

export default function BeautifulGirlScreen({ onNext }) {
  return (
    <section className="screen screen--centered beautiful-girl-screen">
      <Sparkles active={true} count={30} />
      <div className="screen-content">
        <div className="beautiful-girl-screen__content">
          <div className="beautiful-girl-screen__photo-container">
            <img
              src="/her_photo_one/IMG_1353.jpg"
              alt="Beautiful girl"
              className="beautiful-girl-screen__photo"
              loading="eager"
              fetchPriority="high"
              onError={(e) => {
                console.error('Failed to load image:', e.target.src);
              }}
            />
          </div>
          <h1 className="beautiful-girl-screen__title">
            To the most beautiful girl I have ever seen
          </h1>
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

