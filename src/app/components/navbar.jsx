"use client";

import { createClient } from "../../../lib/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SearchBar from "./searchBar";

function IramoLogo() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        points="16,2 28,9 28,23 16,30 4,23 4,9"
        fill="#2563EB"
        stroke="none"
      />
      <rect x="14.5" y="9" width="3" height="14" rx="1.5" fill="white" />
      <circle cx="22" cy="10" r="2.5" fill="#60A5FA" />
    </svg>
  );
}

export default function Navbar({ user }) {
  const supabase = createClient();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  async function handleSignOut() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  const handleSearch = (query) => {
    router.push(`/home/search?q=${encodeURIComponent(query)}`);
  };

  const name =
    user?.user_metadata?.full_name ??
    user?.user_metadata?.name ??
    user?.email?.split("@")[0] ??
    "User";

  const avatarUrl = user?.user_metadata?.avatar_url;

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <nav className="sticky top-0 z-40 w-full bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10 px-4 md:px-8 py-2.5 flex items-center justify-between gap-4">
      {/* Left — Logo + Name */}
      <a href="/" className="flex items-center gap-2.5 shrink-0">
        <IramoLogo />
        <span className="text-lg font-bold text-white tracking-tight hidden sm:block">
          iramovie
        </span>
      </a>

      {/* Center — Nav links + Search */}
      <div className="flex items-center gap-1 shrink-0 hidden md:flex">
        {[
          { label: "Popular", href: "/home/popular" },
          { label: "Top Rated", href: "/home/top-rated" },
          { label: "Upcoming", href: "/home/upcoming" },
        ].map(({ label, href }) => (
          <a
            key={href}
            href={href}
            className="text-sm font-medium text-gray-400 hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-xl transition-colors duration-150 whitespace-nowrap"
          >
            {label}
          </a>
        ))}
      </div>

      <div className="flex-1 min-w-0">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Right — User menu */}
      <div className="relative shrink-0">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-2 hover:bg-white/10 rounded-xl px-2.5 py-1.5 transition-colors duration-150"
        >
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="Avatar"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-white/20"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-semibold">
              {initials}
            </div>
          )}
          <span className="text-sm font-medium text-gray-300 hidden md:block max-w-[120px] truncate">
            {name}
          </span>
          <ChevronIcon open={menuOpen} />
        </button>

        {/* Dropdown */}
        {menuOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setMenuOpen(false)}
            />
            <div className="absolute right-0 mt-2 w-52 bg-[#111111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-white/10 bg-white/5">
                <p className="text-[11px] text-gray-500 uppercase tracking-wide font-medium mb-0.5">
                  Signed in as
                </p>
                <p className="text-sm font-semibold text-gray-200 truncate">
                  {user?.email}
                </p>
              </div>
              <button
                onClick={handleSignOut}
                className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors duration-150 font-medium"
              >
                Sign out
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

function ChevronIcon({ open }) {
  return (
    <svg
      className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}
