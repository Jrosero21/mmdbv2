import React, { useState, useEffect } from 'react';

export default function ShowtimesWidget({ movieTitle }) {
  const [searchUrl, setSearchUrl] = useState('');

  useEffect(() => {
    if (!movieTitle) return;
    const query = encodeURIComponent(`Showtimes for ${movieTitle} near me`);
    const url = `https://www.google.com/search?q=${query}&tbm=plcs`; // 'plcs' is local places search
    setSearchUrl(url);
  }, [movieTitle]);

  if (!searchUrl) return null;

  return (
    <div style={{ height: '500px', width: '100%', border: 'none', overflow: 'hidden', marginTop: '1rem' }}>
      <iframe
        title="Showtimes Widget"
        src={searchUrl}
        style={{ width: '100%', height: '100%', border: 'none' }}
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-popups"
      />
    </div>
  );
}
