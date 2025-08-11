import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import FilterBar from '../components/FilterBar'; 
import MovieGrid from '../components/MovieGrid';
import { fetchNowPlaying } from '../api/tmdb';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [sortOption, setSortOption] = useState('none');
  const [minRating, setMinRating] = useState(0);
  const [selectedGenres, setSelectedGenres] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    fetchNowPlaying()
      .then((d) => {
        if (active) setMovies(d.results || []);
      })
      .catch(() => {
        if (active) setMovies([]);
      });
    return () => { active = false; };
  }, []);

  const toggleGenre = (id) =>
    setSelectedGenres((prev) => (prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]));

  const filtered = useMemo(() => {
    let list = [...movies].filter((m) => (m.vote_average ?? 0) >= minRating);
    if (selectedGenres.length) {
      list = list.filter((m) => (m.genre_ids || []).some((g) => selectedGenres.includes(g)));
    }
    switch (sortOption) {
      case 'title-asc':
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title-desc':
        list.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'rating-asc':
        list.sort((a, b) => a.vote_average - b.vote_average);
        break;
      case 'rating-desc':
        list.sort((a, b) => b.vote_average - a.vote_average);
        break;
      case 'release-asc':
        list.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
        break;
      case 'release-desc':
        list.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
        break;
      default:
        break;
    }
    return list;
  }, [movies, sortOption, minRating, selectedGenres]);

  const handleMovieClick = (id) => navigate(`/movie/${id}`);

  return (
    <>
      <HeroSection />
      <main className="container py-4">
        <FilterBar
          sortValue={sortOption}
          onSortChange={setSortOption}
          minRating={minRating}
          onRatingChange={setMinRating}
          selectedGenres={selectedGenres}
          onToggleGenre={toggleGenre}
          availableGenres={[]} 
        />
        <MovieGrid movies={filtered} onMovieClick={handleMovieClick} />
      </main>
    </>
  );
}
