import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import SearchMovies from './pages/SearchMovies';
import SearchResults from './pages/SearchResults';
import MovieSummary from './pages/MovieSummary';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <div className="flex-grow-1">
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchMovies />} />
            <Route path="/search-results" element={<SearchResults />} />
            <Route path="/movie/:id" element={<MovieSummary />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
