import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BootstrapSpinner from '../components/BootstrapSpinner';
import RelatedCarousel from '../components/RelatedCarousel';
import { fetchMovie, fetchSimilar, img } from '../api/tmdb';

export default function MovieSummary() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [relatedLoading, setRelatedLoading] = useState(false);
  const [error, setError] = useState('');
  const [showManualPrompt, setShowManualPrompt] = useState(false);

  useEffect(() => {
    let active = true;
    async function run() {
      setLoading(true);
      setError('');
      try {
        const data = await fetchMovie(id);
        if (active) setMovie(data);
      } catch (e) {
        if (active) setError('Failed to load movie details.');
      } finally {
        if (active) setLoading(false);
      }
    }
    run();
    return () => { active = false; };
  }, [id]);

  useEffect(() => {
    let active = true;
    async function run() {
      if (!movie) return;
      setRelatedLoading(true);
      try {
        const data = await fetchSimilar(id);
        if (active) setRelatedMovies(data.results || []);
      } catch {
        if (active) setRelatedMovies([]);
      } finally {
        if (active) setRelatedLoading(false);
      }
    }
    run();
    return () => { active = false; };
  }, [id, movie]);

  const isReleased = movie && new Date(movie.release_date) <= new Date();


  const openShowtimesTab = (movieTitle, zipCode) => {
    const locationQuery = zipCode ? `near+${zipCode}` : 'near+me';
    const url = `https://www.google.com/search?q=Showtimes+for+${movieTitle}+${locationQuery}`;
    const newWindow = window.open(url, '_blank');
    if (!newWindow) {
      alert('Popup blocked! Please allow popups for this site.');
    }
  };

  
  const getZipFromCoords = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
      );
      if (!res.ok) return null;
      const data = await res.json();
      return data.address?.postcode || null;
    } catch {
      return null;
    }
  };

  const tryAutoDetectShowtimes = (movieTitle) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          const zip = await getZipFromCoords(latitude, longitude);
          openShowtimesTab(movieTitle, zip);
        },
        () => openShowtimesTab(movieTitle, null)
      );
    } else {
      openShowtimesTab(movieTitle, null);
    }
  };

  const handleShowtimesClick = () => {
    if (!movie) return;
    const movieTitle = encodeURIComponent(movie.title);

    if (!showManualPrompt) {
      tryAutoDetectShowtimes(movieTitle);
      setShowManualPrompt(true);
    } else {
      const zip = prompt(
        'Enter your ZIP code to find showtimes nearby (or leave blank to search near me):'
      );
      openShowtimesTab(movieTitle, zip && zip.trim() !== '' ? zip.trim() : null);
      setShowManualPrompt(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <BootstrapSpinner size="4rem" />
      </div>
    );
  }

  if (error || !movie) {
    return <p className="text-danger text-center py-5">{error || 'Movie not found.'}</p>;
  }

  return (
    <main className="container py-4">
      <div className="row g-4">
        <div className="col-md-4">
          <img
            src={img.poster(movie.poster_path, 500)}
            alt={movie.title}
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-8">
          <h1>
            {movie.title} ({(movie.release_date || '').slice(0, 4)})
          </h1>
          <p>
            <strong>Rating:</strong> {movie.vote_average} / 10
          </p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Genres:</strong>{' '}
            {Array.isArray(movie.genres) && movie.genres.length
              ? movie.genres.map((g) => g.name).join(', ')
              : '—'}
          </p>
          <p>{movie.overview}</p>
          <button
            className={`btn btn-primary${!isReleased ? ' disabled' : ''}`}
            onClick={handleShowtimesClick}
            aria-disabled={!isReleased}
          >
            Showtimes
          </button>
          {showManualPrompt && (
            <small className="text-muted d-block mt-2">
              Click again to enter ZIP code manually
            </small>
          )}
        </div>
      </div>

      <section className="mt-5">
        <h3 className="mb-3">Related Movies</h3>
        {relatedLoading ? (
          <div className="d-flex justify-content-center py-3">
            <BootstrapSpinner size="3rem" />
          </div>
        ) : (
          <RelatedCarousel
            items={relatedMovies}
            onClickItem={(movieId) => navigate(`/movie/${movieId}`)}
          />
        )}
      </section>
    </main>
  );
}
