import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AnimatedLogo from './AnimatedLogo';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg bg-white border-bottom sticky-top ${scrolled ? 'shadow-sm' : ''}`}>
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <AnimatedLogo size={36} />
          <span className="ms-2 logo-text text-dark fw-bold fs-4 fade-in-wordmark">
            MyMovieDB
          </span>
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
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link nav-underline text-uppercase ms-3 ${isActive ? 'active' : ''}`
                }
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/search-results"
                className={({ isActive }) =>
                  `nav-link nav-underline text-uppercase ms-3 ${isActive ? 'active' : ''}`
                }
              >
                Search Movies
              </NavLink>
            </li>
            <li className="nav-item ms-3">
              <button
                className="btn btn-gradient rounded-pill px-3"
                onClick={() => alert('Contact modal not implemented yet')}
              >
                Contact
              </button>
            </li>
          </ul>
        </div>
      </div>


      <style>{`
        .fade-in-wordmark {
          opacity: 0; transform: translateY(4px);
          animation: mmdb-fade-in 700ms ease-out 200ms forwards;
        }
        @keyframes mmdb-fade-in { to { opacity: 1; transform: translateY(0); } }
        @media (prefers-reduced-motion: reduce) {
          .fade-in-wordmark { animation: none !important; opacity: 1; transform: none; }
        }

        /* Link underline animation */
        .nav-underline { position: relative; }
        .nav-underline::after {
          content: ""; position: absolute; left: 0; right: 0; bottom: -4px;
          height: 2px; background: linear-gradient(90deg,#6c63ff,#4dd0e1);
          transform: scaleX(0); transform-origin: left; transition: transform .25s ease;
        }
        .nav-underline:hover::after, .nav-underline.active::after { transform: scaleX(1); }

        /* Gradient button matching hero */
        .btn-gradient {
          background-image: linear-gradient(135deg,#6c63ff,#4dd0e1);
          color: #fff; border: none;
          box-shadow: 0 2px 8px rgba(76,110,245,.25);
        }
        .btn-gradient:hover { filter: brightness(.95); color: #fff; }
        .btn-gradient:active { transform: translateY(1px); }
      `}</style>
    </nav>
  );
}
