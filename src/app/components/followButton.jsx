"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FollowButton({ followerId, followingId, isFollowing }) {
  const [following, setFollowing] = useState(isFollowing);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function toggleFollow() {
    setLoading(true);
    const res = await fetch("/api/follow", {
      method: following ? "DELETE" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ followerId, followingId }),
    });
    if (res.ok) {
      setFollowing(!following);
      router.refresh();
    }
    setLoading(false);
  }

  return (
    <button
      onClick={toggleFollow}
      disabled={loading}
      className={`
        text-sm font-semibold px-5 py-2 rounded-xl
        transition-all duration-150 active:scale-95
        ${
          following
            ? "bg-white/10 hover:bg-white/20 border border-white/20 text-white"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }
        ${loading ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      {following ? "Following" : "Follow"}
    </button>
  );
}
