import React from 'react';

export default function FilterBar({
  sortValue = 'none',
  onSortChange = () => {},
  minRating = 0,
  onRatingChange = () => {},
  selectedGenres = [],
  onToggleGenre = () => {},
  availableGenres = [], // [{id, name}]
}) {
  const numericRating = Number.isFinite(minRating) ? Number(minRating) : 0;

  return (
    <div className="filterbar d-flex flex-wrap align-items-center gap-3 mb-3">
      {/* Sort (pill) */}
      <div className="d-flex align-items-center gap-2">
        <select
          className="form-select rounded-pill shadow-sm w-auto"
          value={sortValue}
          onChange={(e) => onSortChange(e.target.value)}
          aria-label="Sort movies"
        >
          <option value="none">Sort By</option>
          <option value="title-asc">Title A→Z</option>
          <option value="title-desc">Title Z→A</option>
          <option value="rating-desc">Rating High→Low</option>
          <option value="rating-asc">Rating Low→High</option>
          <option value="release-asc">Release Old→New</option>
          <option value="release-desc">Release New→Old</option>
        </select>
      </div>

      {/* Push slider to the right */}
      <div className="ms-auto d-flex align-items-center">
        <label htmlFor="min-rating" className="me-2 small text-muted">
          Min rating
        </label>
        <input
          id="min-rating"
          type="range"
          className="form-range"
          min="0"
          max="10"
          step="0.5"
          style={{ width: 180 }}
          value={numericRating}
          onChange={(e) => onRatingChange(parseFloat(e.target.value))}
          aria-label="Minimum rating"
        />
        <span className="badge bg-light text-dark border ms-2">{numericRating.toFixed(1)}+</span>
      </div>

      {/* Genres (optional) */}
      {Array.isArray(availableGenres) && availableGenres.length > 0 && (
        <div className="dropdown">
          <button className="btn btn-outline-secondary rounded-pill shadow-sm dropdown-toggle" data-bs-toggle="dropdown">
            Genres
          </button>
          <div className="dropdown-menu p-2" style={{ minWidth: 260 }}>
            <div className="d-flex flex-wrap gap-2">
              {availableGenres.map((g) => {
                const active = selectedGenres.includes(g.id);
                return (
                  <button
                    key={g.id}
                    type="button"
                    className={`btn btn-sm rounded-pill ${active ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => onToggleGenre(g.id)}
                  >
                    {g.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* scoped styles */}
      <style>{`
        .filterbar { padding-top: .25rem; }
        .form-select.rounded-pill { padding-left: .9rem; padding-right: 2rem; }
        .form-range { accent-color: #6c63ff; }
        .dropdown-menu { border-radius: 1rem; }
      `}</style>
    </div>
  );
}
