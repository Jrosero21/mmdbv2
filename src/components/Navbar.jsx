import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg shadow-sm bg-white border-bottom">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          {/* Movie reel SVG logo */}
          <svg width="40" height="40" viewBox="0 0 250 200" aria-hidden="true" focusable="false">
            <path d="M30,150 L30,60 L80,60 L105,100 L155,60 L205,60 L205,150 Z" fill="#6c63ff" />
            <circle className="reel" cx="90" cy="60" r="20" fill="#4dd0e1" />
            <circle className="reel" cx="160" cy="60" r="20" fill="#4dd0e1" />
            <circle className="reel" cx="90" cy="60" r="6" fill="#fff" />
            <circle className="reel" cx="160" cy="60" r="6" fill="#fff" />
          </svg>
          <span className="ms-2 logo-text text-dark fw-bold fs-4">MyMovieDB</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <NavLink to="/" className={({ isActive }) => `nav-link text-uppercase ms-3 ${isActive ? 'active' : ''}`}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/search-results" className={({ isActive }) => `nav-link text-uppercase ms-3 ${isActive ? 'active' : ''}`}>
                Search Movies
              </NavLink>
            </li>
            <li className="nav-item ms-3">
              <button
                className="btn btn-outline-dark rounded-pill"
                onClick={() => alert('Contact modal not implemented yet')}
              >
                Contact Me!
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
