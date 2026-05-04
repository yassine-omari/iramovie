import { createClient } from "../../../../lib/server";
import { redirect } from "next/navigation";
import { prisma } from "../../../../lib/prisma";
import Link from "next/link";

function MovieCard({ movie }) {
  return (
    <Link href={`/home/movie/${movie.movieId}`} className="group">
      <div className="relative rounded-xl overflow-hidden aspect-[2/3]">
        <img
          src={
            movie.moviePoster
              ? `https://image.tmdb.org/t/p/w300${movie.moviePoster}`
              : "/no-image.png"
          }
          alt={movie.movieTitle}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <p className="text-white text-xs font-medium mt-2 line-clamp-2 leading-snug">
        {movie.movieTitle}
      </p>
    </Link>
  );
}

function EmptyState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <span className="text-4xl mb-3">🎬</span>
      <p className="text-gray-500 text-sm">{message}</p>
    </div>
  );
}

export default async function LibraryPage() {
  const supabase = await createClient();
  const {
    data: { user: supabaseUser },
  } = await supabase.auth.getUser();
  if (!supabaseUser) redirect("/login");

  const prismaUser = await prisma.user.findUnique({
    where: { email: supabaseUser.email },
    include: {
      watchlist: { orderBy: { createdAt: "desc" } },
      watchLater: { orderBy: { createdAt: "desc" } },
    },
  });

  const watchlist = prismaUser?.watchlist ?? [];
  const watchLater = prismaUser?.watchLater ?? [];

  return (
    <div className="min-h-screen px-4 md:px-10 py-8">
      <h1 className="text-white text-2xl font-bold mb-8">My Library</h1>

      {/* Watchlist */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-5">
          <h2 className="text-white text-lg font-semibold">Watchlist</h2>
          <span className="text-gray-500 text-sm">
            {watchlist.length} movies
          </span>
        </div>
        {watchlist.length === 0 ? (
          <EmptyState message="No movies in your watchlist yet." />
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4">
            {watchlist.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </section>

      <div className="border-t border-white/5 mb-12" />

      {/* Watch Later */}
      <section>
        <div className="flex items-center gap-3 mb-5">
          <h2 className="text-white text-lg font-semibold">Watch Later</h2>
          <span className="text-gray-500 text-sm">
            {watchLater.length} movies
          </span>
        </div>
        {watchLater.length === 0 ? (
          <EmptyState message="No movies saved for later yet." />
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4">
            {watchLater.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
