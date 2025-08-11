const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE = 'https://api.themoviedb.org/3';

const withKey = (path) => `${BASE}${path}${path.includes('?') ? '&' : '?'}api_key=${API_KEY}&language=en-US`;

export async function fetchNowPlaying({ page = 1, region = 'US' } = {}) {
  const res = await fetch(withKey(`/movie/now_playing?page=${page}&region=${region}`));
  if (!res.ok) throw new Error('Failed now_playing');
  return res.json();
}

export async function searchMoviesTMDB(query, { page = 1 } = {}) {
  const res = await fetch(withKey(`/search/movie?query=${encodeURIComponent(query)}&page=${page}`));
  if (!res.ok) throw new Error('Search failed');
  return res.json();
}

export async function fetchMovie(id) {
  const res = await fetch(withKey(`/movie/${id}`));
  if (!res.ok) throw new Error('Movie not found');
  return res.json();
}

export async function fetchSimilar(id, { page = 1 } = {}) {
  const res = await fetch(withKey(`/movie/${id}/similar?page=${page}`));
  if (!res.ok) throw new Error('Similar failed');
  return res.json();
}

export const img = {
  poster: (path, w = 500) => path ? `https://image.tmdb.org/t/p/w${w}${path}` : 'https://dummyimage.com/300x450/cccccc/555555&text=No+Image',
  thumb:  (path, w = 200) => path ? `https://image.tmdb.org/t/p/w${w}${path}` : 'https://dummyimage.com/150x225/cccccc/555555&text=No+Image',
};
