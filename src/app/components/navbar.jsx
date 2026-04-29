"use client";

import { createClient } from "../../../lib/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

function IramoLogo() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer hexagon shape */}
      <polygon
        points="16,2 28,9 28,23 16,30 4,23 4,9"
        fill="#2563EB"
        stroke="none"
      />
      {/* Letter I — vertical bar */}
      <rect x="14.5" y="9" width="3" height="14" rx="1.5" fill="white" />
      {/* Accent dot top right */}
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
    <nav className="w-full bg-white border-b border-gray-200 px-4 md:px-8 py-3 flex items-center justify-between">
      {/* Left — Logo + Name */}
      <div className="flex items-center gap-2.5">
        <IramoLogo />
        <span className="text-xl font-bold text-gray-900 tracking-tight">
          iramo
        </span>
      </div>

      {/* Right — User menu */}
      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-2.5 hover:bg-gray-100 rounded-xl px-3 py-1.5 transition"
        >
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="Avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-semibold">
              {initials}
            </div>
          )}
          <span className="text-sm font-medium text-gray-700 hidden sm:block">
            {name}
          </span>
          <ChevronIcon open={menuOpen} />
        </button>

        {/* Dropdown */}
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-xs text-gray-400">Signed in as</p>
              <p className="text-sm font-medium text-gray-800 truncate">
                {user?.email}
              </p>
            </div>
            <button
              onClick={handleSignOut}
              className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition"
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

function ChevronIcon({ open }) {
  return (
    <svg
      className={`w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}
