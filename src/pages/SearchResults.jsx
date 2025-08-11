import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MovieGrid from '../components/MovieGrid';
import BootstrapSpinner from '../components/BootstrapSpinner';
import { searchMoviesTMDB } from '../api/tmdb';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchResults() {
  const queryParams = useQuery();
  const query = queryParams.get('query') || '';
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    if (!query) return;

    setLoading(true);
    setError('');
    setMovies([]);

    searchMoviesTMDB(query)
      .then((data) => {
        if (!active) return;
        if (data.results && data.results.length > 0) {
          setMovies(data.results);
        } else {
          setError('No results found.');
        }
      })
      .catch(() => {
        if (active) setError('Failed to fetch search results.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => { active = false; };
  }, [query]);

  const handleMovieClick = (id) => navigate(`/movie/${id}`);

  return (
    <main className="container py-4">
      <h2 className="mb-4">Search Results for "{query}"</h2>
      {loading && (
        <div className="d-flex justify-content-center py-5">
          <BootstrapSpinner size="4rem" />
        </div>
      )}
      {error && <p className="text-danger text-center">{error}</p>}
      {!loading && !error && (
        <MovieGrid movies={movies} onMovieClick={handleMovieClick} />
      )}
    </main>
  );
}
