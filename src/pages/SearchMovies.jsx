import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RowCarousel from '../components/RowCarousel';
import BootstrapSpinner from '../components/BootstrapSpinner';
import MovieGrid from '../components/MovieGrid';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function formatReleaseMonthYear(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleDateString(undefined, { month: 'short', year: 'numeric' }); 
}

export default function SearchMovies() {
  const navigate = useNavigate();


  const [query, setQuery] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [allResults, setAllResults] = useState([]);
  const [visibleResults, setVisibleResults] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const [newest, setNewest] = useState([]);
  const [blockbusters, setBlockbusters] = useState([]);
  const [loadingBase, setLoadingBase] = useState(true);


  useEffect(() => {
    let active = true;

    async function load() {
      setLoadingBase(true);
      try {

        const nowRes = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=US`
        );
        const nowData = await nowRes.json();
        const newestSorted = (nowData.results || [])
          .filter(Boolean)
          .sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
        if (active) setNewest(newestSorted);

        const topRes = await fetch(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1&region=US`
        );
        const topData = await topRes.json();
        if (active) setBlockbusters(topData.results || []);
      } catch {
        if (active) {
          setNewest([]);
          setBlockbusters([]);
        }
      } finally {
        if (active) setLoadingBase(false);
      }
    }
    load();

    return () => { active = false; };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setSearchLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
          query
        )}&page=1`
      );
      const data = await res.json();
      const results = Array.isArray(data.results) ? data.results : [];
      setAllResults(results);
      setVisibleResults(results.slice(0, 6)); // two rows of 3
      setShowAll(false);
    } catch {
      setAllResults([]);
      setVisibleResults([]);
      setShowAll(false);
      alert('Search failed. Please try again.');
    } finally {
      setSearchLoading(false);
    }
  };

  const goToMovie = (id) => navigate(`/movie/${id}`);

  const newestSorted = useMemo(
    () => [...newest].sort((a, b) => new Date(b.release_date) - new Date(a.release_date)),
    [newest]
  );

  const hasSearch = allResults.length > 0;
  const handleShowAll = () => {
    setVisibleResults(allResults);
    setShowAll(true);
  };

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

  return (
    <main className="container py-4">

      <div className="row justify-content-center">
        <div className="col-12 col-xl-10">
          <h1 className="fw-bold mb-1">Search Movies</h1>
          <p className="text-muted mb-4">
            Browse rows below or search by title. Click any card for more info.
          </p>

          <form
            onSubmit={handleSubmit}
            className="position-relative d-flex align-items-center gap-2 w-100 mb-3"
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
            <button type="submit" className="btn btn-gradient rounded-pill px-4" disabled={searchLoading}>
              {searchLoading ? <BootstrapSpinner size="1.25rem" /> : 'Search'}
            </button>
          </form>
        </div>
      </div>

  
      {hasSearch ? (
        <>
          <div className="d-flex justify-content-between align-items-end mb-3">
            <h2 className="mb-0">Search Results</h2>
            {allResults.length > 0 && (
              <small className="text-muted">
                {showAll ? `Showing all ${allResults.length}` : `Showing 6 of ${allResults.length}`}
              </small>
            )}
          </div>

          <MovieGrid
            movies={visibleResults}
            onMovieClick={goToMovie}
            renderMeta={renderMeta}
          />

          {!showAll && allResults.length > 6 && (
            <div className="d-flex justify-content-center mt-4">
              <button className="btn btn-outline-primary" onClick={handleShowAll}>
                Show all results
              </button>
            </div>
          )}
        </>
      ) : loadingBase ? (
        <div className="d-flex justify-content-center py-5">
          <BootstrapSpinner size="4rem" />
        </div>
      ) : (
        <>
          <RowCarousel
            title="Newest Movies"
            items={newestSorted}
            onClickItem={goToMovie}
            thumbWidth={360}
          />
          <RowCarousel
            title="Blockbuster Movies"
            items={blockbusters}
            onClickItem={goToMovie}
            thumbWidth={300}
          />
        </>
      )}

    
      <style>{`
        .search-shadow { box-shadow: 0 2px 10px rgba(0,0,0,.06); }
        .search-shadow:focus { box-shadow: 0 0 0 .2rem rgba(108,99,255,.15); }
        .btn-gradient {
          background-image: linear-gradient(135deg,#6c63ff,#4dd0e1);
          color:#fff; border:none; box-shadow: 0 2px 8px rgba(76,110,245,.25);
        }
        .btn-gradient:hover { filter: brightness(.95); color:#fff; }
      `}</style>
    </main>
  );
}
