import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MovieGrid from '../components/MovieGrid';
import BootstrapSpinner from '../components/BootstrapSpinner';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

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
    if (!query) return;

    setLoading(true);
    setError('');
    setMovies([]);

    const fetchSearchResults = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=1`
        );
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          setMovies(data.results);
        } else {
          setError('No results found.');
        }
      } catch (err) {
        setError('Failed to fetch search results.');
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);
  };

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
