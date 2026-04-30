import { createClient } from "../../../lib/server";
import { redirect } from "next/navigation";
import Navbar from "../components/navbar";
import { getPopularMovies } from "../../../lib/tmdb";
import MoviesGrid from "../components/movieGrid";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const movies = await getPopularMovies();
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar user={user} />
      {/* your home content */}
      <MoviesGrid movies={movies.results} />
    </div>
  );
}
