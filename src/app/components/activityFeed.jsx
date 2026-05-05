import { prisma } from "../../../lib/prisma";
import { createClient } from "../../../lib/server";
import Link from "next/link";

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

function activityText(type) {
  switch (type) {
    case "WATCHLIST_ADD":
      return "added to watchlist";
    case "WATCH_LATER_ADD":
      return "saved for later";
    case "COMMENT":
      return "commented on";
    default:
      return "interacted with";
  }
}

export default async function ActivityFeed() {
  const supabase = await createClient();
  const {
    data: { user: supabaseUser },
  } = await supabase.auth.getUser();
  if (!supabaseUser) return null;

  const currentUser = await prisma.user.findUnique({
    where: { email: supabaseUser.email },
    include: { following: true },
  });

  if (!currentUser || currentUser.following.length === 0) return null;

  const followingIds = currentUser.following.map((f) => f.followingId);

  const activities = await prisma.activity.findMany({
    where: { userId: { in: followingIds } },
    orderBy: { createdAt: "desc" },
    take: 20,
    include: { user: true },
  });

  if (activities.length === 0) return null;

  return (
    <section className="px-4 md:px-10 py-8">
      <h2 className="text-white text-lg font-semibold mb-5">
        Friends Activity
      </h2>
      <div className="flex flex-col gap-3">
        {activities.map((activity) => {
          const userName = activity.user.email.split("@")[0];
          const initials = userName.slice(0, 2).toUpperCase();

          return (
            <div key={activity.id} className="flex items-center gap-3">
              {/* Avatar */}
              <Link href={`/home/profile/${activity.userId}`}>
                <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-semibold shrink-0 hover:ring-2 hover:ring-blue-400 transition-all">
                  {initials}
                </div>
              </Link>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-300 leading-snug">
                  <Link
                    href={`/home/profile/${activity.userId}`}
                    className="text-white font-medium hover:text-blue-400 transition-colors"
                  >
                    {userName}
                  </Link>{" "}
                  {activityText(activity.type)}{" "}
                  {activity.movieId && (
                    <Link
                      href={`/home/movie/${activity.movieId}`}
                      className="text-white font-medium hover:text-blue-400 transition-colors"
                    >
                      {activity.movieTitle || "a movie"}
                    </Link>
                  )}
                </p>
                <p className="text-gray-600 text-xs mt-0.5">
                  {timeAgo(activity.createdAt)}
                </p>
              </div>

              {/* Poster */}
              {activity.moviePoster && (
                <Link
                  href={`/home/movie/${activity.movieId}`}
                  className="shrink-0"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w92${activity.moviePoster}`}
                    alt={activity.movieTitle}
                    className="w-8 h-12 rounded-md object-cover hover:ring-2 hover:ring-white/20 transition-all"
                  />
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
