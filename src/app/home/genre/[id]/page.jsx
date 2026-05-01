import { getMoviesByGenre, getGenres } from "../../../../../lib/tmdb";
import MoviesGrid from "@/app/components/movieGrid";

const GENRE_ICONS = {
  28: "💥",
  12: "🧭",
  16: "🎨",
  35: "😂",
  80: "🔫",
  99: "🎥",
  18: "🎭",
  10751: "👨‍👩‍👧",
  14: "🧙",
  36: "📜",
  27: "👻",
  10402: "🎵",
  9648: "🕵️",
  10749: "❤️",
  878: "🚀",
  10770: "📺",
  53: "😰",
  10752: "⚔️",
  37: "🤠",
};

export default async function GenrePage({ params }) {
  const { id } = await params;

  const [moviesData, genresData] = await Promise.all([
    getMoviesByGenre(id),
    getGenres(),
  ]);

  const genre = genresData.genres?.find((g) => String(g.id) === String(id));
  const icon = GENRE_ICONS[Number(id)] ?? "🎬";

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="px-4 md:px-10 pt-8 pb-2 flex items-center gap-3">
        <span className="text-4xl">{icon}</span>
        <div>
          <p className="text-gray-500 text-xs uppercase tracking-widest font-medium mb-0.5">
            Genre
          </p>
          <h1 className="text-white text-2xl font-bold">
            {genre?.name ?? "Movies"}
          </h1>
        </div>
      </div>

      <MoviesGrid movies={moviesData.results ?? []} />
    </div>
  );
}
