import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import SortDropdown from '../components/SortDropdown';
import MovieGrid from '../components/MovieGrid';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [sortOption, setSortOption] = useState('none');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch now playing movies on mount
    const fetchNowPlaying = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=US`
        );
        const data = await res.json();
        setMovies(data.results || []);
      } catch {
        setMovies([]);
      }
    };
    fetchNowPlaying();
  }, []);

  // Sort movies based on selected option
  const sortMovies = (moviesList, option) => {
    switch (option) {
      case 'title-asc':
        return [...moviesList].sort((a, b) => a.title.localeCompare(b.title));
      case 'title-desc':
        return [...moviesList].sort((a, b) => b.title.localeCompare(a.title));
      case 'rating-asc':
        return [...moviesList].sort((a, b) => a.vote_average - b.vote_average);
      case 'rating-desc':
        return [...moviesList].sort((a, b) => b.vote_average - a.vote_average);
      case 'release-asc':
        return [...moviesList].sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
      case 'release-desc':
        return [...moviesList].sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
      default:
        return moviesList;
    }
  };

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);
  };

  return (
    <>
      <HeroSection />
      <main className="container py-4">
        <div className="d-flex justify-content-end mb-3">
          <SortDropdown value={sortOption} onChange={setSortOption} />
        </div>
        <MovieGrid movies={sortMovies(movies, sortOption)} onMovieClick={handleMovieClick} />
      </main>
    </>
  );
}
