"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("movies"); // "movies" | "people"
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);
  const [open, setOpen] = useState(false);
  const debounceRef = useRef(null);
  const containerRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!query.trim() || query.length < 2) {
      setSuggestions([]);
      setOpen(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        if (tab === "movies") {
          const res = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=1`,
          );
          const data = await res.json();
          setSuggestions(data.results?.slice(0, 6) ?? []);
        } else {
          const res = await fetch(
            `/api/users/search?q=${encodeURIComponent(query)}`,
          );
          const data = await res.json();
          setSuggestions(data);
        }
        setOpen(true);
      } catch {
        setSuggestions([]);
      }
      setLoading(false);
    }, 300);

    return () => clearTimeout(debounceRef.current);
  }, [query, tab]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelectMovie(movie) {
    setQuery("");
    setSuggestions([]);
    setOpen(false);
    router.push(`/home/movie/${movie.id}`);
  }

  function handleSelectUser(user) {
    setQuery("");
    setSuggestions([]);
    setOpen(false);
    router.push(`/home/profile/${user.id}`);
  }

  function handleKeyDown(e) {
    if (e.key === "Escape") {
      setOpen(false);
      setQuery("");
    }
  }

  const initials = (name) =>
    (name ?? "?")
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  return (
    <div ref={containerRef} className="relative w-full">
      <div
        className={`
          flex items-center gap-2 w-full
          bg-white/10 rounded-2xl px-4 py-2
          border transition-all duration-200
          ${focused ? "border-blue-500 bg-white/15" : "border-transparent"}
        `}
      >
        {/* Tab toggle */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={() => {
              setTab("movies");
              setSuggestions([]);
            }}
            className={`text-xs px-2 py-0.5 rounded-lg transition-colors ${tab === "movies" ? "bg-white/20 text-white" : "text-gray-500 hover:text-gray-300"}`}
          >
            🎬
          </button>
          <button
            type="button"
            onClick={() => {
              setTab("people");
              setSuggestions([]);
            }}
            className={`text-xs px-2 py-0.5 rounded-lg transition-colors ${tab === "people" ? "bg-white/20 text-white" : "text-gray-500 hover:text-gray-300"}`}
          >
            👤
          </button>
        </div>

        <div className="w-px h-4 bg-white/10 shrink-0" />

        {/* Spinner or search icon */}
        {loading ? (
          <svg
            className="w-4 h-4 text-gray-400 shrink-0 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            />
          </svg>
        ) : (
          <svg
            className="w-4 h-4 text-gray-500 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
            />
          </svg>
        )}

        <input
          type="text"
          placeholder={
            tab === "movies" ? "Search movies..." : "Search people..."
          }
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            setFocused(true);
            if (suggestions.length > 0) setOpen(true);
          }}
          onBlur={() => setFocused(false)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-sm text-white placeholder-gray-500 min-w-0"
        />

        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setSuggestions([]);
              setOpen(false);
            }}
            className="text-gray-500 hover:text-gray-300 transition text-lg leading-none shrink-0"
          >
            ×
          </button>
        )}
      </div>

      {/* Dropdown */}
      {open && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a1a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-50">
          {tab === "movies"
            ? suggestions.map((movie) => (
                <button
                  key={movie.id}
                  onMouseDown={() => handleSelectMovie(movie)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/10 transition-colors duration-150 text-left"
                >
                  <div className="shrink-0 w-8 h-12 rounded-md overflow-hidden bg-white/5">
                    {movie.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs">
                        🎬
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">
                      {movie.title}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {movie.release_date?.slice(0, 4) ?? "—"}
                    </p>
                  </div>
                  {movie.vote_average > 0 && (
                    <span className="text-amber-400 text-xs font-semibold shrink-0">
                      ⭐ {Number(movie.vote_average).toFixed(1)}
                    </span>
                  )}
                </button>
              ))
            : suggestions.map((user) => (
                <button
                  key={user.id}
                  onMouseDown={() => handleSelectUser(user)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/10 transition-colors duration-150 text-left"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-semibold shrink-0">
                    {initials(user.name ?? user.email.split("@")[0])}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">
                      {user.name ?? user.email.split("@")[0]}
                    </p>
                    <p className="text-gray-500 text-xs truncate">
                      {user.email}
                    </p>
                  </div>
                </button>
              ))}
        </div>
      )}
    </div>
  );
}
