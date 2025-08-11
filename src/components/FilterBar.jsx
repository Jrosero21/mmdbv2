import React from 'react';

export default function FilterBar({
  sortValue, onSortChange,
  selectedGenres = [], onToggleGenre,
  minRating = 0, onRatingChange,
  availableGenres = [] // [{id, name}]
}) {
  return (
    <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
      {/* Sort */}
      <select
        className="form-select w-auto"
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

      {/* Rating */}
      <div className="d-flex align-items-center ms-auto">
        <label htmlFor="min-rating" className="me-2 small text-muted">Min rating</label>
        <input
          id="min-rating"
          type="range"
          className="form-range"
          min="0" max="10" step="0.5"
          style={{ width: 160 }}
          value={minRating}
          onChange={(e) => onRatingChange(parseFloat(e.target.value))}
          aria-label="Minimum rating"
        />
        <span className="badge text-bg-primary ms-2">{minRating.toFixed(1)}+</span>
      </div>

      {/* Genres (optional) */}
      {availableGenres.length > 0 && (
        <div className="dropdown">
          <button className="btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">
            Genres
          </button>
          <div className="dropdown-menu p-2" style={{ minWidth: 240 }}>
            <div className="d-flex flex-wrap gap-2">
              {availableGenres.map(g => {
                const active = selectedGenres.includes(g.id);
                return (
                  <button
                    key={g.id}
                    type="button"
                    className={`btn btn-sm ${active ? 'btn-primary' : 'btn-outline-primary'}`}
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
    </div>
  );
}
