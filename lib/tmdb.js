// lib/tmdb.js

export async function getPopularMovies() {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}`,
    { cache: "no-store" },
  );
  return res.json();
}

export async function searchMovies(query) {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&api_key=${process.env.TMDB_API_KEY}`,
    { cache: "no-store" },
  );
  return res.json();
}