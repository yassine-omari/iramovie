import Link from "next/link";
import {
  getPopularMovies,
  getTopratedMovies,
  getUpcomingMovies,
} from "../../../lib/tmdb";

function Hero({ movies }) {
  const candidates = movies.filter((m) => m.backdrop_path).slice(0, 10);
  const movie = candidates[Math.floor(Math.random() * candidates.length)];

  if (!movie) return null;

  return (
    <div className="relative w-full h-[70vh] min-h-[420px] max-h-[600px] overflow-hidden">
      {/* Backdrop */}
      <img
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end px-6 md:px-10 pb-10 max-w-2xl">
        {/* Meta */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-amber-400 text-sm font-semibold">
            ⭐ {Number(movie.vote_average).toFixed(1)}
          </span>
          <span className="w-1 h-1 rounded-full bg-gray-500" />
          <span className="text-gray-400 text-sm">
            {movie.release_date?.slice(0, 4) ?? "—"}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight mb-3 drop-shadow-lg">
          {movie.title}
        </h1>

        {/* Overview */}
        <p className="text-gray-300 text-sm md:text-base leading-relaxed line-clamp-3 mb-6 max-w-xl">
          {movie.overview}
        </p>

        {/* CTAs */}
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

function MovieRow({ title, movies, href }) {
  return (
    <section className="px-4 md:px-10 py-6">
      <div className="mb-4">
        <h2 className="text-white text-lg font-semibold">{title}</h2>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {movies.slice(0, 10).map((movie) => (
          <div key={movie.id} className="group shrink-0 w-36 cursor-pointer">
            <div className="relative rounded-xl overflow-hidden aspect-[2/3]">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                    : "/no-image.png"
                }
                alt={movie.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-amber-400 text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                ⭐ {Number(movie.vote_average).toFixed(1)}
              </div>
            </div>
            <p className="text-white text-xs font-medium mt-2 line-clamp-2 leading-snug">
              {movie.title}
            </p>
            <p className="text-gray-500 text-[11px] mt-0.5">
              {movie.release_date?.slice(0, 4) ?? "—"}
            </p>
          </div>
        ))}

        {/* See all card */}
        <Link href={href} className="group shrink-0 w-36">
          <div className="aspect-[2/3] rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-2 transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
            <p className="text-white text-xs font-medium">See all</p>
          </div>
        </Link>
      </div>
    </section>
  );
}

export default async function HomePage() {
  const [popular, topRated, upcoming] = await Promise.all([
    getPopularMovies(),
    getTopratedMovies(),
    getUpcomingMovies(),
  ]);

  return (
    <main>
      <Hero movies={popular.results} />

      <div className="mt-2">
        <MovieRow
          title="🔥 Popular Right Now"
          movies={popular.results}
          href="/home/popular"
        />
        <div className="mx-4 md:mx-10 border-t border-white/5" />
        <MovieRow
          title="⭐ Top Rated"
          movies={topRated.results}
          href="/home/top-rated"
        />
        <div className="mx-4 md:mx-10 border-t border-white/5" />
        <MovieRow
          title="🗓 Upcoming"
          movies={upcoming.results}
          href="/home/upcoming"
        />
      </div>
    </main>
  );
}
