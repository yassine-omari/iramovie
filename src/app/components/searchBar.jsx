"use client";
import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`
        flex items-center gap-2 w-full max-w-lg mx-4
        bg-white/10 rounded-2xl px-4 py-2
        border transition-all duration-200
        ${focused ? "border-blue-500 bg-white/15" : "border-transparent"}
      `}
    >
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

      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="flex-1 bg-transparent outline-none text-sm text-white placeholder-gray-500"
      />

      {query && (
        <button
          type="button"
          onClick={() => setQuery("")}
          className="text-gray-500 hover:text-gray-300 transition text-lg leading-none"
          aria-label="Clear"
        >
          ×
        </button>
      )}

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-semibold px-3 py-1.5 rounded-xl transition-all duration-150"
      >
        Search
      </button>
    </form>
  );
}
