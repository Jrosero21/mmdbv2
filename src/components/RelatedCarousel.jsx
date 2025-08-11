import React, { useRef } from 'react';
import { img } from '../api/tmdb';

export default function RelatedCarousel({ items = [], onClickItem }) {
  const trackRef = useRef(null);

  const scrollBy = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const amount = Math.min(600, el.clientWidth * 0.9);
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  if (!items.length) return <p className="text-muted">No related movies found.</p>;

  return (
    <div className="position-relative">
      <button
        className="btn btn-light border position-absolute top-50 start-0 translate-middle-y"
        style={{ zIndex: 2 }}
        onClick={() => scrollBy(-1)}
        aria-label="Scroll left"
      >
        ‹
      </button>

      <div
        ref={trackRef}
        className="d-flex gap-3 overflow-auto px-4"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {items.map(m => (
          <div
            key={m.id}
            className="text-center"
            style={{ minWidth: 150, scrollSnapAlign: 'start', cursor: 'pointer' }}
            onClick={() => onClickItem?.(m.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onClickItem?.(m.id)}
          >
            <img
              src={img.thumb(m.poster_path, 200)}
              alt={m.title}
              className="img-fluid rounded shadow-sm"
              style={{ height: 225, objectFit: 'cover', width: 150 }}
            />
            <p className="mt-2 text-truncate" title={m.title}>{m.title}</p>
          </div>
        ))}
      </div>

      <button
        className="btn btn-light border position-absolute top-50 end-0 translate-middle-y"
        style={{ zIndex: 2 }}
        onClick={() => scrollBy(1)}
        aria-label="Scroll right"
      >
        ›
      </button>
    </div>
  );
}
