import Link from "next/link";

export default function Hero({ movies }) {
  const candidates = movies.filter((m) => m.backdrop_path).slice(0, 10);
  const movie = candidates[Math.floor(Math.random() * candidates.length)];
  if (!movie) return null;

  return (
    <div className="relative w-full h-[70vh] min-h-[420px] max-h-[600px] overflow-hidden">
      <img
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
      <div className="relative h-full flex flex-col justify-end px-6 md:px-10 pb-10 max-w-2xl">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-amber-400 text-sm font-semibold">
            ⭐ {Number(movie.vote_average).toFixed(1)}
          </span>
          <span className="w-1 h-1 rounded-full bg-gray-500" />
          <span className="text-gray-400 text-sm">
            {movie.release_date?.slice(0, 4) ?? "—"}
          </span>
        </div>
        <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight mb-3 drop-shadow-lg">
          {movie.title}
        </h1>
        <p className="text-gray-300 text-sm md:text-base leading-relaxed line-clamp-3 mb-6 max-w-xl">
          {movie.overview}
        </p>
        <div className="flex items-center gap-3">
          <Link
            href="/home/popular"
            className="bg-white text-black text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-gray-200 active:scale-95 transition-all duration-150"
          >
            Explore →
          </Link>
          <Link
            href="/home/top-rated"
            className="bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-white/20 active:scale-95 transition-all duration-150"
          >
            Top Rated
          </Link>
        </div>
      </div>
    </div>
  );
}
