import { getMovieDetails } from "../../../../../../lib/tmdb";
import Link from "next/link";

export default async function WatchPage({ params }) {
  const { id } = await params;
  const movie = await getMovieDetails(id);

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 md:px-8 py-3 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Link
            href={`/home/movie/${id}`}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Link>
          <h1 className="text-white text-sm font-medium truncate max-w-xs md:max-w-lg">
            {movie.title}
          </h1>
        </div>
        <div className="flex items-center gap-2 text-gray-500 text-xs">
          <span className="text-amber-400">
            ⭐ {Number(movie.vote_average).toFixed(1)}
          </span>
          <span>•</span>
          <span>{movie.release_date?.slice(0, 4)}</span>
        </div>
      </div>

      {/* Player */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl aspect-video rounded-xl overflow-hidden bg-[#111]">
          <iframe
            src={`https://vidapi.xyz/embed/movie/${id}`}
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; encrypted-media; picture-in-picture"
          />
        </div>
      </div>
    </div>
  );
}
