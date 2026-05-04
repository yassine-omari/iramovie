"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function MovieHero({
  movie,
  runtime,
  inWatchlist,
  inWatchLater,
  userId,
}) {
  const [watchlisted, setWatchlisted] = useState(inWatchlist);
  const [watchLater, setWatchLater] = useState(inWatchLater);
  const [loadingWatchlist, setLoadingWatchlist] = useState(false);
  const [loadingWatchLater, setLoadingWatchLater] = useState(false);
  const router = useRouter();

  async function toggleWatchlist() {
    setLoadingWatchlist(true);
    const res = await fetch("/api/watchlist", {
      method: watchlisted ? "DELETE" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        movieId: movie.id,
        movieTitle: movie.title,
        moviePoster: movie.poster_path,
      }),
    });
    if (res.ok) {
      setWatchlisted(!watchlisted);
      router.refresh();
    }
    setLoadingWatchlist(false);
  }

  async function toggleWatchLater() {
    setLoadingWatchLater(true);
    const res = await fetch("/api/watch-later", {
      method: watchLater ? "DELETE" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        movieId: movie.id,
        movieTitle: movie.title,
        moviePoster: movie.poster_path,
      }),
    });
    if (res.ok) {
      setWatchLater(!watchLater);
      router.refresh();
    }
    setLoadingWatchLater(false);
  }

  return (
    <div className="relative w-full h-[75vh] min-h-[500px] max-h-[700px] overflow-hidden">
      {movie.backdrop_path ? (
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      ) : (
        <div className="absolute inset-0 bg-[#111]" />
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

      <div className="relative h-full flex items-end px-6 md:px-10 pb-10">
        <div className="flex gap-6 items-end max-w-4xl w-full">
          {movie.poster_path && (
            <div className="hidden sm:block shrink-0 w-36 md:w-44 rounded-2xl overflow-hidden shadow-2xl shadow-black/80 ring-1 ring-white/10">
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className="w-full aspect-[2/3] object-cover"
              />
            </div>
          )}

          <div className="flex-1 pb-1">
            {movie.genres?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {movie.genres.map((g) => (
                  <span
                    key={g.id}
                    className="text-[11px] font-medium text-gray-300 bg-white/10 border border-white/10 px-2.5 py-0.5 rounded-full"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            )}

            <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight mb-3">
              {movie.title}
            </h1>

            <div className="flex flex-wrap items-center gap-2 mb-6 text-sm text-gray-400">
              <span className="text-amber-400 font-semibold">
                ⭐ {Number(movie.vote_average).toFixed(1)}
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-600" />
              <span>{movie.release_date?.slice(0, 4) ?? "—"}</span>
              {runtime && (
                <>
                  <span className="w-1 h-1 rounded-full bg-gray-600" />
                  <span>{runtime}</span>
                </>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              {/* Watch Now */}
              <Link
                href={`/home/movie/${movie.id}/watch`}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-150"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch Now
              </Link>

              {/* Watchlist */}
              <button
                onClick={toggleWatchlist}
                disabled={loadingWatchlist}
                className={`
                  flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl
                  transition-all duration-150 active:scale-95
                  ${
                    watchlisted
                      ? "bg-white text-black hover:bg-gray-200"
                      : "bg-white/10 hover:bg-white/20 border border-white/20 text-white"
                  }
                  ${loadingWatchlist ? "opacity-50 cursor-not-allowed" : ""}
                `}
              >
                {watchlisted ? "✓ Watchlist" : "+ Watchlist"}
              </button>

              {/* Watch Later */}
              <button
                onClick={toggleWatchLater}
                disabled={loadingWatchLater}
                className={`
                  flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl
                  transition-all duration-150 active:scale-95
                  ${
                    watchLater
                      ? "bg-amber-500 text-black hover:bg-amber-400"
                      : "bg-white/10 hover:bg-white/20 border border-white/20 text-white"
                  }
                  ${loadingWatchLater ? "opacity-50 cursor-not-allowed" : ""}
                `}
              >
                {watchLater ? "🕐 Watch Later" : "🕐 Watch Later"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
