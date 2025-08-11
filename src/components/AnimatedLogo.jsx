import React from 'react';

/**
 * Animated movie-reel logo (from your logo.html) with accessible defaults.
 * Props:
 *  - size: number (px) for both width/height
 *  - primary: camera body color
 *  - accent: reel color
 *  - duration: spin duration in ms
 *  - label: accessible label for assistive tech
 */
export default function AnimatedLogo({
  size = 40,
  primary = '#6c63ff',
  accent = '#4dd0e1',
  duration = 2000,
  label = 'MyMovieDB logo',
}) {
  const px = `${size}px`;

  return (
    <div
      className="animated-logo d-inline-flex align-items-center"
      aria-label={label}
      role="img"
      style={{ width: px, height: px, lineHeight: 0 }}
    >
      <svg
        width={px}
        height={px}
        viewBox="0 0 250 200"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        {/* Camera body shaped like an “M” */}
        <path
          d="M30,150 L30,60 L80,60 L105,100 L155,60 L205,60 L205,150 Z"
          fill={primary}
        />

        {/* Film reels */}
        <circle className="reel" cx="90" cy="60" r="20" fill={accent} />
        <circle className="reel" cx="160" cy="60" r="20" fill={accent} />

        {/* Reel centers */}
        <circle className="reel" cx="90" cy="60" r="6" fill="#ffffff" />
        <circle className="reel" cx="160" cy="60" r="6" fill="#ffffff" />
      </svg>

      {/* Scoped styles */}
      <style>{`
        .animated-logo .reel {
          transform-origin: center;
          animation: animated-logo-spin ${duration}ms linear infinite;
        }
        @keyframes animated-logo-spin {
          0%   { transform: rotate(0deg)   scale(1); }
          50%  { transform: rotate(180deg) scale(1.1); }
          100% { transform: rotate(360deg) scale(1); }
        }
        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .animated-logo .reel { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
