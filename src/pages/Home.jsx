import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import FilterBar from '../components/FilterBar';
import MovieGrid from '../components/MovieGrid';
import CategoryChips from '../components/CategoryChips';
import { fetchNowPlaying } from '../api/tmdb';

function formatReleaseMonthYear(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
}

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [sortOption, setSortOption] = useState('none');
  const [minRating, setMinRating] = useState(0);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    fetchNowPlaying()
      .then((d) => { if (active) setMovies(d.results || []); })
      .catch(() => { if (active) setMovies([]); });
    return () => { active = false; };
  }, []);

  const toggleGenre = (idOrClear) => {
    if (idOrClear === 'clear') {
      setSelectedGenres([]);
      return;
    }
    setSelectedGenres((prev) =>
      prev.includes(idOrClear) ? prev.filter((g) => g !== idOrClear) : [...prev, idOrClear]
    );
  };

  const filtered = useMemo(() => {
    const min = Number.isFinite(minRating) ? Number(minRating) : 0;
    let list = [...movies].filter((m) => (typeof m.vote_average === 'number' ? m.vote_average : 0) >= min);

    if (selectedGenres.length) {
      list = list.filter((m) => (m.genre_ids || []).some((g) => selectedGenres.includes(g)));
    }

    switch (sortOption) {
      case 'title-asc':   list.sort((a, b) => a.title.localeCompare(b.title)); break;
      case 'title-desc':  list.sort((a, b) => b.title.localeCompare(a.title)); break;
      case 'rating-asc':  list.sort((a, b) => (a.vote_average ?? 0) - (b.vote_average ?? 0)); break;
      case 'rating-desc': list.sort((a, b) => (b.vote_average ?? 0) - (a.vote_average ?? 0)); break;
      case 'release-asc': list.sort((a, b) => new Date(a.release_date) - new Date(b.release_date)); break;
      case 'release-desc':list.sort((a, b) => new Date(b.release_date) - new Date(a.release_date)); break;
      default: break;
    }
    return list;
  }, [movies, sortOption, minRating, selectedGenres]);

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

  return (
    <>
      <HeroSection />
      <main className="container py-4">
        <div
          className="position-sticky top-0 bg-white pt-2 pb-3 mb-2"
          style={{ zIndex: 1020, borderBottom: '1px solid rgba(0,0,0,.075)' }}
        >
          <h2 className="mb-2 fw-bold">Currently Playing</h2>
          {/* Category chips under the header */}
          <CategoryChips selected={selectedGenres} onToggle={toggleGenre} />
        </div>

        <FilterBar
          sortValue={sortOption}
          onSortChange={setSortOption}
          minRating={minRating}
          onRatingChange={setMinRating}
          selectedGenres={selectedGenres}
          onToggleGenre={toggleGenre}
          availableGenres={[]} // dropdown not needed when chips are visible
        />

        <MovieGrid
          movies={filtered}
          onMovieClick={handleMovieClick}
          renderMeta={renderMeta}
        />
      </main>
    </>
  );
}
