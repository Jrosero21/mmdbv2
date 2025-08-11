import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieReelSpinner from './BootstrapSpinner';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function Search() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
          query
        )}&page=1`
      );
      const data = await res.json();

      navigate(`/search-results?query=${encodeURIComponent(query)}`, {
        state: { results: data.results || [] },
      });
    } catch {
      alert('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const clear = () => setQuery('');

  return (
    <form
      onSubmit={handleSubmit}
      className="position-relative d-flex align-items-center gap-2 w-100"
      role="search"
      aria-label="Movie search form"
    >
    
      <span
        aria-hidden="true"
        className="position-absolute top-50 translate-middle-y ms-3 text-muted"
        style={{ pointerEvents: 'none' }}
      >
        <i className="bi bi-search" />
      </span>

      <input
        type="search"
        className="form-control rounded-pill ps-5 search-shadow"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search movies"
        required
      />

    
      {query && !loading && (
        <button
          type="button"
          className="btn btn-sm position-absolute top-50 translate-middle-y end-0 me-5 text-secondary"
          aria-label="Clear search"
          onClick={clear}
          style={{ background: 'transparent' }}
        >
          <i className="bi bi-x-lg" />
        </button>
      )}

      <button type="submit" className="btn btn-gradient rounded-pill px-4" disabled={loading}>
        {loading ? <MovieReelSpinner size={20} /> : 'Search'}
      </button>

    
      <style>{`
        .search-shadow { box-shadow: 0 2px 10px rgba(0,0,0,.06); }
        .search-shadow:focus { box-shadow: 0 0 0 .2rem rgba(108,99,255,.15); }
        .btn-gradient {
          background-image: linear-gradient(135deg,#6c63ff,#4dd0e1);
          color:#fff; border:none; box-shadow: 0 2px 8px rgba(76,110,245,.25);
        }
        .btn-gradient:hover { filter: brightness(.95); color:#fff; }
      `}</style>
    </form>
  );
}
