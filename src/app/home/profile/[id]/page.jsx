import { createClient } from "../../../../../lib/server";
import { redirect } from "next/navigation";
import { prisma } from "../../../../../lib/prisma";
import Link from "next/link";
import FollowButton from "@/app/components/followButton";

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
      </div>
      <p className="text-white text-xs font-medium mt-2 line-clamp-2 leading-snug">
        {movie.movieTitle}
      </p>
    </Link>
  );
}

function EmptyState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <span className="text-4xl mb-3">🎬</span>
      <p className="text-gray-500 text-sm">{message}</p>
    </div>
  );
}

export default async function UserProfilePage({ params }) {
  const { id } = await params;

  const supabase = await createClient();
  const {
    data: { user: supabaseUser },
  } = await supabase.auth.getUser();
  if (!supabaseUser) redirect("/login");

  const [currentUser, profileUser] = await Promise.all([
    prisma.user.findUnique({ where: { email: supabaseUser.email } }),
    prisma.user.findUnique({
      where: { id },
      include: {
        watchlist: { orderBy: { createdAt: "desc" } },
        watchLater: { orderBy: { createdAt: "desc" } },
        following: true,
        followers: true,
      },
    }),
  ]);

  if (!profileUser) redirect("/home");

  // Redirect to own profile if viewing yourself
  if (currentUser?.id === profileUser.id) redirect("/home/profile");

  const isFollowing = profileUser.followers.some(
    (f) => f.followerId === currentUser?.id,
  );

  const name =
    profileUser.user_metadata?.full_name ??
    profileUser.user_metadata?.name ??
    profileUser.email.split("@")[0];

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  const watchlist = profileUser.watchlist ?? [];
  const watchLater = profileUser.watchLater ?? [];
  const followersCount = profileUser.followers.length;
  const followingCount = profileUser.following.length;

  return (
    <div className="min-h-screen px-4 md:px-10 py-8">
      {/* Profile header */}
      <div className="flex items-center gap-5 mb-10">
        <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold shrink-0">
          {initials}
        </div>
        <div className="flex-1">
          <h1 className="text-white text-2xl font-bold">{name}</h1>
          <p className="text-gray-500 text-sm mb-3">{profileUser.email}</p>
          <div className="flex items-center gap-4 text-sm mb-4">
            <span className="text-white font-semibold">
              {followersCount}{" "}
              <span className="text-gray-500 font-normal">followers</span>
            </span>
            <span className="text-white font-semibold">
              {followingCount}{" "}
              <span className="text-gray-500 font-normal">following</span>
            </span>
            <span className="text-white font-semibold">
              {watchlist.length}{" "}
              <span className="text-gray-500 font-normal">watchlist</span>
            </span>
          </div>
          <FollowButton
            followerId={currentUser?.id}
            followingId={profileUser.id}
            isFollowing={isFollowing}
          />
        </div>
      </div>

      {/* Watchlist */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-5">
          <h2 className="text-white text-lg font-semibold">Watchlist</h2>
          <span className="text-gray-500 text-sm">
            {watchlist.length} movies
          </span>
        </div>
        {watchlist.length === 0 ? (
          <EmptyState message="This user hasn't added any movies yet." />
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
          <EmptyState message="Nothing saved for later." />
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
