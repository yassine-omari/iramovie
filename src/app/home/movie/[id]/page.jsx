import {
  getMovieDetails,
  getMovieTrailer,
  getSimilarMovies,
} from "../../../../../lib/tmdb";
import { createClient } from "../../../../../lib/server";
import { redirect } from "next/navigation";
import { prisma } from "../../../../../lib/prisma";
import MovieHero from "@/app/components/movieHero";
import MovieTrailer from "@/app/components/movieTrailer";
import MovieComments from "@/app/components/movieComments";
import MovieRow from "@/app/components/movieRow";

export default async function MoviePage({ params }) {
  const { id } = await params;

  const supabase = await createClient();
  const {
    data: { user: supabaseUser },
  } = await supabase.auth.getUser();
  if (!supabaseUser) redirect("/login");

  const [movie, trailer, similar, prismaUser] = await Promise.all([
    getMovieDetails(id),
    getMovieTrailer(id),
    getSimilarMovies(id),
    prisma.user.findUnique({ where: { email: supabaseUser.email } }),
  ]);

  const inWatchlist = await prisma.watchlist.findUnique({
    where: { userId_movieId: { userId: prismaUser.id, movieId: Number(id) } },
  });

  const comments = await prisma.comment.findMany({
    where: { movieId: Number(id) },
    orderBy: { createdAt: "desc" },
  });

  const runtime = movie.runtime
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
    : null;

  return (
    <div className="min-h-screen">
      <MovieHero
        movie={movie}
        runtime={runtime}
        inWatchlist={!!inWatchlist}
        userId={prismaUser.id}
      />

      {movie.overview && (
        <div className="px-4 md:px-10 py-8 max-w-3xl">
          <h2 className="text-white text-lg font-semibold mb-3">
            About this film
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            {movie.overview}
          </p>
        </div>
      )}

      {trailer && (
        <div className="px-4 md:px-10 pb-8">
          <h2 className="text-white text-lg font-semibold mb-4">Trailer</h2>
          <MovieTrailer trailerKey={trailer.key} title={movie.title} />
        </div>
      )}

      {similar.results?.length > 0 && (
        <>
          <div className="mx-4 md:mx-10 border-t border-white/5" />
          <MovieRow
            title="Similar Movies"
            movies={similar.results}
            href="/home/popular"
          />
        </>
      )}

      <div className="mx-4 md:mx-10 border-t border-white/5 mt-4" />

      <MovieComments
        movieId={Number(id)}
        userId={prismaUser.id}
        userName={
          supabaseUser.user_metadata?.full_name ??
          supabaseUser.email.split("@")[0]
        }
        initialComments={comments}
      />
    </div>
  );
}
