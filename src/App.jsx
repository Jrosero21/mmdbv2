import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import SearchMovies from './pages/SearchMovies';
import SearchResults from './pages/SearchResults';
import MovieSummary from './pages/MovieSummary';

export default function App() {
  return (
    <BrowserRouter>
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="flex-grow-1">
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
