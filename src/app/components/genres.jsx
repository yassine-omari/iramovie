import Link from "next/link";

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

export default function genres({ genres }) {
  return (
    <section className="px-4 md:px-10 py-8">
      <h2 className="text-white text-lg font-semibold mb-4">Browse by Genre</h2>
      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => (
          <Link
            key={genre.id}
            href={`/home/genre/${genre.id}`}
            className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white text-sm px-4 py-2 rounded-full transition-all duration-150"
          >
            <span>{GENRE_ICONS[genre.id] ?? "🎬"}</span>
            <span>{genre.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
