"use client";

import { useState } from "react";

function timeAgo(date) {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function MovieComments({
  movieId,
  userId,
  userName,
  initialComments,
}) {
  const [comments, setComments] = useState(initialComments);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);

    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, movieId, content, userName }),
    });

    if (res.ok) {
      const newComment = await res.json();
      setComments([newComment, ...comments]);
      setContent("");
    }
    setLoading(false);
  }

  async function handleDelete(commentId) {
    const res = await fetch("/api/comments", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ commentId, userId }),
    });
    if (res.ok) {
      setComments(comments.filter((c) => c.id !== commentId));
    }
  }

  const initials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  return (
    <section className="px-4 md:px-10 py-8 max-w-3xl">
      <h2 className="text-white text-lg font-semibold mb-6">
        Comments{" "}
        <span className="text-gray-500 text-sm font-normal">
          ({comments.length})
        </span>
      </h2>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex gap-3 mb-8">
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-semibold shrink-0 mt-1">
          {initials(userName)}
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts..."
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-blue-500 focus:bg-white/10 transition-all duration-200 resize-none"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading || !content.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-2 rounded-xl transition-all duration-150 active:scale-95"
            >
              {loading ? "Posting..." : "Post"}
            </button>
          </div>
        </div>
      </form>

      {/* Comments list */}
      {comments.length === 0 ? (
        <div className="text-center py-12 text-gray-500 text-sm">
          No comments yet. Be the first!
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white text-xs font-semibold shrink-0">
                {initials(comment.userName)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-white text-sm font-medium">
                      {comment.userName}
                    </span>
                    <span className="text-gray-600 text-xs">
                      {timeAgo(comment.createdAt)}
                    </span>
                  </div>
                  {comment.userId === userId && (
                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="text-gray-600 hover:text-red-400 text-xs transition-colors duration-150"
                    >
                      Delete
                    </button>
                  )}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {comment.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
