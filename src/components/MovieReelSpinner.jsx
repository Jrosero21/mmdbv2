import React from 'react';

const MovieReelSpinner = ({ size = 48, color = '#6c63ff' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ animation: 'spin 2s linear infinite' }}
      aria-label="Loading"
      role="img"
    >
      <circle cx="32" cy="32" r="30" />
      <circle cx="16" cy="16" r="4" fill={color} />
      <circle cx="48" cy="16" r="4" fill={color} />
      <circle cx="16" cy="48" r="4" fill={color} />
      <circle cx="48" cy="48" r="4" fill={color} />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.1); }
          100% { transform: rotate(360deg) scale(1); }
        }
      `}</style>
    </svg>
  );
};

export default MovieReelSpinner;
