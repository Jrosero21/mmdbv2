import React from 'react';

export default function MovieCard({ movie, onClick, renderMeta }) {
  const { poster_path, title, overview } = movie;

  return (
    <div
      className="card h-100 shadow-sm clickable mmdb-card position-relative"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      {/* Poster */}
      <div
        className="w-100"
        style={{
          aspectRatio: '2 / 3',
          overflow: 'hidden',
          borderTopLeftRadius: '.375rem',
          borderTopRightRadius: '.375rem',
        }}
      >
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : 'https://dummyimage.com/300x450/cccccc/555555&text=No+Image'
          }
          alt={title}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transition: 'transform .25s ease',
          }}
        />
      </div>

      {/* Hover overlay */}
      <div
        className="mmdb-overlay d-flex align-items-center justify-content-center text-center px-3"
        onClick={onClick}
        role="button"
        aria-label={`More info about ${title}`}
      >
        <span className="fw-semibold" style={{ fontSize: '1.05rem' }}>
          More info <span aria-hidden="true">→</span>
        </span>
      </div>

      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-primary">{title}</h5>

        {typeof renderMeta === 'function' && (
          <div className="mb-2">{renderMeta(movie)}</div>
        )}

        <p className="card-text mt-auto">
          {overview ? `${overview.substring(0, 80)}…` : ''}
        </p>
      </div>

      {/* Scoped styles */}
      <style>{`
        .mmdb-card { transition: transform .2s ease, box-shadow .2s ease; }
        .mmdb-card:hover { transform: translateY(-4px); box-shadow: 0 10px 24px rgba(0,0,0,.12); }
        .mmdb-card:hover img { transform: scale(1.03); }
        .mmdb-card:focus-within { outline: 2px solid rgba(108,99,255,.35); outline-offset: 2px; }

        .mmdb-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,.0), rgba(0,0,0,.35) 35%, rgba(0,0,0,.55));
          color: #fff;
          opacity: 0; transition: opacity .2s ease;
          border-top-left-radius: .375rem; border-top-right-radius: .375rem;
        }
        .mmdb-card:hover .mmdb-overlay,
        .mmdb-card:focus-within .mmdb-overlay { opacity: 1; }
      `}</style>
    </div>
  );
}
