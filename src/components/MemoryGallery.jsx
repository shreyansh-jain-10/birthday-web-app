import React from 'react';

// Photo/Memory Gallery screen - users can add their own photos
const PHOTOS = [
  {
    id: 1,
    src: 'https://res.cloudinary.com/dd6gpvdcx/image/upload/v1766063064/IMG_6988_aqasoy.jpg',
  },
  {
    id: 2,
    src: 'https://res.cloudinary.com/dd6gpvdcx/image/upload/v1766063064/IMG_7297_gqsubh.jpg',
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
        <p className="eyebrow">A collection of our memories 💝</p>
        <h1 className="title">Presenting you my favourite photos together</h1>

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


