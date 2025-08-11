import React from 'react';

export default function MovieCard({ movie, onClick }) {
  const { poster_path, title, release_date, vote_average, overview } = movie;

  const renderStars = (rating) => {
    const val = Math.round(rating / 2 * 2) / 2;
    const full = Math.floor(val);
    const half = val - full >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;

    return (
      <>
        {[...Array(full)].map((_, i) => (
          <i key={`full-${i}`} className="bi bi-star-fill text-warning"></i>
        ))}
        {half === 1 && <i className="bi bi-star-half text-warning"></i>}
        {[...Array(empty)].map((_, i) => (
          <i key={`empty-${i}`} className="bi bi-star text-warning"></i>
        ))}
        <small className="text-muted ms-1">({val})</small>
      </>
    );
  };

  return (
    <div className="card h-100 shadow-sm clickable" onClick={onClick} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && onClick()}>
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500${poster_path}`
            : 'https://dummyimage.com/300x450/cccccc/555555&text=No+Image'
        }
        className="card-img-top"
        alt={title}
        style={{ height: '350px', objectFit: 'cover' }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-primary">{title} {(release_date || '').slice(0, 4)}</h5>
        <div className="mb-2">{renderStars(vote_average)}</div>
        <p className="card-text mt-auto">{overview ? `${overview.substring(0, 80)}…` : ''}</p>
      </div>
    </div>
  );
}
