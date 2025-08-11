import React from 'react';
import MovieCard from './MovieCard';

export default function MovieGrid({ movies, onMovieClick, renderMeta }) {
  if (!movies.length) return <p className="text-center mt-4">No results found.</p>;

  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {movies.map((movie) => (
        <div className="col" key={movie.id}>
          <MovieCard
            movie={movie}
            onClick={() => onMovieClick(movie.id)}
            renderMeta={renderMeta}
          />
        </div>
      ))}
    </div>
  );
}
