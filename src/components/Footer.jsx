import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedLogo from './AnimatedLogo';

export default function Footer() {
  return (
    <footer className="footer mt-auto py-4 border-top bg-light">
      <div className="container">
        <div className="row align-items-center">
   
          <div className="col-md-4 mb-3 mb-md-0 d-flex align-items-center">
            <Link to="/" className="d-flex align-items-center text-decoration-none">
              <AnimatedLogo size={28} />
              <span className="ms-2 text-dark fw-bold fs-5">MyMovieDB</span>
            </Link>
          </div>


          <div className="col-md-4 mb-3 mb-md-0 text-center">
            <Link to="/" className="footer-link mx-2">Home</Link>
            <Link to="/search" className="footer-link mx-2">Search Movies</Link>
            <button
              type="button"
              className="btn btn-link footer-link mx-2 p-0"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Back to Top
            </button>
          </div>

         
          <div className="col-md-4 text-md-end text-center">
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="footer-social mx-2">
              <i className="bi bi-twitter" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="footer-social mx-2">
              <i className="bi bi-facebook" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-social mx-2">
              <i className="bi bi-instagram" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="row mt-3">
          <div className="col text-center small text-muted">
            &copy; {new Date().getFullYear()} MyMovieDB. All rights reserved.
          </div>
        </div>
      </div>

      <style>{`
        .footer-link {
          color: #6c63ff;
          font-weight: 500;
          transition: color 0.2s ease;
        }
        .footer-link:hover {
          color: #4dd0e1;
          text-decoration: none;
        }
        .footer-social {
          color: #6c63ff;
          font-size: 1.25rem;
          transition: color 0.2s ease;
        }
        .footer-social:hover {
          color: #4dd0e1;
        }
      `}</style>
    </footer>
  );
}
