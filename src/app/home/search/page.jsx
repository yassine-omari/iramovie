import { searchMovies } from "../../../../lib/tmdb";
import MoviesGrid from "@/app/components/movieGrid";
import { createClient } from "../../../../lib/server";
import { redirect } from "next/navigation";

function TopResult({ movie }) {
  return (
    <div className="relative w-full h-[70vh] min-h-[340px] max-h-[480px] overflow-hidden">
      {/* Backdrop */}
      {movie.backdrop_path ? (
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      ) : (
        <div className="absolute inset-0 bg-[#111111]" />
      )}

      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

      {/* Content */}
      <div className="relative h-full flex gap-6 items-end px-6 md:px-10 pb-8">
        {/* Poster */}
        <div className="hidden sm:block shrink-0 w-28 rounded-xl overflow-hidden shadow-2xl shadow-black/60">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                : "/no-image.png"
            }
            alt={movie.title}
            className="w-full aspect-[2/3] object-cover"
          />
        </div>

        {/* Info */}
        <div className="max-w-xl pb-1">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-widest text-blue-400 mb-2">
            Top Result
          </span>
          <h2 className="text-white text-2xl md:text-4xl font-bold leading-tight mb-2">
            {movie.title}
          </h2>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-amber-400 text-sm font-semibold">
              ⭐ {Number(movie.vote_average).toFixed(1)}
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <span className="text-gray-400 text-sm">
              {movie.release_date?.slice(0, 4) ?? "—"}
            </span>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed line-clamp-2 md:line-clamp-3">
            {movie.overview || "No overview available."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default async function SearchPage({ searchParams }) {
  const supabase = await createClient();
  const searchP = await searchParams;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const q = searchP?.q ?? "";
  const results = q ? await searchMovies(q) : { results: [] };
  const movies = results.results ?? [];
  const [topResult, ...rest] = movies;

  return (
    <div className="min-h-screen">
      {q ? (
        <>
          {topResult && <TopResult movie={topResult} />}

          {rest.length > 0 && (
            <div>
              <div className="px-4 md:px-10 pt-6 pb-1 flex items-baseline gap-3">
                <h2 className="text-white text-lg font-semibold">
                  Other Results
                </h2>
                <span className="text-gray-500 text-sm">
                  {rest.length} {rest.length === 1 ? "result" : "results"}
                </span>
              </div>
              <MoviesGrid movies={rest} />
            </div>
          )}

          {movies.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <span className="text-5xl mb-4">🎬</span>
              <p className="text-white font-semibold text-lg mb-1">
                No results for "{q}"
              </p>
              <p className="text-gray-500 text-sm">
                Try a different title or keyword.
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <span className="text-5xl mb-4">🔍</span>
          <p className="text-gray-400 text-sm">
            Search for a movie to get started.
          </p>
        </div>
      )}
    </div>
  );
}
