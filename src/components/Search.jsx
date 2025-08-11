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
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=1`
      );
      const data = await res.json();

  
      navigate(`/search-results?query=${encodeURIComponent(query)}`, { state: { results: data.results || [] } });
    } catch (err) {
      alert('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex align-items-center gap-2 w-100" role="search" aria-label="Movie search form">
      <input
        type="search"
        className="form-control rounded-pill"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search movies"
        required
      />
      <button type="submit" className="btn btn-primary rounded-pill" disabled={loading}>
        {loading ? <MovieReelSpinner size={20} /> : 'Search'}
      </button>
    </form>
  );
}

