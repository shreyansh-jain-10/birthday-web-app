import React from 'react';

// Photo/Memory Gallery screen - users can add their own photos
const PHOTOS = [
  {
    id: 1,
    src: '/photos/IMG_6988.JPG',
  },
  {
    id: 2,
    src: '/photos/IMG_7297.jpg',
  },
];

function PhotoGridItem({ photo, index }) {
  return (
    <div
      className="memory-photo-item"
      style={{
        '--photo-delay': `${index * 0.05}s`,
      }}
    >
      {photo?.src ? (
        <img
          src={photo.src}
          alt=""
          className="memory-photo-item__image"
          loading="eager"
          fetchPriority="high"
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
      ) : null}
      <div
        className="memory-photo-item__placeholder"
        style={{ display: !photo?.src ? 'flex' : 'none' }}
      >
        <span className="memory-photo-item__icon">📸</span>
      </div>
    </div>
  );
}

export default function MemoryGallery({ onNext }) {
  return (
    <section className="screen screen--centered memory-gallery">
      <div className="screen-content">
        <p className="eyebrow">A collection of memories 💝</p>
        <h1 className="title">My favourite photos together</h1>

        <div className="memory-gallery__grid memory-gallery__grid--2photos">
          {PHOTOS.map((photo, index) => (
            <PhotoGridItem key={photo.id} photo={photo} index={index} />
          ))}
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
    </section>
  );
}


