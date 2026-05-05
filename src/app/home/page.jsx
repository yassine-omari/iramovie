import Hero from "../components/hero";
import MovieRow from "../components/movieRow";
import TagLine from "../components/tagline";
import Genres from "../components/genres";
import ActivityFeed from "../components/activityFeed";

import {
  getPopularMovies,
  getTopratedMovies,
  getUpcomingMovies,
  getGenres,
} from "../../../lib/tmdb";

export default async function HomePage() {
  const [popular, topRated, upcoming, genresData] = await Promise.all([
    getPopularMovies(),
    getTopratedMovies(),
    getUpcomingMovies(),
    getGenres(),
  ]);

  return (
    <main>
      <Hero movies={popular.results} />
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
      <div className="mx-4 md:mx-10 border-t border-white/5" />
      <Genres genres={genresData.genres ?? []} />
      <div className="mx-4 md:mx-10 border-t border-white/5" />
      <ActivityFeed />
      <TagLine />
    </main>
  );
}
