import React from 'react';

export default function BootstrapSpinner({ size = '3rem' }) {
  return (
    <div
      className="spinner-border text-primary"
      role="status"
      style={{ width: size, height: size }}
      aria-label="Loading"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}
