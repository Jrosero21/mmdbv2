import React, { useRef } from 'react';

export default function RowCarousel({
  title,
  items = [],
  onClickItem,
  thumbWidth = 320,
}) {
  const trackRef = useRef(null);
  const scrollBy = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const amount = Math.min(800, el.clientWidth * 0.9);
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  if (!items.length) return null;

  const tileW = Math.max(220, Math.min(thumbWidth, 360)); 
  const tileH = Math.round((tileW * 9) / 16);             

  return (
    <section className="mmdb-row my-4">
      {title && <h3 className="fw-bold mb-3">{title}</h3>}

      <div className="position-relative">
        <button
          className="btn btn-light border position-absolute top-50 start-0 translate-middle-y d-none d-md-inline-flex"
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
          {items.map((m) => (
            <div
              key={m.id}
              className="mmdb-tile position-relative"
              style={{
                minWidth: tileW,
                height: tileH,
                scrollSnapAlign: 'start',
                borderRadius: '12px',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
              onClick={() => onClickItem?.(m.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onClickItem?.(m.id)}
            >
              <img
                src={
                  m.backdrop_path
                    ? `https://image.tmdb.org/t/p/w780${m.backdrop_path}`
                    : (m.poster_path
                        ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
                        : 'https://dummyimage.com/640x360/cccccc/555555&text=No+Image')
                }
                alt={m.title}
                className="w-100 h-100"
                style={{ objectFit: 'cover', display: 'block', transition: 'transform .25s ease' }}
                loading="lazy"
              />

              <div className="mmdb-tile-overlay d-flex align-items-end p-3">
                <div className="text-white fw-semibold text-truncate">{m.title}</div>
              </div>
            </div>
          ))}
        </div>

        <button
          className="btn btn-light border position-absolute top-50 end-0 translate-middle-y d-none d-md-inline-flex"
          style={{ zIndex: 2 }}
          onClick={() => scrollBy(1)}
          aria-label="Scroll right"
        >
          ›
        </button>
      </div>


      <style>{`
        .mmdb-tile:hover img { transform: scale(1.03); }
        .mmdb-tile-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,.0) 40%, rgba(0,0,0,.65));
          opacity: .95;
          pointer-events: none;
        }
      `}</style>
    </section>
  );
}
