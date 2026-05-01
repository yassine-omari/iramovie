// lib/tmdb.js

export async function getPopularMovies() {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}`,
    { cache: "no-store" },
  );
  return res.json();
}

export async function getTopratedMovies() {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_API_KEY}`,
    { cache: "no-store" },
  );
  return res.json();
}

export async function getUpcomingMovies() {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_API_KEY}`,
    { cache: "no-store" },
  );
  return res.json();
}

export async function getNowPlayingMovies() {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.TMDB_API_KEY}`,
    { cache: "no-store" },
  );
  return res.json();
}

export async function getGenres() {
  const res = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_API_KEY}`,
    { cache: "force-cache" },
  );
  return res.json();
}

export async function getMoviesByGenre(genreId) {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&api_key=${process.env.TMDB_API_KEY}`,
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
