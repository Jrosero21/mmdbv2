import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MovieGrid from '../components/MovieGrid';
import BootstrapSpinner from '../components/BootstrapSpinner';
import { searchMoviesTMDB } from '../api/tmdb';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function formatReleaseMonthYear(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleDateString(undefined, { month: 'short', year: 'numeric' }); 
}

export default function SearchResults() {
  const queryParams = useQuery();
  const query = queryParams.get('query') || '';
  const [allResults, setAllResults] = useState([]);
  const [visibleResults, setVisibleResults] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    if (!query) return;

    setLoading(true);
    setError('');
    setAllResults([]);
    setVisibleResults([]);
    setShowAll(false);

    searchMoviesTMDB(query)
      .then((data) => {
        if (!active) return;
        const results = Array.isArray(data.results) ? data.results : [];
        setAllResults(results);
        setVisibleResults(results.slice(0, 6)); 
        if (results.length === 0) setError('No results found.');
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


  const renderMeta = (m) => {
    const monthYear = formatReleaseMonthYear(m.release_date);
    const rating = Number.isFinite(m.vote_average) ? `${m.vote_average.toFixed(1)} / 10` : '—';
    return (
      <div className="d-flex align-items-center text-muted small">
        <span className="me-2">{monthYear}</span>
        <span className="vr me-2" />
        <span>{rating}</span>
      </div>
    );
  };

  const hasMore = allResults.length > 6;

  const handleShowAll = () => {
    setVisibleResults(allResults);
    setShowAll(true);
  };

  return (
    <main className="container py-4">
      <div className="d-flex justify-content-between align-items-end mb-3">
        <h2 className="mb-0">Search Results for "{query}"</h2>
        {allResults.length > 0 && (
          <small className="text-muted">
            {showAll ? `Showing all ${allResults.length}` : `Showing 6 of ${allResults.length}`}
          </small>
        )}
      </div>

      {loading && (
        <div className="d-flex justify-content-center py-5">
          <BootstrapSpinner size="4rem" />
        </div>
      )}

      {error && <p className="text-danger text-center">{error}</p>}

      {!loading && !error && (
        <>
          <MovieGrid
            movies={visibleResults}
            onMovieClick={handleMovieClick}
            renderMeta={renderMeta}
          />

          {!showAll && hasMore && (
            <div className="d-flex justify-content-center mt-4">
              <button className="btn btn-outline-primary" onClick={handleShowAll}>
                Show all results
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
}
