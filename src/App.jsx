import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MovieReelSpinner from './components/MovieReelSpinner';

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 3 seconds, then show the page content
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container text-center mt-5">
      {loading ? (
        <MovieReelSpinner size={64} />
      ) : (
        <h1>Welcome to MyMovieDB React</h1>
      )}
    </div>
  );
};

const SearchResults = () => <h1>Search Results Page</h1>;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </BrowserRouter>
  );
}
