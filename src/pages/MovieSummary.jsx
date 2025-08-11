import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BootstrapSpinner from '../components/BootstrapSpinner';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

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
    async function fetchMovie() {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
        );
        if (!res.ok) throw new Error('Movie not found');
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        setError('Failed to load movie details.');
      } finally {
        setLoading(false);
      }
    }
    fetchMovie();
  }, [id]);

  useEffect(() => {
    async function fetchRelated() {
      if (!movie) return;
      setRelatedLoading(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`
        );
        const data = await res.json();
        setRelatedMovies(data.results || []);
      } catch {
        setRelatedMovies([]);
      } finally {
        setRelatedLoading(false);
      }
    }
    fetchRelated();
  }, [id, movie]);

  const isReleased = movie && new Date(movie.release_date) <= new Date();

  // Opens Google search in new tab and alerts if blocked
  const openShowtimesTab = (movieTitle, zipCode) => {
    const locationQuery = zipCode ? `near+${zipCode}` : 'near+me';
    const url = `https://www.google.com/search?q=Showtimes+for+${movieTitle}+${locationQuery}`;
    console.log(`Opening showtimes URL: ${url}`); // Debug log
    const newWindow = window.open(url, '_blank');
    if (!newWindow) {
      alert('Popup blocked! Please allow popups for this site.');
    }
  };

  // Attempts geolocation + ZIP lookup, or fallback to near me search
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
        () => {
          openShowtimesTab(movieTitle, null);
        }
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
      console.log(`User entered ZIP code: ${zip}`); // Debug log
      openShowtimesTab(movieTitle, zip && zip.trim() !== '' ? zip.trim() : null);
      setShowManualPrompt(false);
    }
  };

  const handleRelatedMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <BootstrapSpinner size="4rem" />
      </div>
    );
  }

  if (error) {
    return <p className="text-danger text-center py-5">{error}</p>;
  }

  return (
    <main className="container py-4">
      <div className="row g-4">
        <div className="col-md-4">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : 'https://dummyimage.com/300x450/cccccc/555555&text=No+Image'
            }
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
            <strong>Genres:</strong> {movie.genres.map((g) => g.name).join(', ')}
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
        <h3>Related Movies</h3>
        {relatedLoading ? (
          <div className="d-flex justify-content-center py-3">
            <BootstrapSpinner size="3rem" />
          </div>
        ) : relatedMovies.length ? (
          <div
            className="d-flex overflow-auto gap-3"
            style={{ whiteSpace: 'nowrap' }}
          >
            {relatedMovies.map((rel) => (
              <div
                key={rel.id}
                style={{ minWidth: '150px', cursor: 'pointer' }}
                onClick={() => handleRelatedMovieClick(rel.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) =>
                  e.key === 'Enter' && handleRelatedMovieClick(rel.id)
                }
              >
                <img
                  src={
                    rel.poster_path
                      ? `https://image.tmdb.org/t/p/w200${rel.poster_path}`
                      : 'https://dummyimage.com/150x225/cccccc/555555&text=No+Image'
                  }
                  alt={rel.title}
                  className="img-fluid rounded"
                />
                <p className="mt-1 text-truncate">{rel.title}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No related movies found.</p>
        )}
      </section>
    </main>
  );
}

