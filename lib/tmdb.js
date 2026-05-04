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

export async function getMovieDetails(id) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`,
    { cache: "no-store" },
  );
  return res.json();
}

export async function getMovieTrailer(id) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.TMDB_API_KEY}`,
    { cache: "no-store" },
  );
  const data = await res.json();
  const trailer = data.results?.find(
    (v) => v.type === "Trailer" && v.site === "YouTube",
  );
  return trailer ?? null;
}

export async function getSimilarMovies(id) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.TMDB_API_KEY}`,
    { cache: "no-store" },
  );
  return res.json();
}
