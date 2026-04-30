import { searchMovies } from "../../../../lib/tmdb";
import MoviesGrid from "@/app/components/movieGrid";
import { createClient } from "../../../../lib/server";
import { redirect } from "next/navigation";

export default async function SearchPage({ searchParams }) {
  const supabase = await createClient();
  const searchP = await searchParams;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const q = searchP?.q ?? "";
  const results = q ? await searchMovies(q) : { results: [] };
  const count = results.results?.length ?? 0;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">

      {/* Results header */}
      {q && (
        <div className="px-4 md:px-10 pt-6 pb-2 flex items-baseline gap-3">
          <h1 className="text-white text-lg font-semibold">"{q}"</h1>
          <span className="text-gray-500 text-sm">
            {count} {count === 1 ? "result" : "results"}
          </span>
        </div>
      )}

      <MoviesGrid movies={results.results} />
    </div>
  );
}
