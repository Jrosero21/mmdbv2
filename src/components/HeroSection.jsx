import React from 'react';
import Search from './Search';

export default function HeroSection() {
  return (
    <header className="hero text-white text-center py-5" style={{ background: 'linear-gradient(135deg,#6c63ff,#4dd0e1)' }}>
      <div className="container">
        <h1 className="fw-semibold mb-3" style={{ fontSize: '2.75rem' }}>
          America's most awarded<br />online movie library
        </h1>
        <p className="lead fw-light mb-4" style={{ fontSize: '1.5rem' }}>
          START TYPING TO BROWSE NEW MOVIES
        </p>
        <div className="row justify-content-center">
          <div className="col-12 col-md-6">
            <Search />
          </div>
        </div>
      </div>
    </header>
  );
}
